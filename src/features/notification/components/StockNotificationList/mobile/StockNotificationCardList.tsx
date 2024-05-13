import { IconButton } from "@components/Buttons/IconButton";
import { TextButton } from "@components/Buttons/TextButton";
import ConfirmAlert from "@components/ConfirmAlert";
import { Icon } from "@components/Icon";
import useAllStockPriceTargetsDeleteMutation from "@features/notification/api/queries/useAllStockPriceTargetsDeleteMutation";
import useStockNotificationSettingsMutation from "@features/notification/api/queries/useStockNotificationSettingsMutation";
import { StockNotification } from "@features/notification/api/types";
import { thousandsDelimiter } from "@fineants/demolition";
import { useBoolean } from "@hooks/useBoolean";
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

      <ItemBody>
        <ItemRow>
          <SubTitle>이전 종가</SubTitle>
          <Price>₩{thousandsDelimiter(lastPrice)}</Price>
        </ItemRow>
        <ItemRow>
          <SubTitle>지정가 알림</SubTitle>
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
        </ItemRow>
        <ItemRow>
          <SubTitle>지정가 알림 삭제</SubTitle>
          <TextButton size="h24" color="gray" onClick={onRemoveAllAlertOpen}>
            <Icon icon="trash" size={16} color="gray600" />
            전체 삭제
          </TextButton>
        </ItemRow>
        <ItemRow>
          <SubTitle>지정가</SubTitle>
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
        </ItemRow>
      </ItemBody>

      <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
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

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemRow = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Price = styled.div`
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const SubTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;
