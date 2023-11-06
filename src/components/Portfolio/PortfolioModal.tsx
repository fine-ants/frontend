import { PortfolioDetails } from "@api/portfolio";
import usePortfolioAddMutation from "@api/portfolio/queries/usePortfolioAddMutation";
import usePortfolioEditMutation from "@api/portfolio/queries/usePortfolioEditMutation";
import BaseModal from "@components/BaseModal";
import useText from "@components/hooks/useText";
import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { calculateRate, calculateValue } from "@utils/calculations";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  portfolioDetails?: PortfolioDetails;
};

// TODO: Refactoring 시급!
export default function PortfolioModal({
  isOpen,
  onClose,
  portfolioDetails,
}: Props) {
  const { id } = useParams();

  const {
    mutate: editMutate,
    isError: isEditError,
    isSuccess: isEditSuccess,
  } = usePortfolioEditMutation(Number(id));

  const { mutate: addMutate } = usePortfolioAddMutation({
    onSuccessCb: onClose,
  });

  const [securitiesFirm, setSecuritiesFirm] = useState(
    portfolioDetails ? portfolioDetails.securitiesFirm : "fineAnts"
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
      calculateRate(Number(value), budgetNumber).toString()
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
    onMaximumLossRateChange(
      (((budgetNumber - valueNumber) / budgetNumber) * 100).toString()
    );
  });

  const maximumLossRateHandler = changeIfNumberOnly((value: string) => {
    onMaximumLossRateChange(value);
    onMaximumLossChange(calculateValue(-Number(value), Number(budget)));
  });

  const handleChange = (event: SelectChangeEvent) => {
    setSecuritiesFirm(event.target.value);
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
      // TODO : 포트폴리오 수정

      editMutate({ portfolioId: Number(id), body: body });
    } else {
      // TODO : 포트폴리오 추가

      addMutate(body);
    }
  };

  // 예산이 변경되었을 때
  useEffect(() => {
    if (isBudgetEmpty) {
      clearInputs();
    } else {
      onTargetGainHandler(targetGain);
      onMaximumLossHandler(maximumLoss);
    }
  }, [
    budget,
    clearInputs,
    isBudgetEmpty,
    maximumLoss,
    onMaximumLossHandler,
    onTargetGainHandler,
    targetGain,
  ]);

  useEffect(() => {
    if (isEditSuccess) {
      onClose();
    }

    if (isEditError) {
      // TODO toast
    }
  }, [isEditSuccess, isEditError, onClose]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <main />
        <Header>포트폴리오 {isEditMode ? `수정` : `추가`}</Header>
        <CloseButton onClick={onClose}>close</CloseButton>
        <Body>
          <Row>
            <StyledSpan>증권사</StyledSpan>
            <FormControl fullWidth>
              <Select
                value={securitiesFirm}
                onChange={handleChange}
                inputProps={{ "aria-label": "Without label" }}>
                <MenuItem value={"fineAnts"}>없음</MenuItem>
                <MenuItem value={"kb"}>KB증권</MenuItem>
                <MenuItem value={"toss"}>토스증권</MenuItem>
              </Select>
            </FormControl>
          </Row>
          <Row>
            <StyledSpan>이름</StyledSpan>
            <StyledInput
              placeholder="포트폴리오 제목을 입력해 주세요"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
            />
          </Row>
          <Row>
            <StyledSpan>예산</StyledSpan>
            <StyledInput
              placeholder="예산을 입력해 주세요"
              value={budget}
              onChange={(e) => onBudgetInputChange(e.target.value.trim())}
            />
            <span>KRW</span>
          </Row>
          <Row>
            <StyledSpan>목표 수익</StyledSpan>
            <InputWrapper>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="목표 수익을 입력해 주세요"
                value={targetGain}
                onChange={(e) => onTargetGainHandler(e.target.value.trim())}
              />
              <span>KRW</span>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="목표 수익률을 입력해 주세요"
                value={targetReturnRate}
                onChange={(e) =>
                  onTargetReturnRateHandler(e.target.value.trim())
                }
              />
              <span>%</span>
            </InputWrapper>
          </Row>
          <Row>
            <StyledSpan>최대 손실</StyledSpan>
            <InputWrapper>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="최대 손실을 입력해 주세요"
                value={maximumLoss}
                onChange={(e) => onMaximumLossHandler(e.target.value.trim())}
              />
              <span>KRW</span>
              <StyledInput
                disabled={isBudgetEmpty}
                placeholder="최대 손실율을 입력해 주세요"
                value={maximumLossRate}
                onChange={(e) => maximumLossRateHandler(e.target.value.trim())}
              />
              <span>%</span>
            </InputWrapper>
          </Row>
        </Body>
        {/* TODO : submitButton disabled 조건식 추가 */}
        <ButtonWrapper>
          <SubmitButton onClick={onSubmit}>저장</SubmitButton>
        </ButtonWrapper>
      </Wrapper>
    </BaseModal>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const StyledInput = styled(Input)`
  min-width: auto;
  width: 100%;
`;

const StyledSpan = styled.span`
  width: 95px;
  text-align: center;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 0;
  right: 0;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
`;

const SubmitButton = styled(Button)`
  width: 70px;
  height: 30px;
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
  text-align: right;
`;
