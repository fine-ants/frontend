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
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverviewBody({ data }: Props) {
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

  const onTargetGainNotifyButtonClick = debounce(() => {
    mutate({
      notificationType: "targetGain",
      body: { isActive: !targetGainNotify },
    });
  }, 250);

  const onMaxLossNotifyButtonClick = debounce(() => {
    mutate({
      notificationType: "maxLoss",
      body: { isActive: !maxLossNotify },
    });
  }, 250);

  return (
    <StyledOverviewBody>
      <OverviewBodyTop>
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
              arrow
              placement="bottom-start"
              title={
                <p>
                  손실 종목을 매도 시 현재 잔고의 감당력을 표현하는 것으로 매도
                  후 실제 잔고를 나타내는 것이 아닙니다
                  <br />
                  잔고 - 손실 종목의 손실 합
                </p>
              }>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                잠정 손실 잔고 <Icon icon="help" size={16} color="gray400" />
              </div>
            </CustomTooltip>
            <span>{thousandsDelimiter(provisionalLossBalance)}</span>
          </OverviewBodyData>
        </OverviewBodySection>
        <OverviewBodySection>
          <OverviewBodyData>
            <NotificationLabel>
              목표 수익률
              <ConditionalTooltip
                condition={targetGain !== 0}
                tooltipProps={{
                  title: "포트폴리오 목표 수익률을 먼저 설정해주세요",
                  arrow: true,
                  placement: "bottom-start",
                }}>
                <div>
                  <IconButton
                    icon="notification"
                    size="h24"
                    iconColor="custom"
                    customColor={{
                      color: targetGainNotify ? "blue500" : "gray400",
                      hoverColor: "gray50",
                    }}
                    disabled={targetGain === 0}
                    onClick={onTargetGainNotifyButtonClick}
                  />
                </div>
              </ConditionalTooltip>
            </NotificationLabel>
            <span>
              {targetGain === 0 ? "-" : thousandsDelimiter(targetGain)}
            </span>
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
              최대 손실율
              <ConditionalTooltip
                condition={maximumLoss !== 0}
                tooltipProps={{
                  title: "포트폴리오 최대 손실율을 먼저 설정해주세요",
                  arrow: true,
                  placement: "bottom-start",
                }}>
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
                  />
                </div>
              </ConditionalTooltip>
            </NotificationLabel>
            <span>
              {maximumLoss === 0 ? "-" : thousandsDelimiter(maximumLoss)}
            </span>
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
      </OverviewBodyTop>

      <OverviewBodyBottom>
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
              arrow
              placement="bottom-start"
              title={
                <p style={{ font: designSystem.font.body4.font }}>
                  총 투자금액 대비 연배당률
                  <br />연 배당금 / 투자금액 * 100%
                </p>
              }>
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
      </OverviewBodyBottom>
    </StyledOverviewBody>
  );
}

const StyledOverviewBody = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
  overflow: hidden;
`;

const OverviewBodyTop = styled.div`
  display: flex;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const OverviewBodyBottom = styled.div`
  display: flex;
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
