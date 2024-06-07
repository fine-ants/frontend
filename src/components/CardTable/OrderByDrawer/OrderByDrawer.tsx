import BottomDrawer from "@components/Drawer/BottomDrawer";
import { Order } from "@components/Table/types";
import { useState } from "react";
import styled from "styled-components";
import { MainContent } from "./MainContent";
import { OrderByContent } from "./OrderByContent";
import { OrderContent } from "./OrderContent";
import { OrderByDrawerStep, OrderByItem } from "./types";

type Props<Item> = {
  order: Order;
  orderBy: keyof Item;
  orderByList: OrderByItem<Item>[];
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  applyOrderOption: (order: Order, orderBy: keyof Item) => void;
};

export function OrderByDrawer<Item>({
  order,
  orderBy,
  orderByList,
  isDrawerOpen,
  openDrawer,
  closeDrawer,
  applyOrderOption,
}: Props<Item>) {
  const [drawerOrder, setDrawerOrder] = useState<Order>(order);
  const [drawerOrderBy, setDrawerOrderBy] = useState<keyof Item>(orderBy);
  const [step, setStep] = useState<OrderByDrawerStep>("main");

  const onChangeOrder = (order: Order) => {
    setDrawerOrder(order);
    setStep("main");
  };

  const onChangeOrderBy = (orderBy: keyof Item) => {
    setDrawerOrderBy(orderBy);
    setStep("main");
  };

  const clearOrderOption = () => {
    if (order === drawerOrder && orderBy === drawerOrderBy) return;

    setDrawerOrder(order);
    setDrawerOrderBy(orderBy);
  };

  const changeStep = (step: OrderByDrawerStep) => {
    setStep(step);
  };

  const onHandleTransitionEnd = () => {
    clearOrderOption();
    setStep("main");
  };

  const handleApplyButton = () => {
    applyOrderOption(drawerOrder, drawerOrderBy);
    closeDrawer();
  };

  const currentOrderBy =
    orderByList.find((item) => item.orderBy === drawerOrderBy)?.title ||
    "기본 정렬";

  return (
    <BottomDrawer
      isDrawerOpen={isDrawerOpen}
      onOpenDrawer={openDrawer}
      onCloseDrawer={closeDrawer}
      handleTransitionEnd={onHandleTransitionEnd}
      handleBackButton={step !== "main" ? () => setStep("main") : undefined}>
      <OrderByDrawerWrapper>
        <Content>
          {step === "main" && (
            <MainContent
              currentOrderBy={currentOrderBy}
              order={drawerOrder}
              changeStep={changeStep}
              applyOrderOption={handleApplyButton}
            />
          )}
          {step === "orderBy" && (
            <OrderByContent
              orderBy={drawerOrderBy}
              orderByList={orderByList}
              onChangeOrderBy={onChangeOrderBy}
            />
          )}
          {step === "order" && (
            <OrderContent order={drawerOrder} onChangeOrder={onChangeOrder} />
          )}
        </Content>
      </OrderByDrawerWrapper>
    </BottomDrawer>
  );
}

const OrderByDrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Content = styled.ul`
  width: 100%;
  list-style-type: none;
`;
