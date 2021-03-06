import {Component, Vue, Watch} from "~/node_modules/nuxt-property-decorator";
import RegisterData from "~/models/RegisterData";
import * as UsersStore from '~/store/users';
import UserInfo from "~/models/UserInfo";

/**
 * Состояние формы регистрации.
 */
enum RegisterFormState {
    Write,
    Wait,
    Success,
}

/**
 * Компонент формы регистрации пользователя.
 */
@Component
export default class RegisterForm extends Vue {

    /** @field Данные формы. */
    protected formData: RegisterData = new RegisterData();

    /** @field Подтверждение пароля. */
    protected confirmPassword: string = '';

    /** @field Флаг проверки на существование имени пользователя. */
    protected hasUsernameExists: boolean = false;

    /** @const (для темплейта) */
    protected readonly RegisterFormState = RegisterFormState;

    /** @field Текущее состояние. */
    protected formState: RegisterFormState = RegisterFormState.Write;

    /**
     * Слушатель поля имени пользователя.
     */
    @Watch('formData.login')
    protected async onUsernameChanged() {
        this.hasUsernameExists = await this.$store.dispatch([UsersStore.name, UsersStore.types.checkUsername].join('/'), this.formData.login);
    }

    /**
     * Валидаторы.
     */
    protected get rules(): object {
        const result: any = {
            login: [
                (value: string) => /[A-z]/.test(value) || 'Имя пользователя может содержать только латинские символы',
                (value: string) => value.length >= RegisterData.CharactersMin || 'Имя пользователя не может быть длиннее ' + RegisterData.CharactersMin + ' символов',
                (value: string) => value.length <= RegisterData.CharactersMax || 'Имя пользователя не может быть короче ' + RegisterData.CharactersMin + ' символов',
                (value: string) => !this.hasUsernameExists || 'Имя пользователя уже существует',
            ],
            password: [
                (value: string) => /[A-z0-9]+/.test(value) || 'Пароль может содержать только латинские символы или цифры.',
                (value: string) => value.length >= RegisterData.CharactersMin || 'Пароль не может быть длиннее ' + RegisterData.CharactersMin + ' символов',
                (value: string) => value.length <= RegisterData.CharactersMax || 'Пароль не может быть короче ' + RegisterData.CharactersMin + ' символов',
            ],
            email: [
                (value: string) => (/.+@.+\..+/.test(value) || 'Некорректный E-mail'),
            ],
        };

        result.confirm = Object.assign([], result.password);
        result.confirm.push((value: string) => value === this.confirmPassword || 'Пароли не совпадают');

        return result;
    }

    /**
     * Отправить.
     */
    protected async send() {
        this.formState = RegisterFormState.Wait;

        const userInfo: boolean | UserInfo = await this.$store.dispatch([UsersStore.name, UsersStore.types.register].join('/'), this.formData);

        this.formState = (false === userInfo ? RegisterFormState.Write : RegisterFormState.Success);

        if (RegisterFormState.Success === this.formState) {
            this.$emit('onSuccess');
        }
    }
}
