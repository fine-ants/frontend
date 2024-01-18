import { postEmailDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import { TextField } from "@components/common/TextField/TextField";
import { useDebounce, useText, validateEmail } from "@fineants/demolition";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import SubPage from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (data: string) => void;
};

const emailValidator = (email: string) =>
  validateEmail(email, { errorMessage: "올바른 이메일을 입력해주세요" });

export default function EmailSubPage({ onPrev, onNext }: Props) {
  const {
    value: email,
    isError,
    onChange,
  } = useText({
    validators: [emailValidator],
  });

  const [duplicateCheckErrorMsg, setDuplicateCheckErrorMsg] = useState("");
  const [isDuplicateComplete, setIsDuplicateComplete] = useState(false);

  const isDuplicateChecked = !duplicateCheckErrorMsg && isDuplicateComplete;
  const errorText = isError
    ? "올바른 형식의 이메일을 입력하세요."
    : isDuplicateChecked
    ? ""
    : duplicateCheckErrorMsg;

  const debouncedEmail = useDebounce(email, 400);

  const onEmailClear = () => {
    onChange("");
  };

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    setIsDuplicateComplete(false);
    setDuplicateCheckErrorMsg("");
  };

  useEffect(() => {
    if (debouncedEmail === "" || isError) return;

    (async () => {
      try {
        const res = await postEmailDuplicateCheck(debouncedEmail);
        setIsDuplicateComplete(true);

        if (res.code === HTTPSTATUS.success) {
          setDuplicateCheckErrorMsg("");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setDuplicateCheckErrorMsg(error.response?.data.message);
        } else {
          setDuplicateCheckErrorMsg((error as Error).message);
        }
      }
    })();
  }, [debouncedEmail, isError]);

  return (
    <SubPage>
      <AuthOnPrevButton onPrev={onPrev} />

      <AuthPageHeader>
        <AuthPageTitle>이메일</AuthPageTitle>
        <AuthPageTitleCaption>
          올바른 형식의 이메일을 입력하세요 (example@email.com)
        </AuthPageTitleCaption>
      </AuthPageHeader>

      <TextField
        error={isError || !isDuplicateChecked}
        placeholder="이메일"
        value={email}
        errorText={errorText}
        onChange={onEmailChange}
        clearValue={onEmailClear}
      />

      <NextButton
        type="button"
        onClick={() => onNext(email)}
        disabled={isError || !isDuplicateChecked}>
        다음 단계
      </NextButton>
    </SubPage>
  );
}
