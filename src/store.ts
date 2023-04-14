import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import {
    configureStore,
    combineReducers,
    PreloadedState,
} from "@reduxjs/toolkit";

import appReducer from "./app-slice";

export const rootReducer = combineReducers({
    app: appReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        devTools: true,
        preloadedState,
    });
};

export const store = setupStore({});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
