import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import RegisterForm from "~/components/register-form";
import * as UsersStore from '~/store/users';
import LoginForm from "~/components/login-form";

/**
 * Тип всплывающего сообщения.
 */
enum MessageColorType {
	Success = 'success',
	Error = 'error',
}

/**
 * Общий слой всех страниц.
 */
@Component({
	components: {
		RegisterForm,
		LoginForm,
	},
})
export default class extends Vue {

	/** @field Состояние модала окна регистрации. */
	protected registerModalState: boolean = false;

	/** @field Состояние модала окна авторизации. */
	protected loginModalState: boolean = false;

	/** @field Показать всплывающее сообщение */
	protected showUpperMessage: boolean = false;

	/** @field Всплывающее сообщение */
	protected upperMessageText: string = '';

	/** @field Цвет сообщения. */
	protected upperMessageType: MessageColorType = MessageColorType.Success;

	protected onApiDocClick() {
		this.$router.push('/api-doc');
	}

	protected onMainPageClick() {
		this.$router.push('/');
	}

	/**
	 * Выход.
	 */
	protected logout() {
		this.$store.dispatch([UsersStore.name, UsersStore.types.logout].join('/'));

		this.showMessage('Вы вышли');
	}

	/**
	 * Успешный вход.
	 */
	protected onLogin() {
		this.loginModalState = false;
		this.showMessage('Вы успешно авторизованы');
	}

	/**
	 * Ошибка авторизации.
	 */
	protected onLoginError() {
		this.showMessage('Неверные логин или пароль', MessageColorType.Error);
	}

	/**
	 * Событие успешной регистрации.
	 */
	protected onRegistered() {
		this.registerModalState = false;

		this.showMessage('Вы успешно зарегистрированы');
	}

	/**
	 * Наличие данных зарегистрированного пользователя.
	 */
	protected get isGuest(): boolean {
		return this.$store.getters[[UsersStore.name, UsersStore.types.isGuest].join('/')];
	}

	/**
	 * Имя авторизованого пользователя.
	 */
	protected get username(): string | undefined {
		return this.$store.getters[[UsersStore.name, UsersStore.types.getUsername].join('/')];
	}

	/**
	 * Является ли пользователь администратором.
	 */
	protected get isAdmin(): boolean {
		return this.$store.getters[[UsersStore.name, UsersStore.types.isAdmin].join('/')];
	}

	/**
	 * Показать сообщение.
	 *
	 * @param message Текст.
	 * @param type    Тип.
	 */
	protected showMessage(message: string, type: MessageColorType = MessageColorType.Success) {
		this.showUpperMessage = true;
		this.upperMessageText = message;
		this.upperMessageType = type;
	}
}
