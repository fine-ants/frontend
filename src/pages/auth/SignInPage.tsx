import login_Image from "@assets/images/login_Image.png";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import SignInForm from "@features/auth/components/SignInForm";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import AuthBasePage from "@pages/auth/AuthBasePage";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SignInPage() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const navigate = useNavigate();

  return (
    <AuthBasePage>
      <Wrapper $isDesktop={isDesktop} $isMobile={isMobile}>
        {isMobile && (
          <InnerWrapperM>
            <PrevButtonWrapper>
              <AuthOnPrevButton onPrev={() => navigate(-1)} />
            </PrevButtonWrapper>
            <SignInFormWrapper $isMobile={isMobile}>
              <SignInForm />
            </SignInFormWrapper>
          </InnerWrapperM>
        )}

        {isDesktop && (
          <>
            <SignInFormContainer>
              <SignInForm />
            </SignInFormContainer>
            <ImageContainer>
              <StyledImage src={login_Image} alt="FineAnts 로그인 배너" />
            </ImageContainer>
          </>
        )}
      </Wrapper>
    </AuthBasePage>
  );
}
const Wrapper = styled.div<{ $isDesktop: boolean; $isMobile: boolean }>`
  width: 100%;
  max-width: 1824px;
  height: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
  padding: ${({ $isDesktop }) => ($isDesktop ? "0 48px 48px 48px" : "0")};
  display: flex;
  flex-direction: ${({ $isDesktop }) => ($isDesktop ? "row" : "column")};
  gap: ${({ $isDesktop }) => ($isDesktop ? "16px" : 0)};
`;

const InnerWrapperM = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PrevButtonWrapper = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  padding-inline: 8px;
  display: flex;
  align-items: center;
`;

const SignInFormWrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  padding-inline: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: ${({ $isMobile }) => ($isMobile ? 1 : 0)};
`;

const SignInFormContainer = styled.div`
  width: 50%;
  height: 100%;
  padding-top: 156px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
`;
