import Spinner from "@components/Spinner";
import { getUser } from "@features/user/api";
import { UserContext } from "@features/user/context/UserContext";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "src/main";
import styled from "styled-components";

export default function OAuthLoadingPage() {
  const navigate = useNavigate();

  const { onSignOut, onGetUser } = useContext(UserContext);

  // Fetch user data if OAuth login is successful
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");

    if (success !== "true") {
      onSignOut();
      toast.error("로그인에 실패했습니다. 다시 시도해주세요.");
      navigate(Routes.SIGNIN);
      return;
    }

    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await getUser();

        onGetUser(user);
        navigate(Routes.DASHBOARD);
      } catch (error) {
        onSignOut();
        toast.error(
          "데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요."
        );
        navigate(Routes.SIGNIN);
      }
    };

    fetchUserData();
  });

  return (
    <StyledSignInLoadingPage>
      <Spinner size={85} sx={{ color: designSystem.color.primary.blue500 }} />
      <Text>로그인 중입니다</Text>
    </StyledSignInLoadingPage>
  );
}

const StyledSignInLoadingPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
`;

const Text = styled.p`
  font: ${designSystem.font.title3.font};
`;
