import { FC } from "react";

import { renderHook, screen } from "@testing-library/react";

import useFeatureToggle from "./useFeatureToggle";

import { FeatureTypes } from "../app-slice";

import { SimpleWrapper, renderWithProviders } from "../utils/test-utils";

const FeatureToggleComponent: FC<{ featureKey: FeatureTypes }> = ({
    featureKey,
}) => {
    const { hasFeatureEnabled } = useFeatureToggle();
    const hasFeature = hasFeatureEnabled(featureKey);

    return (
        <div>
            {hasFeature && (
                <div data-testid={`feature-${featureKey}`}>Hello world!</div>
            )}
        </div>
    );
};

describe("useFeatureToggle", () => {
    test("should have cat enabled by default", () => {
        renderWithProviders(
            <FeatureToggleComponent featureKey={FeatureTypes.MATRIX_CAT} />
        );

        expect(
            screen.getByTestId(`feature-${FeatureTypes.MATRIX_CAT}`)
        ).toBeTruthy();
    });

    describe("if feature key not found", () => {
        test("should not show feature div", () => {
            renderWithProviders(
                <FeatureToggleComponent featureKey={FeatureTypes.NYAN_CAT} />
            );

            expect(
                screen.queryByTestId(`feature-${FeatureTypes.NYAN_CAT}`)
            ).toBeFalsy();
        });
    });

    describe("with render hooks", () => {
        test("should have cat enabled by default", () => {
            const { result } = renderHook(useFeatureToggle, {
                wrapper: SimpleWrapper,
            });

            const matrixCatEnabled = result.current.hasFeatureEnabled(
                FeatureTypes.MATRIX_CAT
            );

            expect(matrixCatEnabled).toBeTruthy();
        });

        describe("if feature key not found", () => {
            test("should not show feature div", () => {
                const { result } = renderHook(useFeatureToggle, {
                    wrapper: SimpleWrapper,
                });

                const matrixCatEnabled = result.current.hasFeatureEnabled(
                    FeatureTypes.NYAN_CAT
                );

                expect(matrixCatEnabled).toBeFalsy();
            });
        });
    });
});
