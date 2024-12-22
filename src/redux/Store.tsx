import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/UserSlice";
import ProfileSlice from "./ProfileSlice";

let Store = configureStore({
    reducer: {
        user: UserSlice,
        profile:ProfileSlice,
        
    },
})
export type RootState = ReturnType<typeof Store.getState>;
export default Store;