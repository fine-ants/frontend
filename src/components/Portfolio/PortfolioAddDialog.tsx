import usePortfolioAddMutation from "@api/portfolio/queries/usePortfolioAddMutation";
import usePortfolioEditMutation from "@api/portfolio/queries/usePortfolioEditMutation";
import { PortfolioDetails } from "@api/portfolio/types";
import BaseDialog from "@components/BaseDialog";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { Select, SelectOption } from "@components/common/Select";
import { SECURITIES_FIRM } from "@constants/securitiesFirm";
import { useText } from "@fineants/demolition";
import { FormControl, IconButton } from "@mui/material";
import securitiesFirmLogos, {
  SecuritiesFirm,
} from "@styles/securitiesFirmLogos";
import {
  calculateLossRate,
  calculateRate,
  calculateValue,
  formatToRate,
} from "@utils/calculations";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

export default function PortfolioAddDialog({
  isOpen,
  onClose,
  portfolioDetails,
}: Props) {
  const { portfolioId } = useParams();

  const {
    mutate: editMutate,
    isError: isEditError,
    isSuccess: isEditSuccess,
  } = usePortfolioEditMutation(Number(portfolioId));

  const { mutate: addMutate } = usePortfolioAddMutation({
    onSuccessCb: onClose,
  });

  const [securitiesFirm, setSecuritiesFirm] = useState(
    portfolioDetails ? portfolioDetails.securitiesFirm : "FineAnts"
  );

  const { value: name, onChange: onNameChange } = useText({
    initialValue: portfolioDetails?.name,
  });
  const { value: budget, onChange: onBudgetChange } = useText({
    initialValue: portfolioDetails?.budget.toString(),
  });
  const { value: targetGain, onChange: onTargetGainChange } = useText({
    initialValue: portfolioDetails?.targetGain.toString(),
  });
  const { value: targetReturnRate, onChange: onTargetReturnRateChange } =
    useText({
      initialValue: portfolioDetails?.targetReturnRate.toString(),
    });
  const { value: maximumLoss, onChange: onMaximumLossChange } = useText({
    initialValue: portfolioDetails?.maximumLoss.toString(),
  });
  const { value: maximumLossRate, onChange: onMaximumLossRateChange } = useText(
    {
      initialValue: portfolioDetails?.maximumLossRate.toString(),
    }
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

  const changeIfNumberOnly =
    (handler: (value: string) => void) => (value: string) => {
      if (!isNaN(Number(value)) || value === "") {
        handler(value);
      }
    };

  const onBudgetInputChange = changeIfNumberOnly((value: string) => {
    onBudgetChange(value);
  });

  const onTargetGainHandler = changeIfNumberOnly((value: string) => {
    const budgetNumber = Number(budget);

    onTargetGainChange(value);
    onTargetReturnRateChange(
      formatToRate(calculateRate(Number(value), budgetNumber))
    );
  });

  const onTargetReturnRateHandler = changeIfNumberOnly((value: string) => {
    onTargetReturnRateChange(value);
    onTargetGainChange(calculateValue(Number(value), Number(budget)));
  });

  const onMaximumLossHandler = changeIfNumberOnly((value: string) => {
    const budgetNumber = Number(budget);
    const valueNumber = Number(value);

    onMaximumLossChange(value);
    onMaximumLossRateChange(calculateLossRate(budgetNumber, valueNumber));
  });

  const maximumLossRateHandler = changeIfNumberOnly((value: string) => {
    onMaximumLossRateChange(value);
    onMaximumLossChange(calculateValue(-Number(value), Number(budget)));
  });

  const handleChange = (value: string) => {
    setSecuritiesFirm(value as SecuritiesFirm);
  };

  const onSubmit = async () => {
    const body = {
      name: name,
      securitiesFirm: securitiesFirm,
      budget: Number(budget),
      targetGain: Number(targetGain),
      maximumLoss: Number(maximumLoss),
    };

    if (isEditMode) {
      editMutate({ portfolioId: Number(portfolioId), body: body });
    } else {
      addMutate(body);
    }
  };

  // 예산이 변경되었을 때
  useEffect(() => {
    if (isBudgetEmpty) {
      clearInputs();
    }

    if (targetGain || targetReturnRate) {
      onTargetGainHandler(targetGain);
    }

    if (maximumLoss || maximumLossRate) {
      onMaximumLossHandler(maximumLoss);
    }
  }, [
    budget,
    isBudgetEmpty,
    targetGain,
    targetReturnRate,
    maximumLoss,
    maximumLossRate,
    clearInputs,
    onMaximumLossHandler,
    onTargetGainHandler,
  ]);

  useEffect(() => {
    if (isEditSuccess) {
      onClose();
    }

    if (isEditError) {
      // TODO toast
    }
  }, [isEditSuccess, isEditError, onClose]);

  const isFormValid = () => {
    if (!name) {
      return false;
    }

    if (isEditMode) {
      return (
        portfolioDetails?.securitiesFirm !== securitiesFirm ||
        portfolioDetails?.name !== name ||
        portfolioDetails?.budget !== Number(budget) ||
        portfolioDetails?.targetGain !== Number(targetGain) ||
        portfolioDetails?.targetReturnRate !== Number(targetReturnRate) ||
        portfolioDetails?.maximumLoss !== Number(maximumLoss) ||
        portfolioDetails?.maximumLossRate !== Number(maximumLossRate)
      );
    }

    return true;
  };

  return (
    <BaseDialog
      style={PortfolioAddDialogStyle}
      isOpen={isOpen}
      onClose={onClose}>
      <Wrapper>
        <HeaderWrapper>
          <Header>포트폴리오 {isEditMode ? `수정` : `추가`}</Header>
          <IconButton onClick={onClose}>
            <Icon size={24} icon="close" color={"gray600"} />
          </IconButton>
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
                changeSelectedValue={handleChange}>
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
                onChange={(e) => onBudgetInputChange(e.target.value.trim())}
              />
              <span>KRW</span>
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
                    onTargetReturnRateHandler(e.target.value.trim())
                  }
                />
                <span>%</span>
              </StyledInput>

              <StyledInput>
                <Input
                  disabled={isBudgetEmpty}
                  value={targetGain}
                  onChange={(e) => onTargetGainHandler(e.target.value.trim())}
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
                  onChange={(e) => onMaximumLossHandler(e.target.value.trim())}
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
            onClick={onSubmit}
            disabled={!isFormValid()}>
            {isEditMode ? `수정` : `추가`}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </BaseDialog>
  );
}

const PortfolioAddDialogStyle = {
  width: "544px",
  height: "405px",
  padding: "32px",
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  font: ${({ theme: { font } }) => font.heading3};
  color: ${({ theme: { color } }) => color.neutral.gray800};
`;

const StyledInput = styled.div`
  display: flex;
  min-width: auto;
  flex: 1;
  height: 32px;
  box-sizing: border-box;
  padding: 4px 8px;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray300};
  border-radius: 3px;

  > span {
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;

const StyledSpan = styled.span`
  width: 120px;
  flex-shrink: 0;
  > span {
    color: ${({ theme: { color } }) => color.state.red};
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
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
`;
