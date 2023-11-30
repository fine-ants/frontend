import { SignUpData, postEmailVerification } from "@api/auth";
import useSignUpMutation from "@api/auth/queries/useSignUpMutation";
import useFunnel from "@hooks/useFunnel";
import { useState } from "react";
import styled from "styled-components";
import BasePage from "../BasePage";
import {
  EmailSubPage,
  NicknameSubPage,
  PasswordSubPage,
  VerificationSubPage,
} from "./subPages";
import MainSubPage from "./subPages/MainSubPage";

export default function SignUpPage() {
  const [Funnel, changeStep] = useFunnel([
    "main",
    "nickname",
    "email",
    "password",
    "verification",
  ]);

  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "",
  });

  const { mutate: signUpMutate } = useSignUpMutation();

  return (
    <BasePage>
      <SignUpContainer>
        <SignUpTitle>회원가입</SignUpTitle>

        <SubPageContainer>
          <Funnel>
            <Funnel.Step name="main">
              <MainSubPage onNext={() => changeStep("nickname")} />
            </Funnel.Step>

            <Funnel.Step name="nickname">
              <NicknameSubPage
                onPrev={() => changeStep("main")}
                onNext={(data: string) => {
                  setSignUpData((prev) => ({ ...prev, nickname: data }));
                  changeStep("email");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="email">
              <EmailSubPage
                onPrev={() => changeStep("nickname")}
                onNext={(data: string) => {
                  setSignUpData((prev) => ({ ...prev, email: data }));
                  changeStep("password");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="password">
              <PasswordSubPage
                onPrev={() => changeStep("email")}
                onNext={async (password: string, passwordConfirm: string) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    password,
                    passwordConfirm,
                  }));
                  // Request server to send verification code
                  // TODO: handle error
                  await postEmailVerification(signUpData.email);
                  changeStep("verification");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="verification">
              <VerificationSubPage
                email={signUpData.email}
                onPrev={() => changeStep("password")}
                onNext={(data: string) => {
                  // TODO: handle possible delayed async state change
                  setSignUpData((prev) => ({
                    ...prev,
                    verificationCode: data,
                  }));
                  signUpMutate(signUpData);
                }}
              />
            </Funnel.Step>
          </Funnel>
        </SubPageContainer>
      </SignUpContainer>
    </BasePage>
  );
}

const SignUpTitle = styled.h2`
  font-size: 42px;
  font-weight: bold;
  margin-right: auto;
`;

const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 48px;
  width: 720px;
  height: 100%;
  padding: 0 80px;
`;

const SubPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
