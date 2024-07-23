import { Icon } from "@components/Icon";
import { Order } from "@components/Table/types";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  order: Order;
  onChangeOrder: (order: Order) => void;
};

export function OrderContent({ order, onChangeOrder }: Props) {
  return (
    <>
      <ContentItem $isSelected={order === "asc"}>
        <ContentItemButton onClick={() => onChangeOrder("asc")}>
          <OrderWrapper>
            <Icon icon="sort_ascending" size={16} color="#373840" />
            <ItemTitle>오름차순</ItemTitle>
          </OrderWrapper>
        </ContentItemButton>
      </ContentItem>
      <ContentItem $isSelected={order === "desc"}>
        <ContentItemButton onClick={() => onChangeOrder("desc")}>
          <OrderWrapper>
            <Icon icon="sort_descending" size={16} color="#373840" />
            <ItemTitle>내림차순</ItemTitle>
          </OrderWrapper>
        </ContentItemButton>
      </ContentItem>
    </>
  );
}

const ContentItem = styled.li<{ $isSelected: boolean }>`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ $isSelected }) =>
    $isSelected ? designSystem.color.neutral.gray50 : "transfer"};
  padding: 0 16px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const ContentItemButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;

const ItemTitle = styled.span`
  color: ${designSystem.color.neutral.gray600};
`;

const OrderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
