import {clientStore} from "@/store/clientStore";
import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        ...clientStore,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

const makeStore = () => store;
export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
    >;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
