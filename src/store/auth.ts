import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { StateCreator } from "zustand";
import { User, AuthStatus } from "../types";
import { loginRequest } from "../api/auth"

export type UserState = {
    status: AuthStatus;
    user?: User | null;
    token?: string | null;
    // createDate: Date;
    // expireDate: Date;
}

export type UserAction = {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const createAuthSlice: StateCreator<UserState & UserAction> = (set) => ({
    status: "unauthorized",
    token: null,
    user: null,
    login: async (email: string, password: string) => {
        try {
            const res = await loginRequest(email, password);
            const { token } = await res.json();
            set({ status: 'authorized', token: token })
        }
        catch (error) {
            set({ status: "unauthorized", token: null, user: null });
        }
    },
    logout: () => {
        set({ status: "unauthorized", token: null, user: null });
    },
})

// export default createAuthSlice
export const useAuthStore = create<UserState & UserAction>()(
    devtools(
        persist(
            createAuthSlice, { name: "auth-storage" }
        )
    )
)
