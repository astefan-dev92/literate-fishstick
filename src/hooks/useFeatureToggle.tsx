import { useCallback } from "react";

import { useAppSelector } from "../store";

/**
 * @description Handle functions allowing access to the Feature Toggle state
 * @returns A collection of functions associated to feature toggling
 * @module useFeatureToggle
 */
const useFeatureToggle = () => {
    const features = useAppSelector((state) => state.app.features);

    const hasFeatureEnabled = useCallback(
        (key: string) => {
            const featureIndex = features.findIndex(
                (feature) => feature.key === key
            );

            return featureIndex !== -1;
        },
        [features]
    );

    return { hasFeatureEnabled };
};

export default useFeatureToggle;
