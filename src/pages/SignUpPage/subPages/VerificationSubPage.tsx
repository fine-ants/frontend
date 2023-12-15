import VerificationCodeInput from "@components/VerificationCodeInput/VerificationCodeInput";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
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
      <AuthOnPrevButton onPrev={onPrev} />

      <h3>가입을 완료하려면 인증 코드를 입력해주세요</h3>
      <p>{email}으로 전송된 인증 코드를 입력해주세요</p>

      <VerificationCodeInput onComplete={onDigitsFilled} />

      {/* TODO: Error "올바르지 않은 코드입니다" */}
    </SubPage>
  );
}
