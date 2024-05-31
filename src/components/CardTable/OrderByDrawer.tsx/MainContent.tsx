import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { Order } from "@components/Table/types";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import { OrderByDrawerStep } from "./types";

type Props = {
  currentOrderBy: string;
  order: Order;
  handleStep: (step: OrderByDrawerStep) => void;
  applyOrderOption: () => void;
};

export function MainContent({
  currentOrderBy,
  order,
  handleStep,
  applyOrderOption,
}: Props) {
  return (
    <>
      <ContentItem>
        <ContentItemButton onClick={() => handleStep("orderBy")}>
          <ItemTitle>정렬 기준</ItemTitle>
          <ItemState>
            {currentOrderBy}
            <Icon icon="chevron-right" color="gray600" size={16} />
          </ItemState>
        </ContentItemButton>
      </ContentItem>
      <ContentItem>
        <ContentItemButton onClick={() => handleStep("order")}>
          <ItemTitle>순서</ItemTitle>
          <ItemState>
            <OrderWrapper>
              <Icon
                icon={order === "asc" ? "sort_ascending" : "sort_descending"}
                size={16}
                color="#373840"
              />
              {order === "asc" ? "오름차순" : "내림차순"}
              <Icon icon="chevron-right" color="gray600" size={16} />
            </OrderWrapper>
          </ItemState>
        </ContentItemButton>
      </ContentItem>
      <ContentItem>
        <StyledButton variant="primary" size="h48" onClick={applyOrderOption}>
          적용
        </StyledButton>
      </ContentItem>
    </>
  );
}

const ContentItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 8px;
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

const ItemState = styled.span`
  min-width: 30px;
  display: flex;
  gap: 4px;
  align-items: center;
  color: ${designSystem.color.neutral.gray800};
`;

const OrderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledButton = styled(Button)`
  width: 100%;
`;
