import * as UsersStore from "~/store/users";
const ServerCookie = process.server ? require('cookieparser') : undefined;

export default interface StoreBase {
}

export const actions = {
    /**
     * @inheritDoc
     */
    nuxtServerInit({commit}: {commit: any}, {req}: {req: any}) {
        if (req.headers.cookie && ServerCookie) {
            const cookies = ServerCookie.parse(req.headers.cookie);

            if (cookies.token) {
                commit([UsersStore.name, UsersStore.types.setAuthToken].join('/'), cookies.token);
            }
        }
    }
};