import { ReactElement } from "react";
import { useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepindex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) {
        return i;
      }
      return i + 1;
    });
  }

  function refresh() {
    setCurrentStepIndex(0);
  }

  function goToStep(index: number) {
    setCurrentStepIndex(index);
  }

  return {
    steps,
    currentStepindex,
    step: steps[currentStepindex],
    isFirstStep: currentStepindex === 0,
    isLastStep: currentStepindex === steps.length - 1,
    goToStep,
    next,
    refresh,
  };
}
