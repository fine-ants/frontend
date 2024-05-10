import { TextButton } from "@components/Buttons/TextButton";
import useEmailCodeVerificationMutation from "@features/auth/api/queries/useEmailCodeVerificationMutation";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import AuthPageHeader from "@features/auth/components/AuthPageHeader";
import VerificationCodeInput from "@features/auth/components/VerificationCodeInput";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { FormEvent, useState } from "react";
import styled from "styled-components";
import SubPage from "./SubPage";
import {
  AuthNextButton,
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderMWrapper,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  email: string;
  resendVerificationEmail: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const verificationCodeInputLength = 6;

export default function VerificationCodeSubPage({
  email,
  resendVerificationEmail,
  onPrev,
  onNext,
}: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const { isSuccess, isError, mutateAsync } =
    useEmailCodeVerificationMutation();
  const [digits, setDigits] = useState("");

  const isButtonDisabled =
    digits.length !== verificationCodeInputLength || !isSuccess || isError;

  const onDigitsChange = (digits: string) => {
    setDigits(digits);
  };

  const onDigitsFilled = async (digits: string) => {
    await mutateAsync({ email, code: digits });
  };

  const onEmailCodeResend = () => {
    setDigits("");
    resendVerificationEmail();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <SubPage>
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthOnPrevButton onPrev={onPrev} />
          <AuthPageHeader
            title="이메일 인증"
            subtitle={
              <>
                <EmailText>{email}</EmailText> (으)로 발송된 인증번호를 확인 후
                입력하세요
              </>
            }
          />
        </AuthPageHeaderInnerWrapperD>
      )}
      {isMobile && (
        <AuthPageHeaderMWrapper>
          <PrevButtonWrapperM>
            <AuthOnPrevButton onPrev={onPrev} />
          </PrevButtonWrapperM>
          <AuthPageHeaderInnerWrapperM>
            <AuthPageHeader
              title="이메일 인증"
              subtitle={
                <>
                  <EmailText>{email}</EmailText> (으)로 발송된 인증번호를 확인
                  후 입력하세요
                </>
              }
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderMWrapper>
      )}

      <Form onSubmit={onSubmit} $isMobile={isMobile}>
        <CodeInputWrapper>
          <VerificationCodeInput
            value={digits}
            inputLength={verificationCodeInputLength}
            isError={
              digits.length === verificationCodeInputLength ? isError : false
            }
            onChange={onDigitsChange}
            onComplete={onDigitsFilled}
          />
          <div>
            <TextButton
              color="primary"
              variant="underline"
              onClick={onEmailCodeResend}>
              인증번호 재발송
            </TextButton>
          </div>
        </CodeInputWrapper>

        <AuthNextButton
          variant="primary"
          size={isMobile ? "h48" : "h44"}
          type="submit"
          disabled={isButtonDisabled}
          $isMobile={isMobile}>
          다음 단계
        </AuthNextButton>
      </Form>
    </SubPage>
  );
}

const Form = styled.form<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-self: center;
`;

const EmailText = styled.span`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;

const CodeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
