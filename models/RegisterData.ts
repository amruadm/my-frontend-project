/**
 * Данные регистрации.
 */
export default class RegisterData {
    /** @const Максимальная длинна имени пользователя / пароля. */
    public static readonly CharactersMax: number = 24;

    /** @const Минимальная длинна имени пользователя / пароля. */
    public static readonly CharactersMin: number = 6;

    /** @field Имя пользователя. */
    public username: string = '';

    /** @field Пароль. */
    public password: string = '';

    /** @field Подтверждение пароля. */
    public confitmPassword: string = '';

    /** @field E-mail. */
    public email: string = '';
}