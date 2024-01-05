import usePortfolioDeleteMutation from "@api/portfolio/queries/usePortfolioDeleteMutation";
import { PortfolioDetails } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import LabelBadge from "@components/common/Badges/LabelBadge";
import RateBadge from "@components/common/Badges/RateBadge";
import Breadcrumb from "@components/common/Breadcrumb";
import Button from "@components/common/Buttons/Button";
import securitiesFirmLogos, {
  SecuritiesFirm,
} from "@styles/securitiesFirmLogos";
import { thousandsDelimiter } from "@utils/thousandsDelimiter";

import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverview({ data }: Props) {
  const { portfolioId } = useParams();
  const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation(
    Number(portfolioId)
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onPortfolioEdit = () => {
    setIsDialogOpen(true);
  };

  const onPortfolioRemove = () => {
    setIsConfirmOpen(true);
  };

  const onDialogClose = () => {
    setIsDialogOpen(false);
  };

  const onConfirmAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    portfolioDeleteMutate(Number(portfolioId));
  };

  return (
    <StyledPortfolioOverview>
      {isDialogOpen && (
        <PortfolioAddDialog
          isOpen={isDialogOpen}
          onClose={onDialogClose}
          portfolioDetails={data}
        />
      )}
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="포트폴리오를 삭제 하시겠습니까?"
          onClose={onConfirmAlertClose}
          onConfirm={onConfirmAction}
        />
      )}
      <TitleContainer>
        <Breadcrumb
          depthData={[
            { name: "내 포트폴리오", url: "/portfolios" },
            { name: data.name, url: `/portfolio/${portfolioId}` },
          ]}
        />
        <TitleContent>
          <TitleWrapper>
            <FirmImage
              src={securitiesFirmLogos[data.securitiesFirm as SecuritiesFirm]}
            />
            <Title>{data.name}</Title>
            <LabelBadge title={data.securitiesFirm} />
          </TitleWrapper>
          <ButtonWrapper>
            <Button
              variant="tertiary"
              size="h32"
              onClick={onPortfolioRemove}
              disabled={false}>
              삭제
            </Button>
            <Button
              variant="secondary"
              size="h32"
              onClick={onPortfolioEdit}
              disabled={false}>
              편집
            </Button>
          </ButtonWrapper>
        </TitleContent>
      </TitleContainer>
      <ValuationContainer>
        <div>평가금액</div>
        <CurrentValuation>
          ₩<span>{thousandsDelimiter(data.currentValuation ?? 0)}</span>
        </CurrentValuation>
      </ValuationContainer>
      <OverviewContainer>
        <OverviewTop>
          <Overview>
            <OverviewData>
              <div>예산</div>
              <span>₩{thousandsDelimiter(data.budget ?? 0)}</span>
            </OverviewData>
            <OverviewData>
              <div>투자금액</div>
              <span>₩{thousandsDelimiter(data.investedAmount ?? 0)}</span>
            </OverviewData>
            <OverviewData>
              <div>잔고</div>
              <span>₩{thousandsDelimiter(data.balance ?? 0)}</span>
            </OverviewData>
            <OverviewData>
              <div>잠정 손실잔고</div>
              <span>
                ₩{thousandsDelimiter(data.provisionalLossBalance ?? 0)}
              </span>
            </OverviewData>
          </Overview>
          <Overview>
            <OverviewData>
              <div>목표 수익률</div>
              <span>₩{thousandsDelimiter(data.targetGain ?? 0)}</span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                rate={data.targetReturnRate}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
            <OverviewData>
              <div>최대 손실율</div>
              <span>₩{thousandsDelimiter(data.maximumLoss ?? 0)}</span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                rate={-data.maximumLossRate}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
          </Overview>
        </OverviewTop>
        <OverviewBottom>
          <Overview>
            <OverviewData>
              <div>총 손익</div>
              <span>₩{thousandsDelimiter(data.totalGain ?? 0)}</span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                rate={data.totalGainRate}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
            <OverviewData>
              <div>당일 손익</div>
              <span>₩{thousandsDelimiter(data.dailyGain ?? 0)}</span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                rate={data.dailyGainRate}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
          </Overview>
          <Overview>
            <OverviewData>
              <div>총 연배당금</div>
              <span>₩{thousandsDelimiter(data.annualDividend)}</span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                rate={data.annualDividendYield}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
            <OverviewData>
              <div>투자대비 연 배당률</div>
              <RateBadge
                size={16}
                rate={data.annualInvestmentDividendYield}
                bgColorStatus={false}
                iconStatus={false}
              />
            </OverviewData>
          </Overview>
        </OverviewBottom>
      </OverviewContainer>
    </StyledPortfolioOverview>
  );
}

const StyledPortfolioOverview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const TitleContainer = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const FirmImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Title = styled.span`
  font: ${({ theme: { font } }) => font.heading3};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ValuationContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-radius: 8px;
  color: ${({ theme: { color } }) => color.neutral.gray400};
  background-color: ${({ theme: { color } }) => color.neutral.gray800};
  font: ${({ theme: { font } }) => font.title5};
`;

const CurrentValuation = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font: ${({ theme: { font } }) => font.title2};
  color: ${({ theme: { color } }) => color.neutral.gray600};
  > span {
    font: ${({ theme: { font } }) => font.title1};
    color: ${({ theme: { color } }) => color.neutral.white};
  }
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  border-radius: 8px;
  color: ${({ theme: { color } }) => color.neutral.gray600};
  font: ${({ theme: { font } }) => font.title5};
  overflow: hidden;
`;

const OverviewWrapper = styled.div`
  display: flex;
`;

const OverviewTop = styled(OverviewWrapper)`
  border-bottom: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
`;

const OverviewBottom = styled(OverviewWrapper)``;

const Overview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 444px;
  height: 140px;
  padding: 16px;

  &:first-child {
    border-right: 1px solid ${({ theme: { color } }) => color.neutral.gray100};
  }
`;

const OverviewData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 24px;
  > span {
    font: ${({ theme: { font } }) => font.body3};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;
