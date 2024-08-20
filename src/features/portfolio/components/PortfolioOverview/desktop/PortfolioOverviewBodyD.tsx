import RateBadge from "@components/Badges/RateBadge";
import { IconButton } from "@components/Buttons/IconButton";
import { Icon } from "@components/Icon";
import ConditionalTooltip from "@components/Tooltips/ConditionalTooltip";
import { CustomTooltip } from "@components/Tooltips/CustomTooltip";
import usePortfolioNotificationSettingsMutation from "@features/notification/api/queries/usePortfolioNotificationSettingsMutation";
import { PortfolioDetails } from "@features/portfolio/api/types";
import RealtimeValue from "@features/portfolio/components/RealtimeValue";
import { thousandsDelimiter } from "@fineants/demolition";
import { debounce } from "@mui/material";
import designSystem from "@styles/designSystem";
import { memo, useCallback } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TargetGainToolTip } from "../TargetGainToolTip";

type Props = {
  data: Omit<
    PortfolioDetails,
    "id" | "name" | "securitiesFirm" | "currentValuation"
  >;
};

export default memo(function PortfolioOverviewBodyD({ data }: Props) {
  const {
    budget,
    investedAmount,
    balance,
    provisionalLossBalance,
    targetGain,
    targetReturnRate,
    targetGainNotify,
    maximumLoss,
    maximumLossRate,
    maxLossNotify,
    totalGain,
    totalGainRate,
    dailyGain,
    dailyGainRate,
    annualDividend,
    annualDividendYield,
    annualInvestmentDividendYield,
  } = data;

  const { portfolioId } = useParams();
  const { mutate } = usePortfolioNotificationSettingsMutation(
    Number(portfolioId)
  );

  const onTargetGainNotifyButtonClick = useCallback(
    debounce(() => {
      mutate({
        notificationType: "targetGain",
        body: { isActive: !targetGainNotify },
      });
    }, 250),
    []
  );

  const onMaxLossNotifyButtonClick = useCallback(
    debounce(() => {
      mutate({
        notificationType: "maxLoss",
        body: { isActive: !maxLossNotify },
      });
    }, 250),
    []
  );

  return (
    <StyledOverviewBody>
      <BudgetSection
        budget={budget}
        investedAmount={investedAmount}
        balance={balance}
        provisionalLossBalance={provisionalLossBalance}
      />
      <TargetAndLossSection
        targetGain={targetGain}
        targetReturnRate={targetReturnRate}
        targetGainNotify={targetGainNotify}
        maximumLoss={maximumLoss}
        maximumLossRate={maximumLossRate}
        maxLossNotify={maxLossNotify}
        onTargetGainNotifyButtonClick={onTargetGainNotifyButtonClick}
        onMaxLossNotifyButtonClick={onMaxLossNotifyButtonClick}
      />
      <GainAndLossSection
        totalGain={totalGain}
        totalGainRate={totalGainRate}
        dailyGain={dailyGain}
        dailyGainRate={dailyGainRate}
      />
      <DividendSection
        annualDividend={annualDividend}
        annualDividendYield={annualDividendYield}
        annualInvestmentDividendYield={annualInvestmentDividendYield}
      />
    </StyledOverviewBody>
  );
});

const BudgetSection = memo(function ({
  budget,
  investedAmount,
  balance,
  provisionalLossBalance,
}: Pick<
  PortfolioDetails,
  "budget" | "investedAmount" | "balance" | "provisionalLossBalance"
>) {
  return (
    <OverviewBodySection>
      <OverviewBodyData>
        <div>예산</div>
        <span>{thousandsDelimiter(budget)}</span>
      </OverviewBodyData>
      <OverviewBodyData>
        <div>투자금액</div>
        <span>{thousandsDelimiter(investedAmount)}</span>
      </OverviewBodyData>
      <OverviewBodyData>
        <div>잔고</div>
        <span>{thousandsDelimiter(balance)}</span>
      </OverviewBodyData>
      <OverviewBodyData>
        <CustomTooltip
          placement="bottom-start"
          title={
            <p>
              손실 종목을 매도 시 현재 잔고의 감당력을 표현하는 것으로 매도 후
              실제 잔고를 나타내는 것이 아닙니다
              <br />
              잔고 - 손실 종목의 손실 합
            </p>
          }>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            잠정 손실 잔고 <Icon icon="help" size={16} color="gray400" />
          </div>
        </CustomTooltip>
        <span>{thousandsDelimiter(provisionalLossBalance)}</span>
      </OverviewBodyData>
    </OverviewBodySection>
  );
});

const TargetAndLossSection = memo(function ({
  targetGain,
  targetReturnRate,
  targetGainNotify,
  maximumLoss,
  maximumLossRate,
  maxLossNotify,
  onTargetGainNotifyButtonClick,
  onMaxLossNotifyButtonClick,
}: Pick<
  PortfolioDetails,
  | "targetGain"
  | "targetReturnRate"
  | "targetGainNotify"
  | "maximumLoss"
  | "maximumLossRate"
  | "maxLossNotify"
> & {
  onTargetGainNotifyButtonClick: () => void;
  onMaxLossNotifyButtonClick: () => void;
}) {
  return (
    <OverviewBodySection>
      <OverviewBodyData>
        <NotificationLabel>
          목표 수익률
          <TargetGainToolTip
            targetGain={targetGain}
            targetGainNotify={targetGainNotify}
            disabled={targetGain === 0}
            onClick={onTargetGainNotifyButtonClick}
          />
        </NotificationLabel>
        <span>{targetGain === 0 ? "-" : thousandsDelimiter(targetGain)}</span>
      </OverviewBodyData>
      <div style={{ marginLeft: "auto" }}>
        {targetGain === 0 ? (
          "-"
        ) : (
          <RateBadge
            size={16}
            value={targetReturnRate}
            bgColorStatus={false}
            iconStatus={false}
          />
        )}
      </div>
      <OverviewBodyData>
        <NotificationLabel>
          최대 손실률
          <ConditionalTooltip
            condition={maximumLoss !== 0}
            title={"포트폴리오 최대 손실률을 먼저 설정해주세요"}
            placement={"bottom-start"}>
            <div>
              <IconButton
                icon="notification"
                size="h24"
                iconColor="custom"
                customColor={{
                  color: maxLossNotify ? "blue500" : "gray400",
                  hoverColor: "gray50",
                }}
                disabled={maximumLoss === 0}
                onClick={onMaxLossNotifyButtonClick}
                aria-label="최대 손실률 알림 설정 토글"
              />
            </div>
          </ConditionalTooltip>
        </NotificationLabel>
        <span>{maximumLoss === 0 ? "-" : thousandsDelimiter(maximumLoss)}</span>
      </OverviewBodyData>
      <div style={{ marginLeft: "auto" }}>
        {maximumLoss === 0 ? (
          "-"
        ) : (
          <RateBadge
            size={16}
            value={-maximumLossRate}
            bgColorStatus={false}
            iconStatus={false}
          />
        )}
      </div>
    </OverviewBodySection>
  );
});

const GainAndLossSection = memo(function ({
  totalGain,
  totalGainRate,
  dailyGain,
  dailyGainRate,
}: Pick<
  PortfolioDetails,
  "totalGain" | "totalGainRate" | "dailyGain" | "dailyGainRate"
>) {
  return (
    <OverviewBodySection>
      <OverviewBodyData>
        <div>총 손익</div>
        <RealtimeValue value={totalGain} />
      </OverviewBodyData>
      <div style={{ marginLeft: "auto" }}>
        <RateBadge
          size={16}
          value={totalGainRate}
          bgColorStatus={false}
          iconStatus={false}
        />
      </div>
      <OverviewBodyData>
        <div>당일 손익</div>
        <RealtimeValue value={dailyGain} />
      </OverviewBodyData>
      <div style={{ marginLeft: "auto" }}>
        <RateBadge
          size={16}
          value={dailyGainRate}
          bgColorStatus={false}
          iconStatus={false}
        />
      </div>
    </OverviewBodySection>
  );
});

const DividendSection = memo(function ({
  annualDividend,
  annualDividendYield,
  annualInvestmentDividendYield,
}: Pick<
  PortfolioDetails,
  "annualDividend" | "annualDividendYield" | "annualInvestmentDividendYield"
>) {
  return (
    <OverviewBodySection>
      <OverviewBodyData>
        <div>총 연배당금</div>
        <span>{thousandsDelimiter(annualDividend)}</span>
      </OverviewBodyData>
      <div style={{ marginLeft: "auto" }}>
        <RateBadge
          size={16}
          value={annualDividendYield}
          bgColorStatus={false}
          iconStatus={false}
        />
      </div>
      <OverviewBodyData>
        <CustomTooltip
          placement="bottom-start"
          title={
            <p style={{ font: designSystem.font.body4.font }}>
              총 투자금액 대비 연배당률
              <br />연 배당금 / 투자금액 * 100%
            </p>
          }>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            투자대비 연 배당률
            <Icon icon="help" size={16} color="gray400" />
          </div>
        </CustomTooltip>
        <RateBadge
          size={16}
          value={annualInvestmentDividendYield}
          bgColorStatus={false}
          iconStatus={false}
        />
      </OverviewBodyData>
    </OverviewBodySection>
  );
});

const StyledOverviewBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;
  overflow: hidden;

  & > div {
    display: flex;
    flex-direction: column;
    padding: 16px;
  }

  & > div:nth-child(odd) {
    border-right: 1px solid ${designSystem.color.neutral.gray100};
  }

  & > div:nth-child(-n + 2) {
    border-bottom: 1px solid ${designSystem.color.neutral.gray100};
  }
`;

const OverviewBodySection = styled.div`
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

const OverviewBodyData = styled.div`
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > span {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray900};
  }
`;

const NotificationLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
