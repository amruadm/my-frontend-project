/**
 * Данные регистрации.
 */
export default class RegisterData {
    /** @const Максимальная длинна имени пользователя / пароля. */
    public static readonly CharactersMax: number = 24;

    /** @const Минимальная длинна имени пользователя / пароля. */
    public static readonly CharactersMin: number = 6;

    /** @field Имя пользователя. */
    public login: string = '';

    /** @field Пароль. */
    public password: string = '';

    /** @field E-mail. */
    public email: string = '';
}