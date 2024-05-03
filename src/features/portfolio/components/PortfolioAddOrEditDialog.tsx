import BaseDialog from "@components/BaseDialog";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { Select, SelectOption } from "@components/Select";
import { TextField } from "@components/TextField/TextField";
import {
  SECURITIES_FIRM,
  SecuritiesFirm,
  securitiesFirmLogos,
} from "@constants/securitiesFirm";
import usePortfolioAddMutation from "@features/portfolio/api/queries/usePortfolioAddMutation";
import usePortfolioEditMutation from "@features/portfolio/api/queries/usePortfolioEditMutation";
import { PortfolioDetails } from "@features/portfolio/api/types";
import {
  removeThousandsDelimiter,
  thousandsDelimiter,
  useText,
} from "@fineants/demolition";
import useNumber from "@hooks/useNumber";
import { FormControl } from "@mui/material";
import designSystem from "@styles/designSystem";
import { FormEvent, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  applyDecimals,
  calculateLossRate,
  calculateRate,
  calculateValueFromRate,
  removeNegativeSign,
} from "../utils/calculations";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

export default function PortfolioAddOrEditDialog({
  isOpen,
  onClose,
  portfolioDetails,
}: Props) {
  const { portfolioId } = useParams();

  const { mutate: editMutate } = usePortfolioEditMutation(
    Number(portfolioId),
    onClose
  );

  const { mutate: addMutate } = usePortfolioAddMutation({
    onSuccessCb: onClose,
  });

  const { value: securitiesFirm, onChange: onChangeSecuritiesFirm } = useText({
    initialValue: portfolioDetails
      ? portfolioDetails.securitiesFirm
      : "FineAnts",
  });

  const { value: name, onChange: onNameChange } = useText({
    initialValue: portfolioDetails ? portfolioDetails.name : "",
  });

  // Budget
  const budgetInitialValue = portfolioDetails
    ? thousandsDelimiter(portfolioDetails.budget)
    : "";
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

  // Calculations
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
  const targetGainInitialValue = portfolioDetails
    ? thousandsDelimiter(portfolioDetails.targetGain)
    : "";
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

  const targetReturnRateInitialValue = portfolioDetails
    ? thousandsDelimiter(applyDecimals(portfolioDetails.targetReturnRate))
    : "";
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
  const maximumLossInitialValue = portfolioDetails?.maximumLoss ?? "";
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
      maximumLossInitialValue === 0 ? "" : maximumLossInitialValue?.toString(),
    validators: [maximumLossValidator1, maximumLossValidator2],
  });

  const maximumLossRateInitialValue = portfolioDetails
    ? thousandsDelimiter(applyDecimals(portfolioDetails.maximumLossRate))
    : "";
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

  const isEditMode = !!portfolioDetails;
  const isBudgetEmpty = budget === "0" || budget === "";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const body = {
      name,
      securitiesFirm: securitiesFirm as SecuritiesFirm,
      budget: Number(removeThousandsDelimiter(budget)),
      targetGain: Number(removeThousandsDelimiter(targetGain)),
      maximumLoss: Number(removeThousandsDelimiter(maximumLoss)),
    };

    if (isEditMode) {
      editMutate({ portfolioId: Number(portfolioId), body });
    } else {
      addMutate(body);
    }
  };

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

  const isFormValid = () => {
    if (
      isTargetGainError ||
      isTargetReturnRateError ||
      isMaximumLossError ||
      isMaximumLossRateError
    )
      return false;

    if (isEditMode) {
      return (
        portfolioDetails?.securitiesFirm !== securitiesFirm ||
        portfolioDetails?.name !== name ||
        portfolioDetails?.budget !== Number(removeThousandsDelimiter(budget)) ||
        portfolioDetails?.targetGain !==
          Number(removeThousandsDelimiter(targetGain)) ||
        portfolioDetails?.targetReturnRate !==
          Number(removeThousandsDelimiter(targetReturnRate)) ||
        portfolioDetails?.maximumLoss !==
          Number(removeThousandsDelimiter(maximumLoss)) ||
        portfolioDetails?.maximumLossRate !==
          Number(removeThousandsDelimiter(maximumLossRate))
      );
    }

    if (!name) {
      return false;
    }

    return true;
  };

  return (
    <BaseDialog
      style={PortfolioAddDialogStyle}
      isOpen={isOpen}
      onClose={onClose}>
      <Form onSubmit={onSubmit}>
        <HeaderWrapper>
          <Header>포트폴리오 {isEditMode ? `수정` : `추가`}</Header>
          <IconButton
            icon="close"
            size="h40"
            iconColor="gray"
            onClick={onClose}
          />
        </HeaderWrapper>
        <Body>
          <Row>
            <StyledSpan>
              이름 <span>*</span>
            </StyledSpan>
            <StyledInput>
              <Input
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
              />
            </StyledInput>
          </Row>
          <Row>
            <StyledSpan>
              증권사 <span>*</span>
            </StyledSpan>
            <FormControl fullWidth>
              <Select
                size="h32"
                selectedValue={securitiesFirm}
                changeSelectedValue={onChangeSecuritiesFirm}
                menuMaxHeight="168px">
                {SECURITIES_FIRM.map((option) => (
                  <SelectOption key={option} value={option}>
                    <SecuritiesFirmLogo
                      src={securitiesFirmLogos[option]}
                      alt={option}
                    />
                    <SecuritiesFirmTitle>
                      {option === "FineAnts" ? "FineAnts (선택안함)" : option}
                    </SecuritiesFirmTitle>
                  </SelectOption>
                ))}
              </Select>
            </FormControl>
          </Row>
          <Row>
            <StyledSpan>예산</StyledSpan>
            <TextField
              size="h32"
              placeholder="예산을 입력하세요"
              error={isBudgetError}
              errorText={budgetError}
              value={budget}
              onChange={(e) => onBudgetChange(e.target.value.trim())}
              endAdornment={<TextFieldEndAdornment>₩</TextFieldEndAdornment>}
            />
          </Row>
          <Row>
            <StyledSpan>목표 수익률</StyledSpan>
            <InputsWrapper>
              <TextField
                size="h32"
                disabled={isBudgetEmpty}
                error={isTargetReturnRateError}
                errorText={targetReturnRateError}
                value={
                  targetReturnRate === ""
                    ? ""
                    : thousandsDelimiter(
                        applyDecimals(
                          Number(removeThousandsDelimiter(targetReturnRate))
                        ).toString()
                      )
                }
                onChange={(e) => targetReturnRateHandler(e.target.value.trim())}
                endAdornment={<TextFieldEndAdornment>%</TextFieldEndAdornment>}
              />
              <TextField
                size="h32"
                disabled={isBudgetEmpty}
                error={isTargetGainError}
                errorText={targetGainError}
                value={targetGain}
                onChange={(e) => targetGainHandler(e.target.value.trim())}
                endAdornment={<TextFieldEndAdornment>₩</TextFieldEndAdornment>}
              />
            </InputsWrapper>
          </Row>
          <Row>
            <StyledSpan>최대 손실율</StyledSpan>
            <InputsWrapper>
              <TextField
                size="h32"
                disabled={isBudgetEmpty}
                error={isMaximumLossRateError}
                errorText={maximumLossRateError}
                value={
                  maximumLossRate === ""
                    ? ""
                    : thousandsDelimiter(
                        applyDecimals(
                          Number(removeThousandsDelimiter(maximumLossRate))
                        ).toString()
                      )
                }
                onChange={(e) => maximumLossRateHandler(e.target.value.trim())}
                startAdornment={
                  <TextFieldEndAdornment>-</TextFieldEndAdornment>
                }
                endAdornment={<TextFieldEndAdornment>%</TextFieldEndAdornment>}
              />
              <TextField
                size="h32"
                disabled={isBudgetEmpty}
                error={isMaximumLossError}
                errorText={maximumLossError}
                value={maximumLoss}
                onChange={(e) => maximumLossHandler(e.target.value.trim())}
                endAdornment={<TextFieldEndAdornment>₩</TextFieldEndAdornment>}
              />
            </InputsWrapper>
          </Row>
        </Body>
        <ButtonWrapper>
          <Button
            variant="primary"
            size="h32"
            type="submit"
            disabled={!isFormValid()}>
            {isEditMode ? `수정` : `추가`}
          </Button>
        </ButtonWrapper>
      </Form>
    </BaseDialog>
  );
}

const PortfolioAddDialogStyle = {
  width: "544px",
  height: "437px",
  padding: "32px",
};

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = styled.div`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Body = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
`;

const Row = styled.div`
  width: auto;
  display: flex;
  gap: 8px;
`;

const StyledSpan = styled.span`
  width: 120px;
  flex-shrink: 0;

  > span {
    color: ${designSystem.color.state.red500};
  }
`;

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const TextFieldEndAdornment = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray400};
`;

const StyledInput = styled.div`
  display: flex;
  min-width: auto;
  flex: 1;
  height: 32px;
  box-sizing: border-box;
  padding: 4px 8px;
  border: 1px solid ${designSystem.color.neutral.gray300};
  border-radius: 3px;

  > span {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray400};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};

  &::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
`;

const SecuritiesFirmLogo = styled.img`
  width: 24px;
  height: 24px;
`;

const SecuritiesFirmTitle = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
