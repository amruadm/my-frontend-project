import { ActionTree } from 'vuex';
import State from "~/store/index";
import RegisterData from '~/models/RegisterData';
import ObjectHelper from "~/helpers/ObjectHelper";
import to from 'await-to-js';

export const name = 'users';

export const types = {
    // Actions
    register: 'register',
    checkUsername: 'checkUsername',
};

/**
 * Хранилище пользовательских данных.
 */
export default interface UserState {
}

export const state = (): UserState => ({

});

export const actions: ActionTree<UserState, State> = {
    /**
     * Регистрация пользователя.
     *
     * @param context Контекст.
     * @param data    Пользовательские данные.
     */
    async [types.register](context, data: RegisterData): Promise<boolean | number> {
        // @ts-ignore todo $axios добавить в тайпинги.
        let [err, newUserId] = await this.$axios.$post(process.env.apiBaseUrl + 'v1/auth/register/', ObjectHelper.objectToFormData(data));
        if (err) return false;

        return newUserId;
    },

    /**
     * Проверка существования имени пользователя.
     *
     * @param context Контекст.
     * @param username Имя пользователя.
     */
    async [types.checkUsername](context, username: string): Promise<boolean> {
        const formData = new FormData();
        formData.append('username', username);

        // @ts-ignore todo $axios добавить в тайпинги.
        let [err, exists] = await to(this.$axios.$post(process.env.apiBaseUrl + 'v1/auth/check-username', formData));
        if (err) return false;

        return exists;
    }
};