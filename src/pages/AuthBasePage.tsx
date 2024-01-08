import fineAntsLogo from "@assets/icons/logo/fineAnts.svg";
import Routes from "@router/Routes";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};

export default function AuthBasePage({ children }: Props) {
  const navigate = useNavigate();

  const onLogoClick = () => {
    navigate(Routes.LANDING);
  };

  return (
    <StyledBasePage>
      <StyledSignInHeader onClick={onLogoClick}>
        <img src={fineAntsLogo} alt="FineAnts 로고 이미지" />
      </StyledSignInHeader>
      {children}
    </StyledBasePage>
  );
}

const StyledBasePage = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
`;

const StyledSignInHeader = styled.header`
  width: 100%;
  padding: 28px 0 0 40px;
  cursor: pointer;
`;
