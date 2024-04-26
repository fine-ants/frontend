import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import useEmailCodeVerificationMutation from "@features/auth/api/queries/useEmailCodeVerificationMutation";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@features/auth/components/AuthPageCommon";
import VerificationCodeInput from "@features/auth/components/VerificationCodeInput";
import designSystem from "@styles/designSystem";
import { FormEvent, useState } from "react";
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext();
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
      <Form onSubmit={onSubmit}>
        <CodeInputWrapper>
          <VerificationCodeInput
            value={digits}
            inputLength={verificationCodeInputLength}
            isError={isError}
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

        <Button
          variant="primary"
          size="h44"
          type="submit"
          disabled={!isButtonDisabled}>
          다음 단계
        </Button>
      </Form>
    </SubPage>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 58px;
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
