/**
 * Структура JWT токена.
 */
export default interface JSONWebToken {
    iat: number;
    exp: number;
    roles: string[];
    username: string;
}