import {Component, Vue} from "~/node_modules/nuxt-property-decorator";
import Contact from "~/models/Contact";
import {genderLabels, GenderType} from "~/constants/GenderType";
import * as ContactsStore from '~/store/contacts';

/**
 * Форма заполнения контактных данных.
 */
@Component({
    data() {
        return {
            genderLabels: genderLabels,
            rules: {
                firstName: [
                    (value: string) => (value.length > 0 || 'Имя должно быть заполнено'),
                ],
                secondName: [
                    (value: string) => (value.length > 0 || 'Фамилия должна быть заполнена'),
                ],
                email: [
                    (value: string) => (/.+@.+\..+/.test(value) || 'Некорректный E-mail'),
                ],
                phone: [
                    (value: string) => (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(value) || 'Некорректный номер телефона'),
                ],
            },
        };
    }
})
export default class extends Vue {
    /** @field Данные. */
    protected contact: Contact = new Contact();

    /**
     * Отправить.
     */
    protected send() {
        this.$store.dispatch([ContactsStore.name, ContactsStore.types.send].join('/'), this.contact);
    }
}
