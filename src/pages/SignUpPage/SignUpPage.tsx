import { SignUpData, postEmailVerification } from "@api/auth";
import useSignUpMutation from "@api/auth/queries/useSignUpMutation";
import useFunnel from "@hooks/useFunnel";
import { Button } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BasePage from "../BasePage";
import {
  EmailSubPage,
  NicknameSubPage,
  PasswordSubPage,
  VerificationSubPage,
} from "./subPages";
import MainSubPage from "./subPages/MainSubPage";
import ProfileImageSubPage from "./subPages/ProfileImageSubPage";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [Funnel, changeStep] = useFunnel([
    "main",
    "nickname",
    "profileImage",
    "email",
    "password",
    "verification",
  ]);

  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: "",
    profileImage: null,
    email: "",
    password: "",
    passwordConfirm: "",
    verificationCode: "",
  });

  const { mutate: signUpMutate } = useSignUpMutation();

  return (
    <BasePage>
      <SignUpContainer>
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
                  changeStep("profileImage");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="profileImage">
              <ProfileImageSubPage
                onPrev={() => changeStep("nickname")}
                onNext={(data: File | null) => {
                  setSignUpData((prev) => ({ ...prev, profileImage: data }));
                  changeStep("email");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="email">
              <EmailSubPage
                onPrev={() => changeStep("profileImage")}
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
                  signUpMutate(createSignUpFormData(signUpData));
                }}
              />
            </Funnel.Step>
          </Funnel>
        </SubPageContainer>
        <SupportContainer>
          이미 회원이신가요?
          <TextButton onClick={() => navigate(Routes.SIGNIN)}>
            로그인
          </TextButton>
        </SupportContainer>
      </SignUpContainer>
    </BasePage>
  );
}

const SupportContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${designSystem.color.neutral.gray600};
  font: ${designSystem.font.body3};
`;

const TextButton = styled(Button)`
  padding: 0;
  color: ${designSystem.color.primary.blue500};
  font: ${designSystem.font.button2};
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

const createSignUpFormData = (object: SignUpData) =>
  Object.keys(object).reduce((formData, key) => {
    const value = object[key];
    if (value !== null) {
      formData.append(key, value);
    }
    return formData;
  }, new FormData());
