import { postEmailDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import { AuthInput } from "@components/auth/AuthInput";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import useText from "@components/hooks/useText";
import { useDebounce } from "@hooks/useDebounce";
import { validateEmail } from "@utils/authInputValidators";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import SubPage from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (data: string) => void;
};

export default function EmailSubPage({ onPrev, onNext }: Props) {
  const {
    value: email,
    isError,
    onChange,
  } = useText({ validators: [validateEmail] });
  const [duplicateCheckErrorMsg, setDuplicateCheckErrorMsg] = useState("");
  const isDuplicateChecked = !!duplicateCheckErrorMsg;

  const debouncedEmail = useDebounce({ value: email, delay: 400 });

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    setDuplicateCheckErrorMsg("");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await postEmailDuplicateCheck(debouncedEmail);

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
  }, [debouncedEmail]);

  return (
    <SubPage>
      <AuthOnPrevButton onPrev={onPrev} />

      <AuthPageHeader>
        <AuthPageTitle>이메일</AuthPageTitle>
        <AuthPageTitleCaption>
          올바른 형식의 이메일을 입력하세요 (example@email.com)
        </AuthPageTitleCaption>
      </AuthPageHeader>

      <AuthInput
        error={isDuplicateChecked}
        type="text"
        placeholder="이메일"
        id="emailInput"
        value={email}
        onChange={onEmailChange}
        helperText={duplicateCheckErrorMsg}
      />

      <NextButton
        type="button"
        onClick={() => onNext(email)}
        disabled={isError || !isDuplicateChecked}>
        다음
      </NextButton>
    </SubPage>
  );
}
