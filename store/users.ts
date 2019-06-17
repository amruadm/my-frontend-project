import { ActionTree, MutationTree, GetterTree } from 'vuex';
import RegisterData from '~/models/RegisterData';
import to from 'await-to-js';
import UserInfo from "~/models/UserInfo";
import UserCreditinals from "~/models/UserCreditinals";
import JwtDecode from 'jwt-decode';
import JSONWebToken from "~/models/JSONWebToken";
import {UserRole} from "~/constants/UserRole";
import StoreBase from "~/store/index";
const ClientCookie = process.client ? require('js-cookie') : undefined;

/**
 * Ответ при авторизации.
 */
interface AuthResponseResult {
    /** @property JWT (закодированный) */
    token: string;
}

export const name = 'users';

export const types = {
    // Actions
    register: 'register',
    checkUsername: 'checkUsername',
    login: 'login',
    logout: 'logout',

    // Mutations
    setRegisteredUser: 'setRegisteredUser',
    setAuthToken: 'setAuthToken',
    clearAuthToken: 'clearAuthToken',

    // Getters
    isGuest: 'isGuest',
    isAdmin: 'isAdmin',
    getUsername: 'getUsername',
};

/**
 * Хранилище пользовательских данных.
 */
export default interface UserState {
    /** @property Информация об текущем зарегистрированом пользователе. */
    registered: UserInfo | undefined;

    /** @property Токен пользователя (JWT) */
    token?: string;

    /** @property Токен в JSON виде. */
    jsonToken?: JSONWebToken;
}

export const state = (): UserState => ({
    registered: undefined,
    token: undefined,
    jsonToken: undefined,
});

export const getters: GetterTree<UserState, StoreBase> = {
    /**
     * Является ли текущий пользователь гостем.
     *
     * @param st Состояние.
     */
    [types.isGuest](st: UserState): boolean {
        return (undefined === st.token);
    },

    /**
     * Является ли текущий пользователь админом.
     *
     * @param st Состояние.
     */
    [types.isAdmin](st: UserState): boolean {
        return (undefined !== st.jsonToken && st.jsonToken.roles.indexOf(UserRole.Admin) > -1);
    },

    /**
     * Получить имя пользователя.
     *
     * @param st Состояние.
     */
    [types.getUsername](st: UserState): string | undefined {
        return st.jsonToken ? st.jsonToken.username : undefined;
    }
};

export const mutations: MutationTree<UserState> = {
    /**
     * Изменить зарегистрированного пользователя.
     *
     * @param st
     * @param info
     */
    [types.setRegisteredUser](st: UserState, info: UserInfo) {
        st.registered = info;
    },

    /**
     * Изменить JWT токен пользователя.
     *
     * @param st    Состояние.
     * @param token JWT токен в закодированном виде.
     */
    [types.setAuthToken](st: UserState, token: string) {
        st.token = token;

        st.jsonToken = JwtDecode<JSONWebToken>(token);
    },

    /**
     * Удалить JWT пользователя.
     *
     * @param st Состояние.
     */
    [types.clearAuthToken](st: UserState) {
        st.jsonToken = undefined;
        st.token = undefined;
    },
};

export const actions: ActionTree<UserState, StoreBase> = {

    /**
     * Регистрация пользователя.
     *
     * @param context Контекст.
     * @param data    Пользовательские данные.
     */
    async [types.register](context, data: RegisterData): Promise<boolean | UserInfo> {
        let [err, userInfo] = await to(this.$axios.$post('/api/v1/user/register/', data));
        if (err) return false;

        const info = Object.assign(new UserInfo(), userInfo);

        context.commit(types.setRegisteredUser, info);

        return info;
    },

    /**
     * Проверка существования имени пользователя.
     *
     * @param context  Контекст.
     * @param username Имя пользователя.
     */
    async [types.checkUsername](context, username: string): Promise<boolean> {
        // @ts-ignore todo $axios добавить в тайпинги.
        let [err, exists] = await to(this.$axios.$post('/api/v1/user/check-username/' + username));
        if (err) return false;

        return exists;
    },

    /**
     * Войти.
     *
     * @param context     Контекст.
     * @param creditinals Данные для аутентификации.
     */
    async [types.login](context, creditinals: UserCreditinals) {
        let [err, result] = await to(this.$axios.$post('/api/login_check', creditinals));
        if (err) return false;

        context.commit(types.setAuthToken, result.token);

        if (ClientCookie) {
            ClientCookie.set('token', result.token);
        }

        return true;
    },

    /**
     * Выйти.
     *
     * @param context Контекст.
     */
    async [types.logout](context) {
        context.commit(types.clearAuthToken);

        if (ClientCookie) {
            ClientCookie.remove('token');
        }
    },
};