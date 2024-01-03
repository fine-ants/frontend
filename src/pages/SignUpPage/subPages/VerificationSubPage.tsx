import VerificationCodeInput from "@components/VerificationCodeInput/VerificationCodeInput";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@components/auth/AuthPageCommon";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import SubPage from "./SubPage";

type Props = {
  email: string;
  onPrev: () => void;
  onNext: (data: string) => void;
};

export default function VerificationCodeSubPage({
  email,
  onPrev,
  onNext,
}: Props) {
  const onDigitsFilled = (digits: string) => {
    onNext(digits);
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

      <VerificationCodeInput onComplete={onDigitsFilled} />

      {/* TODO: Error "올바르지 않은 코드입니다" */}
    </SubPage>
  );
}

const EmailText = styled.span`
  color: ${designSystem.color.neutral.gray900};
  font: ${designSystem.font.body3};
`;
