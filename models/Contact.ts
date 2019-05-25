import {GenderType} from "~/constants/GenderType";

/**
 * Контактные данные.
 */
export default class Contact {
    /** @field Имя. */
    public firstName: string = '';

    /** @field Фамилия. */
    public secondName: string = '';

    /** @field E-mail. */
    public email: string = '';

    /** @field Телефон. */
    public phone: string = '';

    /** @field Пол. */
    public gender: GenderType = GenderType.Female;

    /** @property Полное имя. */
    public get fullName(): string {
        return this.secondName + ' ' + this.firstName;
    }
}