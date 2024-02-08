import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import designSystem from "@styles/designSystem";
import { thousandsDelimiter } from "@utils/delimiters";
import { MouseEvent } from "react";
import styled from "styled-components";
import StockTargetPriceForm from "./StockTargetPriceForm";

// TODO: msw 구현
const alertData = [
  {
    id: 1,
    targetPrice: 80000,
  },
  {
    id: 2,
    targetPrice: 90000,
  },
  {
    id: 3,
    targetPrice: 100000,
  },
  {
    id: 4,
    targetPrice: 110000,
  },
];

export default function AlertDropdown() {
  const { onOpen, DropdownMenu } = useDropdown();

  const onDropdownButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    onOpen(e);
  };

  return (
    <>
      <Button variant="secondary" size="h32" onClick={onDropdownButtonClick}>
        <Icon icon="notification" size={24} color="blue500" />
        알림 설정
      </Button>

      <DropdownMenu
        sx={dropdownMenuSx}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <StockTargetPriceForm />

        <Divider />

        <AlertContainer>
          <AddedAlertTitle>추가된 알림</AddedAlertTitle>

          <TargetPriceAlertList>
            {alertData.map((alert) => (
              <TargetPriceAlertItem key={alert.id}>
                <span>₩{thousandsDelimiter(alert.targetPrice)}</span>
                <Icon icon="remove" size={16} color="gray600" />
              </TargetPriceAlertItem>
            ))}
          </TargetPriceAlertList>
        </AlertContainer>
      </DropdownMenu>
    </>
  );
}

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "352px",
    "height": "auto",
    "marginTop": "2px",
    "padding": "16px",
    "backgroundColor": designSystem.color.neutral.white,
    "border": `1px solid ${designSystem.color.neutral.gray200}`,
    "borderRadius": "3px",
    "boxShadow": "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",

    ".MuiList-root": {
      width: "100%",
      height: "100%",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
  },
};

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray200};
`;

const AddedAlertTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TargetPriceAlertList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TargetPriceAlertItem = styled.li`
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
