import { Children, ReactNode, isValidElement, useMemo, useState } from "react";

export default function useFunnel<S extends string>(steps: [S, ...S[]]) {
  const [currentStep, setCurrentStep] = useState<S>(steps[0]);

  const changeStep = (step: S) => {
    setCurrentStep(step);
  };

  // Step Component
  // Must receive a name.
  function Step({ children }: { name: S; children: ReactNode }) {
    return <>{children}</>;
  }

  // Funnel Component
  // Receives children (Step components only).
  // Responsible for managing which Step should be rendered.
  function Funnel({ children }: { children: ReactNode }) {
    // Find the child with the name that matches the current step and render that.
    const targetStep = Children.toArray(children).find((child) => {
      // If the child is not a valid React element or is not a Step component, throw an error.
      if (!isValidElement(child) || child.type !== Step) {
        throw new Error(
          `${
            isValidElement(child) ? child.type : child
          } is not a <Funnel.Step> component. All component children of <Funnel> must be a <Funnel.Step>.`
        );
      }
      return child.props.name === currentStep;
    });

    return <>{targetStep}</>;
  }

  const FunnelComponent = useMemo(
    () => Object.assign(Funnel, { Step }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentStep]
  );

  return [FunnelComponent, changeStep] as const;
}
