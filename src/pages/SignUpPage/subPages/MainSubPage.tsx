import GoogleSignInButton from "@components/auth/GoogleSignInButton";
import KakaoSignInButton from "@components/auth/KakaoSignInButton";
import NaverSignInButton from "@components/auth/NaverSignInButton";
import { useNavigate } from "react-router-dom";
import Routes from "router/Routes";
import styled from "styled-components";

type Props = {
  onNext: () => void;
};

export default function MainSubPage({ onNext }: Props) {
  const navigate = useNavigate();

  return (
    <StyledMainSubPage>
      <SignInButtonContainer>
        <GoogleSignInButton />
        <KakaoSignInButton />
        <NaverSignInButton />
        <EmailSignInButton type="button" onClick={onNext}>
          이메일/비밀번호
        </EmailSignInButton>
      </SignInButtonContainer>

      <hr />

      <p>
        이미 회원이신가요?
        <button type="button" onClick={() => navigate(Routes.SIGNIN)}>
          로그인
        </button>
      </p>
    </StyledMainSubPage>
  );
}

const StyledMainSubPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  height: 444px;

  > p {
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 8px;
    > button {
      font-size: 16px;
      font-weight: bold;
      color: #2d3bae;
    }
  }
`;

const SignInButtonContainer = styled.div`
  width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 48px 0;
  border-bottom: 1px solid #dde1e6;
`;

const EmailSignInButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: 1px solid #dde1e6;
  font-size: 16px;
  font-weight: bold;
  color: #2b2b2b;
`;
