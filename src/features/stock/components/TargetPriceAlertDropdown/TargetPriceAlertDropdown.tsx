import { AsyncBoundary } from "@components/AsyncBoundary";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import { UserContext } from "@features/user/context/UserContext";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { MouseEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import StockTargetPriceForm from "../StockTargetPriceForm";
import TargetPricesList from "./TargetPricesList";
import TargetPricesListErrorFallback from "./errorFallback/TargetPricesListErrorFallback";
import TargetPricesListSkeleton from "./skeleton/TargetPricesListSkeleton";

export default function TargetPriceAlertDropdown() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { onOpen, DropdownMenu } = useDropdown();

  const onDropdownButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      navigate(Routes.SIGNIN);
      return;
    }

    onOpen(e);
  };

  return (
    <>
      <Button variant="secondary" size="h32" onClick={onDropdownButtonClick}>
        <Icon icon="notification" size={16} color="blue500" />
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
        <li>
          <StockTargetPriceForm />
        </li>

        <Divider />

        <TargetPricesListContainer>
          <TargetPricesListTitle>추가된 알림</TargetPricesListTitle>

          <AsyncBoundary
            SuspenseFallback={<TargetPricesListSkeleton />}
            ErrorFallback={TargetPricesListErrorFallback}>
            <TargetPricesList />
          </AsyncBoundary>
        </TargetPricesListContainer>
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

const Divider = styled.li`
  width: 100%;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray200};
`;

const TargetPricesListTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const TargetPricesListContainer = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
