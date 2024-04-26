import BaseDialog from "@components/BaseDialog";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { Select, SelectOption } from "@components/Select";
import {
  SECURITIES_FIRM,
  SecuritiesFirm,
  securitiesFirmLogos,
} from "@constants/securitiesFirm";
import usePortfolioAddMutation from "@features/portfolio/api/queries/usePortfolioAddMutation";
import usePortfolioEditMutation from "@features/portfolio/api/queries/usePortfolioEditMutation";
import { PortfolioDetails } from "@features/portfolio/api/types";
import {
  executeCbIfNumeric,
  removeThousandsDelimiter,
  thousandsDelimiter,
  useText,
} from "@fineants/demolition";
import { FormControl } from "@mui/material";
import designSystem from "@styles/designSystem";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import {
  calculateLossRate,
  calculateRate,
  calculateValueFromRate,
} from "src/features/portfolio/utils/calculations";
import { toast } from "src/main";
import styled from "styled-components";

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

  const [securitiesFirm, setSecuritiesFirm] = useState(
    portfolioDetails ? portfolioDetails.securitiesFirm : "FineAnts"
  );
  const onChangeSecuritiesFirm = (value: string) => {
    setSecuritiesFirm(value as SecuritiesFirm);
  };

  const { value: name, onChange: onNameChange } = useText({
    initialValue: portfolioDetails?.name,
  });

  const { value: budget, onChange: onBudgetChange } = useText({
    initialValue: portfolioDetails?.budget
      ? thousandsDelimiter(portfolioDetails?.budget)
      : "",
  });
  const budgetHandler = (e: ChangeEvent<HTMLInputElement>) => {
    executeCbIfNumeric({
      value: e.target.value.trim(),
      callback: onBudgetChange,
    });
  };

  // Target Gain states
  const { value: targetGain, onChange: onTargetGainChange } = useText({
    initialValue: portfolioDetails?.targetGain.toString(),
  });
  const { value: targetReturnRate, onChange: onTargetReturnRateChange } =
    useText({
      initialValue: portfolioDetails?.targetReturnRate.toString(),
    });
  const targetGainHandler = useCallback(
    (value: string) => {
      executeCbIfNumeric({
        value,
        callback: (val: string) => {
          if (Number(removeThousandsDelimiter(val)) < 0) {
            toast.warning("목표 수익 금액은 0 이상이어야 합니다");
            return;
          }

          onTargetGainChange(val);

          const newRate = val === "" ? val : calculateRate(val, budget);
          onTargetReturnRateChange(newRate);
        },
      });
    },
    [budget, onTargetGainChange, onTargetReturnRateChange]
  );
  const targetReturnRateHandler = useCallback(
    (value: string) => {
      executeCbIfNumeric({
        value,
        callback: (val: string) => {
          if (Number(removeThousandsDelimiter(val)) < 0) {
            toast.warning("목표 수익률은 0% 이상이어야 합니다");
            return;
          }

          onTargetReturnRateChange(val);

          const newValue =
            val === "" ? val : calculateValueFromRate(val, budget);
          onTargetGainChange(newValue);
        },
      });
    },
    [budget, onTargetGainChange, onTargetReturnRateChange]
  );

  // Maximum Loss states
  const { value: maximumLoss, onChange: onMaximumLossChange } = useText({
    initialValue: portfolioDetails?.maximumLoss.toString(),
  });
  const { value: maximumLossRate, onChange: onMaximumLossRateChange } = useText(
    {
      initialValue: portfolioDetails?.maximumLossRate.toString(),
    }
  );
  const maximumLossHandler = useCallback(
    (value: string) => {
      executeCbIfNumeric({
        value,
        callback: (val: string) => {
          if (
            Number(removeThousandsDelimiter(val)) >
            Number(removeThousandsDelimiter(budget))
          ) {
            toast.warning("최대 손실 금액은 예산을 초과할 수 없습니다");
            return;
          }

          if (Number(removeThousandsDelimiter(val)) < 0) {
            toast.warning("최대 손실 금액은 0보다 작을 수 없습니다");
            return;
          }

          onMaximumLossChange(val);

          const newRate = val === "" ? val : calculateLossRate(budget, val);
          onMaximumLossRateChange(newRate.replace(/-/g, ""));
        },
      });
    },
    [budget, onMaximumLossChange, onMaximumLossRateChange]
  );
  const maximumLossRateHandler = useCallback(
    (value: string) => {
      executeCbIfNumeric({
        value,
        callback: (val: string) => {
          if (Number(removeThousandsDelimiter(val)) > 100) {
            toast.warning("최대 손실률은 100%를 초과할 수 없습니다");
            return;
          }

          const parsedVal = val.replace(/-/g, "");

          onMaximumLossRateChange(parsedVal);

          const newValue =
            val === "" ? val : calculateValueFromRate(`-${parsedVal}`, budget);
          onMaximumLossChange(newValue);
        },
      });
    },
    [budget, onMaximumLossChange, onMaximumLossRateChange]
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
      securitiesFirm,
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
      return;
    } else {
      if (targetReturnRate) {
        targetReturnRateHandler(targetReturnRate);
      }
      if (maximumLossRate) {
        maximumLossRateHandler(maximumLossRate);
      }
    }
  }, [
    clearInputs,
    isBudgetEmpty,
    maximumLossRate,
    maximumLossRateHandler,
    targetReturnRate,
    targetReturnRateHandler,
  ]);

  const isFormValid = () => {
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
            <StyledInput>
              <Input
                placeholder="예산을 입력하세요"
                value={budget}
                onChange={budgetHandler}
              />
              <span>₩</span>
            </StyledInput>
          </Row>
          <Row>
            <StyledSpan>목표 수익률</StyledSpan>
            <InputWrapper>
              <StyledInput>
                <Input
                  disabled={isBudgetEmpty}
                  value={targetReturnRate}
                  onChange={(e) =>
                    targetReturnRateHandler(e.target.value.trim())
                  }
                />
                <span>%</span>
              </StyledInput>

              <StyledInput>
                <Input
                  disabled={isBudgetEmpty}
                  value={targetGain}
                  onChange={(e) => targetGainHandler(e.target.value.trim())}
                />
                <span>₩</span>
              </StyledInput>
            </InputWrapper>
          </Row>
          <Row>
            <StyledSpan>최대 손실율</StyledSpan>
            <InputWrapper>
              <StyledInput>
                {maximumLossRate && <span>-</span>}
                <Input
                  style={{ paddingLeft: "3px" }}
                  disabled={isBudgetEmpty}
                  value={maximumLossRate}
                  onChange={(e) =>
                    maximumLossRateHandler(e.target.value.trim())
                  }
                />
                <span>%</span>
              </StyledInput>
              <StyledInput>
                <Input
                  disabled={isBudgetEmpty}
                  value={maximumLoss}
                  onChange={(e) => maximumLossHandler(e.target.value.trim())}
                />
                <span>₩</span>
              </StyledInput>
            </InputWrapper>
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
  height: "405px",
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

const StyledSpan = styled.span`
  width: 120px;
  flex-shrink: 0;

  > span {
    color: ${designSystem.color.state.red500};
  }
`;

const Body = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const Row = styled.div`
  width: auto;
  display: flex;
  gap: 8px;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
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