import { SignUpData, postEmailVerification } from "@api/auth";
import useSignUpMutation from "@api/auth/queries/useSignUpMutation";
import { useState } from "react";
import styled from "styled-components";
import BasePage from "../BasePage";
import EmailSubPage from "./subPages/EmailSubPage";
import MainSubPage from "./subPages/MainSubPage";
import NicknameSubPage from "./subPages/NicknameSubPage";
import PasswordSubPage from "./subPages/PasswordSubPage";
import VerificationSubPage from "./subPages/VerificationSubPage";

export default function SignUpPage() {
  // TODO: Refactor to custom hook
  const [subPage, setSubPage] = useState<
    "main" | "nickname" | "email" | "password" | "verification"
  >("main");

  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "",
  });

  const { mutate: signUpMutate } = useSignUpMutation();

  return (
    <StyledSignUpPage>
      <h2>회원가입</h2>

      <SubPageContainer>
        {/* TODO: 이전 단계로 이동 버튼 (`main`인 경우 제외) */}

        {/* TODO: SubPage 컴포넌트화 */}
        {subPage === "main" && (
          <MainSubPage onNext={() => setSubPage("nickname")} />
        )}
        {subPage === "nickname" && (
          <NicknameSubPage
            onNext={(data: string) => {
              setSignUpData((prev) => ({ ...prev, nickname: data }));
              setSubPage("email");
            }}
          />
        )}
        {subPage === "email" && (
          <EmailSubPage
            onNext={(data: string) => {
              setSignUpData((prev) => ({ ...prev, email: data }));
              setSubPage("password");
            }}
          />
        )}
        {subPage === "password" && (
          <PasswordSubPage
            onNext={(password: string, passwordConfirm: string) => {
              setSignUpData((prev) => ({ ...prev, password, passwordConfirm }));
              setSubPage("verification");
              // Request server to send verification code
              postEmailVerification(signUpData.email);
            }}
          />
        )}
        {subPage === "verification" && (
          <VerificationSubPage
            email={signUpData.email}
            onNext={async (data: string) => {
              setSignUpData((prev) => ({ ...prev, verificationCode: data }));
              // TODO: If unsuccessful, show error message and require user to re-enter verification code
              signUpMutate(signUpData);
            }}
          />
        )}
      </SubPageContainer>
    </StyledSignUpPage>
  );
}

// TODO
const StyledSignUpPage = styled(BasePage)``;

const SubPageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
