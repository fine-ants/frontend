import fineantsLogo from "@assets/icons/logo/ic_fineants_white.svg";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { TextButton } from "@components/Buttons/TextButton";
import { MAIN_HEADER_HEIGHT_M } from "@constants/styleConstants";
import { NotificationControl } from "@features/notification/components/NotificationControl/NotificationControl";
import StockSearchPanel from "@features/stock/components/StockSearchPanel/mobile/StockSearchPanel";
import UserDrawer from "@features/user/components/mobile/UserDrawer";
import { UserContext } from "@features/user/context/UserContext";
import { useBoolean } from "@fineants/demolition";
import Routes from "@router/Routes";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function HeaderTopM() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const {
    state: isSearchPanelOpen,
    setTrue: onOpenSearchPanel,
    setFalse: onCloseSearchPanel,
  } = useBoolean();

  const moveToSignInPage = () => {
    navigate(Routes.SIGNIN);
  };

  const moveToSignUpPage = () => {
    navigate(Routes.SIGNUP);
  };

  return (
    <StyledHeaderTopM>
      {user ? (
        <HeaderLeft>
          <UserDrawer />
        </HeaderLeft>
      ) : (
        <ButtonWrapper>
          <TextButton size="h32" color="white" onClick={moveToSignInPage}>
            로그인
          </TextButton>
          <Button variant="primary" size="h32" onClick={moveToSignUpPage}>
            회원가입
          </Button>
        </ButtonWrapper>
      )}

      <HeaderCenter>
        <Link
          to={user ? Routes.DASHBOARD : Routes.LANDING}
          style={{ padding: "4px 8px" }}>
          <LogoImage src={fineantsLogo} alt="FineAnts" />
        </Link>
      </HeaderCenter>

      <HeaderRight>
        <IconButton
          icon="search"
          iconColor="custom"
          customColor={{ color: "gray400", hoverColor: "gray50" }}
          size="h40"
          onClick={onOpenSearchPanel}
        />
        <StockSearchPanel
          isPanelOpen={isSearchPanelOpen}
          onOpenPanel={onOpenSearchPanel}
          onClosePanel={onCloseSearchPanel}
        />

        {user ? <NotificationControl user={user} /> : null}
      </HeaderRight>
    </StyledHeaderTopM>
  );
}

const StyledHeaderTopM = styled.header`
  height: ${MAIN_HEADER_HEIGHT_M}px;
  padding-inline: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  width: 33%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const HeaderCenter = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  width: 24px;
  height: 24px;
`;

const HeaderRight = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;
