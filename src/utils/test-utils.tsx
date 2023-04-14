import React, { PropsWithChildren } from "react";

import { Provider } from "react-redux";

import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";

import type { PreloadedState } from "@reduxjs/toolkit";

import { setupStore } from "../store";
import type { AppStore, RootState } from "../store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export function renderWithProviders(
    element: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    return {
        store,
        ...render(element, { wrapper: Wrapper, ...renderOptions }),
    };
}
