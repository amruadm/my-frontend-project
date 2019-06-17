import {NuxtAxiosInstance} from "~/node_modules/@nuxtjs/axios";

/**
 * Плагин для добавления токена в заголовки отправляемых запросов.
 *
 * @param $axios
 * @param app
 * @param store
 */
export default function ({ $axios, app, store }: {$axios: NuxtAxiosInstance, app: any, store: any}) {
    $axios.onRequest(config => {
        if (store.state.users.token) {
            config.headers.common['Authorization'] = 'Bearer ' + store.state.users.token;
        }
    })
}