import useEmailCodeVerificationMutation from "@api/auth/queries/useEmailCodeVerificationMutation";
import VerificationCodeInput from "@components/VerificationCodeInput/VerificationCodeInput";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import SubPage from "./SubPage";

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
  const { isSuccess, isError, mutateAsync } =
    useEmailCodeVerificationMutation();
  const [digits, setDigits] = useState("");

  const isButtonDisabled =
    digits.length === verificationCodeInputLength && isSuccess;

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

  return (
    <SubPage>
      <AuthPageHeader>
        <AuthOnPrevButton onPrev={onPrev} />

        <AuthPageTitle>이메일 인증</AuthPageTitle>
        <AuthPageTitleCaption>
          <EmailText>{email}</EmailText> (으)로 발송된 인증번호를 확인 후
          입력하세요
        </AuthPageTitleCaption>
      </AuthPageHeader>
      <CodeInputWrapper>
        <VerificationCodeInput
          value={digits}
          inputLength={verificationCodeInputLength}
          isError={isError}
          onChange={onDigitsChange}
          onComplete={onDigitsFilled}
        />
        <div>
          <TextButton onClick={onEmailCodeResend}>인증번호 재발송</TextButton>
        </div>
      </CodeInputWrapper>

      <NextButton type="button" disabled={!isButtonDisabled} onClick={onNext}>
        다음 단계
      </NextButton>
    </SubPage>
  );
}

const EmailText = styled.span`
  font: ${designSystem.font.body3};
  color: ${designSystem.color.neutral.gray900};
`;

const CodeInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TextButton = styled.button`
  padding: 0;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;
