import { IconButton } from "@components/Buttons/IconButton";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import { PlainCard } from "@components/CardTable/PlainCardTable/PlainCard";
import ConditionalTooltip from "@components/Tooltips/ConditionalTooltip";
import { securitiesFirmLogos } from "@constants/securitiesFirm";
import usePortfolioNotificationSettingsMutation from "@features/notification/api/queries/usePortfolioNotificationSettingsMutation";
import { PortfolioNotification } from "@features/notification/api/types";
import { useBoolean } from "@fineants/demolition";
import { debounce } from "@mui/material";

type Props = {
  visibleRows: readonly PortfolioNotification[];
};

export function PortfolioNotificationCardBody({ visibleRows }: Props) {
  return (
    <>
      {visibleRows.map((item, index) => (
        <PortfolioNotificationCard key={index} item={item} />
      ))}
    </>
  );
}

function PortfolioNotificationCard({ item }: { item: PortfolioNotification }) {
  const {
    portfolioId,
    securitiesFirm,
    name,
    targetGainNotify,
    maxLossNotify,
    isTargetGainSet,
    isMaxLossSet,
  } = item;

  const { mutate } = usePortfolioNotificationSettingsMutation(portfolioId);

  const {
    state: isTargetGainTooltipOpen,
    setOpposite: setIsTargetGainTooltipOpposite,
  } = useBoolean();
  const {
    state: isMaxLossTooltipOpen,
    setOpposite: setIsMaxLossTooltipOpposite,
  } = useBoolean();

  const onTargetGainNotifyButtonClick = debounce(() => {
    if (!isTargetGainSet) {
      setIsTargetGainTooltipOpposite();

      setTimeout(() => {
        setIsTargetGainTooltipOpposite();
      }, 1500);
      return;
    }

    mutate({
      notificationType: "targetGain",
      body: { isActive: !targetGainNotify },
    });
  }, 250);

  const onMaxLossNotifyButtonClick = debounce(() => {
    if (!isMaxLossSet) {
      setIsMaxLossTooltipOpposite();

      setTimeout(() => {
        setIsMaxLossTooltipOpposite();
      }, 1500);
      return;
    }

    mutate({
      notificationType: "maxLoss",
      body: { isActive: !maxLossNotify },
    });
  }, 250);

  return (
    <PlainCard
      CardHeader={
        <>
          <img
            src={securitiesFirmLogos[securitiesFirm]}
            alt={securitiesFirm}
            width="32px"
            height="32px"
          />
          {name}
        </>
      }
      CardBody={
        <>
          <CardItemRow title="목표 수익률 도달 알림">
            <ConditionalTooltip
              open={isTargetGainTooltipOpen}
              condition={isTargetGainSet}
              title={"포트폴리오 최대 손실률을 먼저 설정해주세요"}
              placement={"bottom-end"}>
              <div>
                <IconButton
                  icon="notification"
                  size="h32"
                  iconColor="custom"
                  customColor={{
                    color: targetGainNotify ? "blue500" : "gray400",
                    hoverColor: "gray200",
                  }}
                  onClick={onTargetGainNotifyButtonClick}
                />
              </div>
            </ConditionalTooltip>
          </CardItemRow>
          <CardItemRow title="최대 손실률 도달 알림">
            <ConditionalTooltip
              open={isMaxLossTooltipOpen}
              condition={isMaxLossSet}
              title={"포트폴리오 목표 수익률을 먼저 설정해주세요"}
              placement={"bottom-end"}>
              <div>
                <IconButton
                  icon="notification"
                  size="h32"
                  iconColor="custom"
                  customColor={{
                    color: maxLossNotify ? "blue500" : "gray400",
                    hoverColor: "gray200",
                  }}
                  onClick={onMaxLossNotifyButtonClick}
                />
              </div>
            </ConditionalTooltip>
          </CardItemRow>
        </>
      }
    />
  );
}
