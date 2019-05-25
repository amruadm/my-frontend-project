import { ActionTree, MutationTree } from 'vuex';
import State from "~/store/index";
import Contact from "~/models/Contact";

export const name = 'contacts';

export const types = {
    // Mutations
    push: 'push',

    // Actions
    send: 'send',
};

/**
 * Хранилище контактной информации.
 */
export default interface ContactsState {
    items: Contact[];
}

export const state = (): ContactsState => ({
    items: [],
});

export const mutations: MutationTree<ContactsState> = {
    /**
     * Добавить контактную информацию в стор.
     *
     * @param st   Состояние.
     * @param item Контактные данные.
     */
    [types.push](st: ContactsState, item: Contact) {
        const itemsCopy: Contact[] = Object.assign([], st.items);
        itemsCopy.push(item);
        st.items = itemsCopy;
    },
};

export const actions: ActionTree<ContactsState, State> = {
    /**
     * Отправить контакстные данные
     *
     * @param context Контекст.
     * @param item    Контактные данные.
     */
    async [types.send](context, item: Contact) {
        // todo send to API using axios

        context.commit(types.push, item);
    },
};