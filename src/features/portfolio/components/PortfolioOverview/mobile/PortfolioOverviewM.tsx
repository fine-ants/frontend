import RateBadge from "@components/Badges/RateBadge";
import { IconButton } from "@components/Buttons/IconButton";
import { Icon } from "@components/Icon";
import ConditionalTooltip from "@components/Tooltips/ConditionalTooltip";
import { CustomTooltip } from "@components/Tooltips/CustomTooltip";
import usePortfolioNotificationSettingsMutation from "@features/notification/api/queries/usePortfolioNotificationSettingsMutation";
import { PortfolioDetails } from "@features/portfolio/api/types";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import { Collapse, debounce } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import RealtimeValue from "../../RealtimeValue";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverviewM({ data }: Props) {
  const {
    budget,
    currentValuation,
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

  const { state: isCollapsed, setOpposite: collapseOpposite } = useBoolean();

  const { mutate } = usePortfolioNotificationSettingsMutation(
    Number(portfolioId)
  );

  // TODO : 알림 설정 테스트 필요
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
    <StyledPortfolioOverviewBody>
      <ValuationContainer>
        <div>평가금액</div>
        <CurrentValuation>
          ₩<span>{thousandsDelimiter(currentValuation)}</span>
          <IconButton
            icon={isCollapsed ? "chevron-up" : "chevron-down"}
            size="h24"
            iconColor="custom"
            customColor={{ color: "gray400", hoverColor: "gray800" }}
            onClick={collapseOpposite}
          />
        </CurrentValuation>
      </ValuationContainer>

      <Collapse in={isCollapsed} timeout="auto">
        <OverviewDetail>
          <DetailItem>
            <ItemRow>
              <ItemRowTitle>예산</ItemRowTitle>
              <Price>₩{thousandsDelimiter(budget)}</Price>
            </ItemRow>
            <ItemRow>
              <ItemRowTitle>투자 금액</ItemRowTitle>
              <Price>₩{thousandsDelimiter(investedAmount)}</Price>
            </ItemRow>
            <ItemRow>
              <ItemRowTitle>잔고</ItemRowTitle>
              <Price>₩{thousandsDelimiter(balance)}</Price>
            </ItemRow>
            <ItemRow>
              <ItemRowTitle>
                <CustomTooltip
                  placement="bottom-start"
                  title={
                    <p>
                      손실 종목을 매도 시 현재 잔고의 감당력을 표현하는 것으로
                      매도 후 실제 잔고를 나타내는 것이 아닙니다
                      <br />
                      잔고 - 손실 종목의 손실 합
                    </p>
                  }>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                    잠정 손실 잔고
                    <Icon icon="help" size={16} color="gray400" />
                  </div>
                </CustomTooltip>
              </ItemRowTitle>
              <ProvisionalLossBalance>
                ₩{thousandsDelimiter(provisionalLossBalance)}
              </ProvisionalLossBalance>
            </ItemRow>
          </DetailItem>
          <DetailItem>
            <ItemRow>
              <ItemRowTitle>
                목표 수익률
                {/* TODO : Tooltip 모바일 환경에서 테스트 필요*/}
                <ConditionalTooltip
                  condition={targetGain !== 0}
                  title={"포트폴리오 목표 수익률을 먼저 설정해주세요"}
                  placement={"bottom-start"}>
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
                      aria-label="목표 수익률 알림 설정 토글"
                    />
                  </div>
                </ConditionalTooltip>
              </ItemRowTitle>
              <Price>
                ₩{targetGain === 0 ? "-" : thousandsDelimiter(targetGain)}
                {targetGain === 0 ? (
                  "-"
                ) : (
                  <RateBadge
                    size={16}
                    value={targetReturnRate}
                    bgColorStatus={false}
                  />
                )}
              </Price>
            </ItemRow>
            <ItemRow>
              <ItemRowTitle>
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
              </ItemRowTitle>
              <Price>
                ₩{maximumLoss === 0 ? "-" : thousandsDelimiter(maximumLoss)}
                {maximumLoss === 0 ? (
                  "-"
                ) : (
                  <RateBadge
                    size={16}
                    value={-maximumLossRate}
                    bgColorStatus={false}
                  />
                )}
              </Price>
            </ItemRow>
          </DetailItem>
          <DetailItem>
            <ItemRow>
              <ItemRowTitle>총 손익</ItemRowTitle>
              <Price>
                <span>
                  ₩<RealtimeValue value={totalGain} />
                </span>
                <RateBadge
                  size={16}
                  value={totalGainRate}
                  bgColorStatus={false}
                />
              </Price>
            </ItemRow>
            <ItemRow>
              <ItemRowTitle>당일 손익</ItemRowTitle>
              <Price>
                <span>
                  ₩<RealtimeValue value={dailyGain} />
                </span>
                <RateBadge
                  size={16}
                  value={dailyGainRate}
                  bgColorStatus={false}
                  iconStatus={false}
                />
              </Price>
            </ItemRow>
          </DetailItem>
          <DetailItem>
            <ItemRow>
              <ItemRowTitle>총 연배당금</ItemRowTitle>
              <Price>
                ₩{thousandsDelimiter(annualDividend)}
                <RateBadge
                  size={16}
                  value={annualDividendYield}
                  bgColorStatus={false}
                  iconStatus={false}
                />
              </Price>
            </ItemRow>
            <ItemRow>
              <CustomTooltip
                placement="bottom-start"
                title={
                  <p style={{ font: designSystem.font.body4.font }}>
                    총 투자금액 대비 연배당률
                    <br />연 배당금 / 투자금액 * 100%
                  </p>
                }>
                <ItemRowTitle
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  투자대비 연 배당률
                  <Icon icon="help" size={16} color="gray400" />
                </ItemRowTitle>
              </CustomTooltip>
              <RateBadge
                size={16}
                value={annualInvestmentDividendYield}
                bgColorStatus={false}
              />
            </ItemRow>
          </DetailItem>
        </OverviewDetail>
      </Collapse>
    </StyledPortfolioOverviewBody>
  );
}

const StyledPortfolioOverviewBody = styled.div`
  padding: 0 16px;
`;

const ValuationContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${designSystem.color.neutral.gray800};
  border-radius: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray400};
  padding: 0 16px;
  margin: 32px 0 16px;
`;

const CurrentValuation = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};

  > span {
    font: ${designSystem.font.title2.font};
    letter-spacing: ${designSystem.font.title2.letterSpacing};
    color: ${designSystem.color.neutral.white};
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const OverviewDetail = styled.div`
  border: 1px solid ${designSystem.color.neutral.gray100};
  border-radius: 8px;

  ${DetailItem} {
    &:last-child {
      border-bottom: 0;
    }
  }
`;

const ItemRow = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemRowTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font: ${designSystem.font.body3.font};
  letter-spacing: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const ProvisionalLossBalance = styled(Price)`
  color: ${designSystem.color.neutral.gray400};
`;
