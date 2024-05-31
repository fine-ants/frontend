import designSystem from "@styles/designSystem";
import styled from "styled-components";
import { OrderByItem } from "./types";

type Props<Item> = {
  orderBy: keyof Item;
  orderByList: OrderByItem<Item>[];
  onChangeOrderBy: (orderBy: keyof Item) => void;
};

export function OrderByContent<Item>({
  orderBy,
  orderByList,
  onChangeOrderBy,
}: Props<Item>) {
  return (
    <>
      {orderByList.map((orderByItem, index) => (
        <ContentItem key={index} $isSelected={orderBy === orderByItem.orderBy}>
          <ContentItemButton
            onClick={() => onChangeOrderBy(orderByItem.orderBy)}>
            <ItemTitle>{orderByItem.title}</ItemTitle>
          </ContentItemButton>
        </ContentItem>
      ))}
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
