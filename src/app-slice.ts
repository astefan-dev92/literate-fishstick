import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum FeatureTypes {
    MATRIX_CAT = "matrix-cat",
    NYAN_CAT = "nyan-cat",
}

interface Feature {
    key: FeatureTypes;
    description: string;
}

export interface AppState {
    features: Array<Feature>;
}

export const initialState: AppState = {
    features: [
        {
            key: FeatureTypes.MATRIX_CAT,
            description: "Users will see a Matrix cat on their screen",
        },
    ],
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setFeatures: (state, { payload }: PayloadAction<Array<Feature>>) => {
            state.features = payload;
        },
    },
});

export default appSlice.reducer;

export const { setFeatures } = appSlice.actions;
