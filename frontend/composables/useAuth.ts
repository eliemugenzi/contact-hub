'use client';
import { isEmpty } from "lodash";
import store from "~/store";
interface AuthTokenP {
    saveUser: (user: Record<string, any>) => void;
    isLoggedIn: boolean;
}

export const useAuth = (): AuthTokenP => {
    const saveUser = (user: Record<string, any>): void => {
        store.dispatch("setCurrentUser", user);

    }

    const user = store.getters.currentUser;
    console.log('USER___', user);
    const isLoggedIn = !isEmpty(user);

    return {
        isLoggedIn,
        saveUser,
    }
}