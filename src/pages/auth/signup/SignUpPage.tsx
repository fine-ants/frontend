import { TextButton } from "@components/Buttons/TextButton";
import { ProgressBoard } from "@components/ProgressBoard/ProgressBoard";
import { SignUpData, postEmailVerification } from "@features/auth/api";
import useSignUpMutation from "@features/auth/api/queries/useSignUpMutation";
import { useFunnel } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import AuthBasePage from "@pages/auth/AuthBasePage";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { progressList, stepList } from "./constants/signupProgress";
import {
  EmailSubPage,
  NicknameSubPage,
  PasswordSubPage,
  VerificationSubPage,
} from "./subPages";
import MainSubPage from "./subPages/MainSubPage";
import ProfileImageSubPage from "./subPages/ProfileImageSubPage";

export default function SignUpPage() {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const navigate = useNavigate();

  const { mutate: signUpMutate } = useSignUpMutation();

  const { currentStep, Funnel, changeStep } = useFunnel(stepList);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  return (
    <AuthBasePage>
      <Wrapper $isDesktop={isDesktop}>
        {isDesktop && currentStep !== "main" && (
          <ProgressBoardWrapperD>
            <ProgressBoard
              progressList={progressList}
              currentStep={currentStep}
            />
          </ProgressBoardWrapperD>
        )}
        {isMobile && currentStep !== "main" && (
          <ProgressBoardWrapperM>
            <ProgressBoard
              progressList={progressList}
              currentStep={currentStep}
            />
          </ProgressBoardWrapperM>
        )}

        <SubPageContainer $isMobile={isMobile}>
          <Funnel>
            <Funnel.Step name="main">
              <MainSubPage
                onNext={() => changeStep("email")}
                onPrev={() => navigate(-1)}
              />
            </Funnel.Step>

            <Funnel.Step name="email">
              <EmailSubPage
                onPrev={() => changeStep("main")}
                onNext={(data: string) => {
                  setSignUpData((prev) => ({ ...prev, email: data }));
                  postEmailVerification(data);
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
                  const signUpFormData = data
                    ? createSignUpFormData({
                        signupData: new Blob([JSON.stringify(signUpData)], {
                          type: "application/json",
                        }),
                        profileImageFile: data,
                      })
                    : createSignUpFormData({
                        signupData: new Blob([JSON.stringify(signUpData)], {
                          type: "application/json",
                        }),
                      });
                  signUpMutate(signUpFormData);
                }}
              />
            </Funnel.Step>
          </Funnel>
        </SubPageContainer>

        <SupportContainer $isMobile={isMobile}>
          이미 회원이신가요?
          <TextButton
            color="primary"
            variant="underline"
            onClick={() => navigate(Routes.SIGNIN)}>
            로그인하기
          </TextButton>
        </SupportContainer>
      </Wrapper>
    </AuthBasePage>
  );
}

const Wrapper = styled.div<{ $isDesktop: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBoardWrapperD = styled.div`
  margin-top: 66px;
  margin-bottom: 48px;
`;

const ProgressBoardWrapperM = styled.div`
  position: absolute;
  top: 16px;
`;

const SubPageContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: ${({ $isMobile }) => ($isMobile ? 1 : 0)};
`;

const SupportContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  margin-top: ${({ $isMobile }) => ($isMobile ? "16px" : "48px")};
  padding-bottom: 8px;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  align-items: center;
  justify-content: ${({ $isMobile }) => ($isMobile ? "center" : "flex-start")};
  gap: 8px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray600};
`;

const createSignUpFormData = (object: { [key: string]: Blob | File | null }) =>
  Object.keys(object).reduce((formData, key) => {
    const value = object[key];
    if (value !== null) {
      formData.append(key, value);
    }
    return formData;
  }, new FormData());
