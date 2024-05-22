import { IconButton } from "@components/Buttons/IconButton";
import { TextButton } from "@components/Buttons/TextButton";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/Icon";
import useAllStockPriceTargetsDeleteMutation from "@features/notification/api/queries/useAllStockPriceTargetsDeleteMutation";
import useStockNotificationSettingsMutation from "@features/notification/api/queries/useStockNotificationSettingsMutation";
import { StockNotification } from "@features/notification/api/types";
import { thousandsDelimiter, useBoolean } from "@fineants/demolition";
import { Collapse, debounce } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import { StockNotificationTargetPrices } from "./StockNotificationTargetPrices";

type Props = {
  visibleRows: readonly StockNotification[];
};

export function StockNotificationCardList({ visibleRows }: Props) {
  return (
    <>
      {visibleRows.map((item, index) => (
        <StockNotificationCard key={index} item={item} />
      ))}
    </>
  );
}

function StockNotificationCard({ item }: { item: StockNotification }) {
  const { companyName, isActive, lastPrice, targetPrices, tickerSymbol } = item;

  const { mutate: activationMutate } = useStockNotificationSettingsMutation();
  const { mutate: removeAllMutate } = useAllStockPriceTargetsDeleteMutation();

  const { state: isCollapsed, setOpposite: collapseOpposite } = useBoolean();
  const {
    state: isRemoveAllConfirmOpen,
    setTrue: onRemoveAllAlertOpen,
    setFalse: onRemoveAllAlertClose,
  } = useBoolean();

  const onNotificationButtonClick = debounce(() => {
    activationMutate({ tickerSymbol, isActive: !isActive });
  }, 250);

  const onConfirmRemoveAll = () => {
    const targetPriceNotificationIds = targetPrices.map(
      (item) => item.notificationId
    );
    removeAllMutate({ targetPriceNotificationIds });
  };

  return (
    <StyledStockNotificationCard>
      <Title>{companyName}</Title>

      <CardItemBody>
        <CardItemRow title="이전 종가">
          <Price>₩{thousandsDelimiter(lastPrice)}</Price>
        </CardItemRow>
        <CardItemRow title="지정가 알림">
          <IconButton
            icon="notification"
            size="h32"
            iconColor="custom"
            customColor={{
              color: isActive ? "blue500" : "gray400",
              hoverColor: "gray200",
            }}
            onClick={onNotificationButtonClick}
          />
        </CardItemRow>
        <CardItemRow title="지정가 알림 삭제">
          <TextButton size="h24" color="gray" onClick={onRemoveAllAlertOpen}>
            <Icon icon="trash" size={16} color="gray600" />
            전체 삭제
          </TextButton>
        </CardItemRow>
        <CardItemRow title="지정가">
          <IconButton
            icon={isCollapsed ? "chevron-up" : "chevron-down"}
            size="h32"
            iconColor="custom"
            customColor={{
              color: isCollapsed ? "blue500" : "gray400",
              hoverColor: "gray200",
            }}
            onClick={collapseOpposite}
          />
        </CardItemRow>
      </CardItemBody>

      <Collapse in={isCollapsed} timeout="auto">
        <StockNotificationTargetPrices
          companyName={companyName}
          targetPrices={targetPrices}
        />
      </Collapse>

      {isRemoveAllConfirmOpen && (
        <ConfirmAlert
          isOpen={isRemoveAllConfirmOpen}
          title={`[${companyName}] 지정가 알림을 모두 삭제하시겠습니까?`}
          onClose={onRemoveAllAlertClose}
          onConfirm={onConfirmRemoveAll}
        />
      )}
    </StyledStockNotificationCard>
  );
}

const StyledStockNotificationCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-bottom: 1px solid ${designSystem.color.neutral.gray100};
`;

const Title = styled.div`
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
  margin-bottom: 16px;
`;

const CardItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Price = styled.div`
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;
