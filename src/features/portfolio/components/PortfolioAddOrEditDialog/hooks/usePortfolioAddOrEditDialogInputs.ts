import {
  calculateLossRate,
  calculateRate,
  calculateValueFromRate,
  removeNegativeSign,
} from "@features/portfolio/utils/calculations";
import { removeThousandsDelimiter, useNumber } from "@fineants/demolition";
import { useCallback, useEffect } from "react";

type Props = {
  budgetInitialValue: string;
  targetGainInitialValue: string;
  targetReturnRateInitialValue: string;
  maximumLossInitialValue: string;
  maximumLossRateInitialValue: string;
};

export default function usePortfolioAddOrEditDialogInputs({
  budgetInitialValue,
  targetGainInitialValue,
  targetReturnRateInitialValue,
  maximumLossInitialValue,
  maximumLossRateInitialValue,
}: Props) {
  // Budget
  const budgetValidator = (value: number) => {
    if (value < 0) {
      throw Error("0 이상이어야 합니다");
    }
  };
  const {
    value: budget,
    onChange: onBudgetChange,
    error: budgetError,
    isError: isBudgetError,
  } = useNumber({
    initialValue:
      budgetInitialValue === "0" ? "" : budgetInitialValue?.toString(),
    validators: [budgetValidator],
  });

  // Value and Rate Calculations
  const calcNewValueBasedOnRate = useCallback(
    (val: string) => {
      return val === ""
        ? val
        : calculateValueFromRate(
            Number(removeThousandsDelimiter(val)),
            Number(removeThousandsDelimiter(budget))
          );
    },
    [budget]
  );
  const calcNewTargetReturnRateBasedOnValue = useCallback(
    (val: string) => {
      return val === ""
        ? val
        : calculateRate(
            Number(removeThousandsDelimiter(val)),
            Number(removeThousandsDelimiter(budget))
          );
    },
    [budget]
  );
  const calcNewMaxLossRateBasedOnValue = useCallback(
    (val: string) => {
      return val === ""
        ? val
        : calculateLossRate(
            Number(removeThousandsDelimiter(budget)),
            Number(removeThousandsDelimiter(val))
          );
    },
    [budget]
  );

  // Target Gain states
  const targetGainValidator1 = (value: number) => {
    if (value < 0) {
      throw Error("0 이상이어야 합니다");
    }
  };
  const targetGainValidator2 = (value: number) => {
    if (value < Number(removeThousandsDelimiter(budget))) {
      throw Error("예산 이상이어야 합니다");
    }
  };
  const {
    value: targetGain,
    onChange: onTargetGainChange,
    error: targetGainError,
    isError: isTargetGainError,
  } = useNumber({
    initialValue:
      targetGainInitialValue === "0" ? "" : targetGainInitialValue?.toString(),
    validators: [targetGainValidator1, targetGainValidator2],
  });

  const targetReturnRateValidator = (value: number) => {
    if (value < 0) {
      throw Error("0% 이상이어야 합니다");
    }
  };
  const {
    value: targetReturnRate,
    onChange: onTargetReturnRateChange,
    error: targetReturnRateError,
    isError: isTargetReturnRateError,
  } = useNumber({
    initialValue:
      targetReturnRateInitialValue === "0"
        ? ""
        : targetReturnRateInitialValue?.toString(),
    validators: [targetReturnRateValidator],
  });

  const targetGainHandler = useCallback(
    (value: string) => {
      onTargetGainChange(value);

      const newRate = calcNewTargetReturnRateBasedOnValue(value);
      onTargetReturnRateChange(newRate.toString());
    },
    [
      calcNewTargetReturnRateBasedOnValue,
      onTargetGainChange,
      onTargetReturnRateChange,
    ]
  );
  const targetReturnRateHandler = useCallback(
    (value: string) => {
      onTargetReturnRateChange(value);
      onTargetGainChange(calcNewValueBasedOnRate(value).toString());
    },
    [calcNewValueBasedOnRate, onTargetGainChange, onTargetReturnRateChange]
  );

  // Maximum Loss states
  const maximumLossValidator1 = (value: number) => {
    if (value < 0) {
      throw Error("0 이상이어야 합니다");
    }
  };
  const maximumLossValidator2 = (value: number) => {
    if (value > Number(removeThousandsDelimiter(budget))) {
      throw Error("예산을 초과할 수 없습니다");
    }
  };
  const {
    value: maximumLoss,
    onChange: onMaximumLossChange,
    error: maximumLossError,
    isError: isMaximumLossError,
  } = useNumber({
    initialValue:
      maximumLossInitialValue === "0"
        ? ""
        : maximumLossInitialValue?.toString(),
    validators: [maximumLossValidator1, maximumLossValidator2],
  });

  const maximumLossRateValidator1 = (value: number) => {
    if (value > 100) {
      throw Error("100% 이하이어야 합니다");
    }
  };
  const {
    value: maximumLossRate,
    onChange: onMaximumLossRateChange,
    error: maximumLossRateError,
    isError: isMaximumLossRateError,
  } = useNumber({
    initialValue:
      maximumLossRateInitialValue === "0"
        ? ""
        : maximumLossRateInitialValue?.toString(),
    validators: [maximumLossRateValidator1],
  });

  const maximumLossHandler = useCallback(
    (value: string) => {
      const isOnlyNegativeSign = value === "-";

      onMaximumLossChange(isOnlyNegativeSign ? "" : value);

      const newRate = isOnlyNegativeSign
        ? ""
        : removeNegativeSign(calcNewMaxLossRateBasedOnValue(value).toString());
      onMaximumLossRateChange(newRate);
    },
    [
      calcNewMaxLossRateBasedOnValue,
      onMaximumLossChange,
      onMaximumLossRateChange,
    ]
  );
  const maximumLossRateHandler = useCallback(
    (value: string) => {
      onMaximumLossRateChange(value);
      onMaximumLossChange(
        calcNewValueBasedOnRate(value === "" ? "" : `-${value}`).toString()
      );
    },
    [calcNewValueBasedOnRate, onMaximumLossChange, onMaximumLossRateChange]
  );

  const clearInputs = useCallback(() => {
    onTargetGainChange("");
    onTargetReturnRateChange("");
    onMaximumLossChange("");
    onMaximumLossRateChange("");
  }, [
    onMaximumLossChange,
    onMaximumLossRateChange,
    onTargetGainChange,
    onTargetReturnRateChange,
  ]);

  const isBudgetEmpty = budget === "0" || budget === "";

  // 예산이 변경되었을 때
  useEffect(() => {
    if (isBudgetEmpty) {
      clearInputs();
    } else {
      if (targetReturnRate) {
        onTargetGainChange(
          calcNewValueBasedOnRate(targetReturnRate).toString()
        );
      }
      if (maximumLossRate) {
        onMaximumLossChange(
          removeNegativeSign(
            calcNewValueBasedOnRate(
              maximumLossRate === "" ? "" : `-${maximumLossRate}`
            ).toString()
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [budget, isBudgetEmpty]);

  return {
    budget,
    onBudgetChange,
    budgetError,
    isBudgetError,
    targetGain,
    onTargetGainChange: targetGainHandler,
    targetGainError,
    isTargetGainError,
    targetReturnRate,
    onTargetReturnRateChange: targetReturnRateHandler,
    targetReturnRateError,
    isTargetReturnRateError,
    maximumLoss,
    onMaximumLossChange: maximumLossHandler,
    maximumLossError,
    isMaximumLossError,
    maximumLossRate,
    onMaximumLossRateChange: maximumLossRateHandler,
    maximumLossRateError,
    isMaximumLossRateError,
    isBudgetEmpty,
  };
}
