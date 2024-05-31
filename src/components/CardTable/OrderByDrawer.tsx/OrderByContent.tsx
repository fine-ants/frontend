import designSystem from "@styles/designSystem";
import styled from "styled-components";
import { OrderByListType } from "./types";

type Props<Item> = {
  orderBy: keyof Item;
  orderByList: OrderByListType<Item>;
  handleOrderBy: (orderBy: keyof Item) => void;
};

export function OrderByContent<Item>({
  orderBy,
  orderByList,
  handleOrderBy,
}: Props<Item>) {
  const setOrderBy = (orderBy: keyof Item) => {
    handleOrderBy(orderBy);
  };

  return (
    <>
      {orderByList.map((orderByObj, index) => (
        <ContentItem key={index} $isSelected={orderBy === orderByObj.orderBy}>
          <ContentItemButton onClick={() => setOrderBy(orderByObj.orderBy)}>
            <ItemTitle>{orderByObj.title}</ItemTitle>
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
