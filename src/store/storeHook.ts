import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//import createAuthSlice, { UserState, UserAction } from "./auth";

//export type StoreState = UserState&UserAction;

// const useStore = create<StoreState>() (
//      devtools(
//         persist(
//         (...data) => ({...createAuthSlice(...data)}),
//         { name: 'bound-store' },
//      )),
// )

// export default useStore;