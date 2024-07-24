import fineAntsLogo from "@assets/icons/logo/fineAnts.svg";
import notFoundImage from "@assets/images/not_found.png";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { UserContext } from "@features/user/context/UserContext";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NotFoundPage() {
  const { isMobile, isDesktop } = useResponsiveLayout();

  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <StyledNotFoundPage>
      {isDesktop && (
        <Header>
          <Link to={user ? Routes.DASHBOARD : Routes.LANDING}>
            <img src={fineAntsLogo} alt="FineAnts 로고 이미지" />
          </Link>
        </Header>
      )}

      <Main $isMobile={isMobile}>
        <img src={notFoundImage} alt="페이지를 찾을 수 없습니다" />

        <TextContainer $isMobile={isMobile}>
          <Title $isMobile={isMobile}>페이지를 찾을 수 없습니다</Title>
          <Description $isMobile={isMobile}>
            주소가 올바른지 다시 한번 확인하거나 {isMobile && <br />} 아래
            버튼을 눌러 메인 페이지로 이동하세요
          </Description>
        </TextContainer>

        <StyledButton
          variant="primary"
          size={isMobile ? "h40" : "h44"}
          onClick={() => navigate(user ? Routes.DASHBOARD : Routes.LANDING)}
          $isMobile={isMobile}>
          <Icon icon="arrow-up-right" size={16} color="white" />
          메인 페이지로 이동
        </StyledButton>
      </Main>
    </StyledNotFoundPage>
  );
}

const StyledNotFoundPage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  padding: 28px 0 0 40px;
`;

const Main = styled.main<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "24px" : "48px")};

  > img {
    width: ${({ $isMobile }) => ($isMobile ? "240px" : "auto")};
  }
`;

const TextContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "8px" : "16px")};
`;

const Title = styled.h3<{ $isMobile: boolean }>`
  font: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.font
      : designSystem.font.heading3.font};
  letter-spacing: ${({ $isMobile }) =>
    $isMobile
      ? designSystem.font.title3.letterSpacing
      : designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const Description = styled.p<{ $isMobile: boolean }>`
  text-align: center;
  font: ${({ $isMobile }) =>
    $isMobile ? designSystem.font.body3.font : designSystem.font.body2.font};
  color: ${designSystem.color.neutral.gray500};
`;

const StyledButton = styled(Button)<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "auto" : "179px")};
`;
