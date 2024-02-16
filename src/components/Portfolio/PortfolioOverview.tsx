import usePortfolioDeleteMutation from "@api/portfolio/queries/usePortfolioDeleteMutation";
import { PortfolioDetails, PortfolioDetailsSSE } from "@api/portfolio/types";
import ConfirmAlert from "@components/ConfirmAlert";
import PortfolioAddDialog from "@components/Portfolio/PortfolioAddDialog";
import RateBadge from "@components/common/Badges/DeltaBadge";
import LabelBadge from "@components/common/Badges/LabelBadge";
import Breadcrumb from "@components/common/Breadcrumb";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import securitiesFirmLogos, {
  SecuritiesFirm,
} from "@styles/securitiesFirmLogos";
import { thousandsDelimiter } from "@utils/delimiters";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: PortfolioDetails;
  sseData: PortfolioDetailsSSE | null;
};

export default function PortfolioOverview({ data, sseData }: Props) {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation();

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
    navigate(Routes.PORTFOLIOS);
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
              <Icon icon="trash" size={16} color="gray600" />
              삭제
            </Button>
            <Button
              variant="secondary"
              size="h32"
              onClick={onPortfolioEdit}
              disabled={false}>
              <Icon icon="edit" size={16} color="blue500" />
              편집
            </Button>
          </ButtonWrapper>
        </TitleContent>
      </TitleContainer>
      <ValuationContainer>
        <div>평가금액</div>
        <CurrentValuation>
          ₩
          <span>
            {thousandsDelimiter(
              sseData?.currentValuation ?? data.currentValuation
            )}
          </span>
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
                ₩
                {thousandsDelimiter(
                  sseData?.provisionalLossBalance ?? data.provisionalLossBalance
                )}
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
                value={data.targetReturnRate}
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
                value={-data.maximumLossRate}
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
              <span>
                ₩{thousandsDelimiter(sseData?.totalGain ?? data.totalGain)}
              </span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                value={sseData?.totalGainRate ?? data.totalGainRate}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
            <OverviewData>
              <div>당일 손익</div>
              <span>
                ₩{thousandsDelimiter(sseData?.dailyGain ?? data.dailyGain)}
              </span>
            </OverviewData>
            <div style={{ marginLeft: "auto" }}>
              <RateBadge
                size={16}
                value={sseData?.dailyGainRate ?? data.dailyGainRate}
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
                value={data.annualDividendYield}
                bgColorStatus={false}
                iconStatus={false}
              />
            </div>
            <OverviewData>
              <div>투자대비 연 배당률</div>
              <RateBadge
                size={16}
                value={data.annualInvestmentDividendYield}
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
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const ValuationContainer = styled.div`
  height: 64px;
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${designSystem.color.neutral.gray800};
  border-radius: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
`;

const CurrentValuation = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font: ${designSystem.font.title2.font};
  letter-spacing: ${designSystem.font.title2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};

  > span {
    font: ${designSystem.font.title1.font};
    letter-spacing: ${designSystem.font.title1.letterSpacing};
    color: ${designSystem.color.neutral.white};
  }
`;

const OverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
  overflow: hidden;
`;

const OverviewWrapper = styled.div`
  display: flex;
`;

const OverviewTop = styled(OverviewWrapper)`
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
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
    border-right: 1px solid ${designSystem.color.neutral.gray100};
  }
`;

const OverviewData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 24px;
  > span {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray900};
  }
`;
