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
import { applyDecimals } from "@features/portfolio/utils/calculations";
import {
  removeThousandsDelimiter,
  thousandsDelimiter,
  useText,
} from "@fineants/demolition";
import { FormControl } from "@mui/material";
import designSystem from "@styles/designSystem";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import usePortfolioAddOrEditDialogInputs from "../hooks/usePortfolioAddOrEditDialogInputs";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

export default function PortfolioAddOrEditDialogD({
  isOpen,
  onClose,
  portfolioDetails,
}: Props) {
  const { portfolioId } = useParams();

  const { mutate: addMutate } = usePortfolioAddMutation({
    onSuccessCb: onClose,
  });

  const { mutate: editMutate } = usePortfolioEditMutation(
    Number(portfolioId),
    onClose
  );

  // Securities Firm
  const { value: securitiesFirm, onChange: onChangeSecuritiesFirm } = useText({
    initialValue: portfolioDetails
      ? portfolioDetails.securitiesFirm
      : "FineAnts",
  });

  // Portfolio Name
  const { value: name, onChange: onNameChange } = useText({
    initialValue: portfolioDetails ? portfolioDetails.name : "",
  });

  // Number Inputs
  const budgetInitialValue = portfolioDetails
    ? thousandsDelimiter(portfolioDetails.budget)
    : "";
  const targetGainInitialValue = portfolioDetails
    ? thousandsDelimiter(portfolioDetails.targetGain)
    : "";
  const targetReturnRateInitialValue = portfolioDetails
    ? targetGainInitialValue === ""
      ? ""
      : thousandsDelimiter(applyDecimals(portfolioDetails.targetReturnRate))
    : "";
  const maximumLossInitialValue = portfolioDetails
    ? thousandsDelimiter(portfolioDetails.maximumLoss)
    : "";
  const maximumLossRateInitialValue = portfolioDetails
    ? maximumLossInitialValue === ""
      ? ""
      : thousandsDelimiter(applyDecimals(portfolioDetails.maximumLossRate))
    : "";

  const {
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
  } = usePortfolioAddOrEditDialogInputs({
    budgetInitialValue,
    targetGainInitialValue,
    targetReturnRateInitialValue,
    maximumLossInitialValue,
    maximumLossRateInitialValue,
  });

  const isEditMode = !!portfolioDetails;

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
            <StyledSpan>최대 손실률</StyledSpan>
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
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};

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
