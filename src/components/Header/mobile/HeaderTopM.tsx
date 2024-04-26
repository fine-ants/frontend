import fineantsLogo from "@assets/icons/logo/ic_fineants_white.svg";
import Button from "@components/Buttons/Button";
import { IconButton } from "@components/Buttons/IconButton";
import { TextButton } from "@components/Buttons/TextButton";
import { NotificationControl } from "@features/notification/components/NotificationPanel/NotificationControl";
import UserDropdown from "@features/user/components/UserDropdown/UserDropdown";
import { UserContext } from "@features/user/context/UserContext";
import Routes from "@router/Routes";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function HeaderTopM() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

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
          <UserDropdown />
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
          <img src={fineantsLogo} alt="FineAnts" />
        </Link>
      </HeaderCenter>

      <HeaderRight>
        <IconButton
          icon="search"
          iconColor="custom"
          customColor={{ color: "gray400", hoverColor: "gray50" }}
          size="h40"
        />
        {user ? <NotificationControl user={user} /> : null}
      </HeaderRight>
    </StyledHeaderTopM>
  );
}

const StyledHeaderTopM = styled.header`
  height: 56px;
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

const HeaderRight = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  gap: 4px;
`;