import { PortfolioDetails } from "@api/portfolio";
import usePortfolioDeleteMutation from "@api/portfolio/queries/usePortfolioDeleteMutation";
import tossLogo from "@assets/images/Toss_Symbol_Primary.png";
import ConfirmAlert from "@components/ConfirmAlert";
import PortfolioModal from "@components/Portfolio/PortfolioModal";
import ToggleSwitch from "@components/ToggleSwitch";
import { Button } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverview({ data }: Props) {
  const { id } = useParams();
  const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation(
    Number(id)
  );

  const [isTargetSwitchChecked, setIsTargetSwitchChecked] = useState(true);
  const [isLossSwitchChecked, setIsLossSwitchChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onPortfolioEdit = () => {
    setIsModalOpen(true);
  };

  const onPortfolioRemove = () => {
    setIsConfirmOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onConfirmAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    portfolioDeleteMutate(Number(id));
  };

  const onTargetSwitchToggle = () => {
    setIsTargetSwitchChecked((prev) => !prev);
  };

  const onLossSwitchToggle = () => {
    setIsLossSwitchChecked((prev) => !prev);
  };

  return (
    <StyledPortfolioOverview>
      {isModalOpen && (
        <PortfolioModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          portfolioDetails={data}
        />
      )}
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="포트폴리오 삭제"
          content="포트폴리오를 삭제 하시겠습니까?"
          onClose={onConfirmAlertClose}
          onConfirm={onConfirmAction}
        />
      )}
      <Header>
        <TitleWrapper>
          <FirmImage src={tossLogo} />
          <Title>{data.name}</Title>
        </TitleWrapper>
        <ButtonWrapper>
          <Button onClick={onPortfolioEdit}>수정</Button>
          <Button onClick={onPortfolioRemove}>삭제</Button>
        </ButtonWrapper>
      </Header>
      <Body>
        <LeftPanel>
          <OverviewWrapper>
            <OverviewTitle>예산</OverviewTitle>
            <OverviewTitle>투자 금액</OverviewTitle>
            <OverviewTitle>잔고</OverviewTitle>
            <OverviewTitle>잠정 손실잔고</OverviewTitle>
          </OverviewWrapper>
          <OverviewWrapper>
            <OverviewValue>{data.budget} KRW</OverviewValue>
            <OverviewValue>{data.investedAmount} KRW</OverviewValue>
            <OverviewValue>{data.balance} KRW</OverviewValue>
            <OverviewValue>{data.provisionalLossBalance} KRW</OverviewValue>
          </OverviewWrapper>
        </LeftPanel>
        <RightPanel>
          <OverviewPanel>
            <OverviewWrapper>
              <OverviewTitle>목표 수익률</OverviewTitle>
              <OverviewTitle>총 손익</OverviewTitle>
              <OverviewTitle>총 연배당금</OverviewTitle>
            </OverviewWrapper>
            <OverviewWrapper>
              <OverviewValue>{data.targetGain} KRW</OverviewValue>
              <OverviewValue>{data.totalGain} KRW</OverviewValue>
              <OverviewValue>{data.totalAnnualDividend} KRW</OverviewValue>
            </OverviewWrapper>
            <OverviewWrapper>
              <OverviewValue>{data.targetReturnRate}%</OverviewValue>
              <OverviewPercent $isUp={data.totalGainRate > 0}>
                {data.totalGainRate} %
              </OverviewPercent>
              <OverviewPercent $isUp={data.totalAnnualDividendYield > 0}>
                {data.totalAnnualDividendYield} %
              </OverviewPercent>
            </OverviewWrapper>
            <ToggleSwitch
              isChecked={isTargetSwitchChecked}
              onToggle={onTargetSwitchToggle}
            />
            <OverviewWrapper />
          </OverviewPanel>
          <OverviewPanel>
            <OverviewWrapper>
              <OverviewTitle>최대 손실율 </OverviewTitle>
              <OverviewTitle>당일 손익 </OverviewTitle>
              <OverviewTitle>투자 연배당률</OverviewTitle>
            </OverviewWrapper>

            <OverviewWrapper>
              <OverviewValue>{data.maximumLoss} KRW</OverviewValue>
              <OverviewValue>{data.dailyGain} KRW</OverviewValue>
            </OverviewWrapper>

            <OverviewWrapper>
              <OverviewValue>{data.maximumLossRate} %</OverviewValue>
              <OverviewPercent $isUp={data.dailyGainRate > 0}>
                {data.dailyGainRate} %
              </OverviewPercent>
              <OverviewPercent $isUp={data.annualInvestmentDividendYield > 0}>
                {data.annualInvestmentDividendYield} %
              </OverviewPercent>
            </OverviewWrapper>

            <OverviewWrapper>
              <ToggleSwitch
                isChecked={isLossSwitchChecked}
                onToggle={onLossSwitchToggle}
              />
            </OverviewWrapper>
          </OverviewPanel>
        </RightPanel>
      </Body>
    </StyledPortfolioOverview>
  );
}

const StyledPortfolioOverview = styled.div`
  width: 988px;
  // height: 244px;
  background-color: #ffffff;
  border-radius: 8px;

  box-shadow: 0px 0px 12px 0px #00000014;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px 8px 24px;
  border-bottom: 1px solid #d8d8dc;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const FirmImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Title = styled.span`
  font-size: 20px;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  text-align: right;

  button {
    margin: 0px 8px;
  }
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 24px;
`;

const LeftPanel = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
`;

const RightPanel = styled.div`
  display: flex;
`;

const OverviewTitle = styled.div`
  font-size: 16px;
`;

const OverviewValue = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const OverviewPercent = styled.div<{ $isUp: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${({ $isUp }) => ($isUp ? "#089981" : "#f23645")};
`;

const OverviewPanel = styled.div`
  display: flex;

  gap: 16px;
`;

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > span {
    color: #8b8b8b;
  }
`;
