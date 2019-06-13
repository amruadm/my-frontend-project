import { ActionTree, MutationTree } from 'vuex';
import State from "~/store/index";
import RegisterData from '~/models/RegisterData';
import to from 'await-to-js';
import UserInfo from "~/models/UserInfo";

export const name = 'users';

export const types = {
    // Actions
    register: 'register',
    checkUsername: 'checkUsername',

    // Mutations
    setRegisteredUser: 'setRegisteredUser',
};

/**
 * Хранилище пользовательских данных.
 */
export default interface UserState {
    registered: UserInfo | undefined;
}

export const state = (): UserState => ({
    registered: undefined,
});

export const mutations: MutationTree<UserState> = {
    /**
     * Изменить зарегистрированного пользователя.
     *
     * @param st
     * @param info
     */
    [types.setRegisteredUser](st: UserState, info: UserInfo) {
        st.registered = info;
    }
};

export const actions: ActionTree<UserState, State> = {
    /**
     * Регистрация пользователя.
     *
     * @param context Контекст.
     * @param data    Пользовательские данные.
     */
    async [types.register](context, data: RegisterData): Promise<boolean | UserInfo> {
        let [err, userInfo] = await to(this.$axios.$post(process.env.apiBaseUrl + 'v1/user/register/', data));
        if (err) return false;

        const info = Object.assign(new UserInfo(), userInfo);

        context.commit(types.setRegisteredUser, info);

        return info;
    },

    /**
     * Проверка существования имени пользователя.
     *
     * @param context Контекст.
     * @param username Имя пользователя.
     */
    async [types.checkUsername](context, username: string): Promise<boolean> {
        // @ts-ignore todo $axios добавить в тайпинги.
        let [err, exists] = await to(this.$axios.$post(process.env.apiBaseUrl + 'v1/user/check-username/' + username));
        if (err) return false;

        return exists;
    }
};