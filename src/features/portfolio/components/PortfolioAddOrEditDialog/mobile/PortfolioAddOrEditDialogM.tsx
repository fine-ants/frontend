import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import SlideUpTransition from "@components/SlideUpTransition";
import { TextField } from "@components/TextField/TextField";
import { SecuritiesFirm } from "@constants/securitiesFirm";
import usePortfolioAddMutation from "@features/portfolio/api/queries/usePortfolioAddMutation";
import usePortfolioEditMutation from "@features/portfolio/api/queries/usePortfolioEditMutation";
import { PortfolioDetails } from "@features/portfolio/api/types";
import {
  removeThousandsDelimiter,
  thousandsDelimiter,
  useText,
} from "@fineants/demolition";
import { Dialog, FormControl } from "@mui/material";
import designSystem from "@styles/designSystem";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { applyDecimals } from "../../../utils/calculations";
import usePortfolioAddOrEditDialogInputs from "../hooks/usePortfolioAddOrEditDialogInputs";
import { SecuritiesFirmSelectDrawer } from "./SecuritiesFirmSelectDrawer";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

export default function PortfolioAddOrEditDialogM({
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
    <Dialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}>
      <Form onSubmit={onSubmit}>
        <HeaderWrapper>
          <IconButton
            icon="close"
            size="h40"
            iconColor="custom"
            customColor={{ color: "gray800", hoverColor: "gray50" }}
            onClick={onClose}
          />
          <Header>포트폴리오 {isEditMode ? `수정` : `추가`}</Header>
        </HeaderWrapper>
        <Body>
          <Row>
            <Label>
              이름 <span>*</span>
            </Label>
            <TextField
              size="h48"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </Row>
          <Row>
            <Label>
              증권사 <span>*</span>
            </Label>
            <FormControl fullWidth>
              <SecuritiesFirmSelectDrawer
                securitiesFirm={securitiesFirm}
                onChangeSecuritiesFirm={onChangeSecuritiesFirm}
              />
            </FormControl>
          </Row>
          <Row>
            <Label>예산</Label>
            <TextField
              size="h48"
              placeholder="예산을 입력하세요"
              error={isBudgetError}
              errorText={budgetError}
              value={budget}
              onChange={(e) => onBudgetChange(e.target.value.trim())}
              endAdornment={<TextFieldEndAdornment>₩</TextFieldEndAdornment>}
            />
          </Row>
          <Row>
            <Label>목표 수익률</Label>
            <TextFieldsWrapper>
              <TextField
                size="h48"
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
                size="h48"
                disabled={isBudgetEmpty}
                error={isTargetGainError}
                errorText={targetGainError}
                value={targetGain}
                onChange={(e) => targetGainHandler(e.target.value.trim())}
                endAdornment={<TextFieldEndAdornment>₩</TextFieldEndAdornment>}
              />
            </TextFieldsWrapper>
          </Row>
          <Row>
            <Label>최대 손실률</Label>
            <TextFieldsWrapper>
              <TextField
                size="h48"
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
                size="h48"
                disabled={isBudgetEmpty}
                error={isMaximumLossError}
                errorText={maximumLossError}
                value={maximumLoss}
                onChange={(e) => maximumLossHandler(e.target.value.trim())}
                endAdornment={<TextFieldEndAdornment>₩</TextFieldEndAdornment>}
              />
            </TextFieldsWrapper>
          </Row>
        </Body>
        <ButtonWrapper>
          <Button
            variant="primary"
            size="h48"
            type="submit"
            disabled={!isFormValid()}>
            {isEditMode ? `수정` : `추가`}
          </Button>
        </ButtonWrapper>
      </Form>
    </Dialog>
  );
}

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Header = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Body = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Row = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};

  > span {
    color: ${designSystem.color.state.red500};
  }
`;

const TextFieldsWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const TextFieldEndAdornment = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray400};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 16px 8px;
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;
