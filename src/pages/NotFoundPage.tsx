import fineAntsLogo from "@assets/icons/logo/fineAnts.svg";
import notFoundImage from "@assets/images/not_found.png";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { UserContext } from "@context/UserContext";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <StyledNotFoundPage>
      <Header>
        <Link to={user ? Routes.DASHBOARD : Routes.LANDING}>
          <img src={fineAntsLogo} alt="FineAnts 로고 이미지" />
        </Link>
      </Header>

      <Main>
        <img src={notFoundImage} alt="페이지를 찾을 수 없습니다" />

        <TextContainer>
          <Title>페이지를 찾을 수 없습니다</Title>
          <Description>
            주소가 올바른지 다시 한번 확인하거나 아래 버튼을 눌러 메인 페이지로
            이동하세요
          </Description>
        </TextContainer>

        <StyledButton
          variant="primary"
          size="h44"
          onClick={() => navigate(user ? Routes.DASHBOARD : Routes.LANDING)}>
          <Icon icon="arrow-up-right" size={16} color="white" />
          메인 페이지로 이동
        </StyledButton>
      </Main>
    </StyledNotFoundPage>
  );
}

const StyledNotFoundPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 219px;
`;

const Header = styled.header`
  width: 100%;
  padding: 28px 0 0 40px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const Title = styled.h3`
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;

const Description = styled.p`
  font: ${designSystem.font.body2.font};
  color: ${designSystem.color.neutral.gray500};
`;

const StyledButton = styled(Button)`
  width: 179px;
`;
