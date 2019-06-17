import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import UserCreditinals from "~/models/UserCreditinals";
import * as UsersStore from '~/store/users';

/**
 * Состояние формы авторизации.
 */
enum LoginFormState {
    Login,
    Authenticate,
}

/**
 * Компонент авторизации.
 */
@Component
export default class LoginForm extends Vue {

    /** @field Данные формы. */
    protected creditinals: UserCreditinals = new UserCreditinals();

    /** @field Состояние формы. */
    protected state: LoginFormState = LoginFormState.Login;

    /** @field Перечисление: LoginFormState */
    protected readonly LoginFormState: object = LoginFormState;

    protected get rules(): object {
        return {
            username: [
                (value: string) => value.length > 0 || 'Введите имя пользователя!',
            ],
            password: [
                (value: string) => value.length > 0 || 'Введите пароль!',
            ],
        };
    }

    /**
     * Авторизоваться.
     */
    protected async login() {
        this.state = LoginFormState.Authenticate;
        const hasSuccess = await this.$store.dispatch([UsersStore.name, UsersStore.types.login].join('/'), this.creditinals);
        this.state = LoginFormState.Login;

        this.$emit(hasSuccess ? 'onSuccess' : 'onError');
    }

    /**
     * Вернуться к форме авторизации.
     */
    protected continueToAuth() {
        this.state = LoginFormState.Login;
    }
}