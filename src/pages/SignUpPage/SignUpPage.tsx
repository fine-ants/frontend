import { SignUpData, postEmailVerification } from "@api/auth";
import useSignUpMutation from "@api/auth/queries/useSignUpMutation";
import { useFunnel } from "@fineants/demolition";
import { Button } from "@mui/material";
import AuthBasePage from "@pages/AuthBasePage";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProgressBoard } from "./ProgressBoard/ProgressBoard";
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

  const { mutate: signUpMutate } = useSignUpMutation();

  const stepList = [
    "main",
    "email",
    "verification",
    "password",
    "nickname",
    "profileImage",
  ];
  const progressList = [
    { title: "이메일 입력/인증", step: ["email", "verification"] },
    { title: "비밀번호 생성", step: ["password"] },
    { title: "닉네임 입력", step: ["nickname"] },
    { title: "프로필 이미지 등록", step: ["profileImage"] },
  ];

  const { currentStep, Funnel, changeStep } = useFunnel(stepList);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <AuthBasePage>
      <SignUpContainer>
        <ProgressBoard progressList={progressList} currentStep={currentStep} />
        <SubPageContainer>
          <Funnel>
            <Funnel.Step name="main">
              <MainSubPage onNext={() => changeStep("email")} />
            </Funnel.Step>

            <Funnel.Step name="email">
              <EmailSubPage
                onPrev={() => changeStep("main")}
                onNext={async (data: string) => {
                  setSignUpData((prev) => ({ ...prev, email: data }));
                  await postEmailVerification(data);
                  changeStep("verification");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="verification">
              <VerificationSubPage
                email={signUpData.email}
                resendVerificationEmail={() =>
                  postEmailVerification(signUpData.email)
                }
                onPrev={() => changeStep("email")}
                onNext={() => {
                  changeStep("password");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="password">
              <PasswordSubPage
                onPrev={() => changeStep("verification")}
                onNext={async (password: string, passwordConfirm: string) => {
                  setSignUpData((prev) => ({
                    ...prev,
                    password,
                    passwordConfirm,
                  }));
                  changeStep("nickname");
                }}
              />
            </Funnel.Step>

            <Funnel.Step name="nickname">
              <NicknameSubPage
                onPrev={() => changeStep("password")}
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
                  signUpMutate(
                    createSignUpFormData({
                      signupData: new Blob([JSON.stringify(signUpData)], {
                        type: "application/json",
                      }),
                      profileImageFile: data,
                    })
                  );
                }}
              />
            </Funnel.Step>
          </Funnel>
        </SubPageContainer>
        <SupportContainer>
          이미 회원이신가요?
          <TextButton onClick={() => navigate(Routes.SIGNIN)}>
            로그인하기
          </TextButton>
        </SupportContainer>
      </SignUpContainer>
    </AuthBasePage>
  );
}

const SupportContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const TextButton = styled(Button)`
  padding: 0;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;

const SignUpContainer = styled.div`
  width: 720px;
  height: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;

const SubPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const createSignUpFormData = (object: { [key: string]: Blob | File | null }) =>
  Object.keys(object).reduce((formData, key) => {
    const value = object[key];
    if (value !== null) {
      formData.append(key, value);
    }
    return formData;
  }, new FormData());
