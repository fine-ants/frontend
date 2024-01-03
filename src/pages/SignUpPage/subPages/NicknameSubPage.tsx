import { postNicknameDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import { TextField } from "@components/common/TextField/TextField";
import { useDebounce, useText, validateNickname } from "@fineants/demolition";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import SubPage from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (data: string) => void;
};

const nicknameValidator = (nickname: string) =>
  validateNickname(nickname, {
    errorMessage: "영문/한글/숫자 (2~10자)",
  });

export default function NicknameSubPage({ onPrev, onNext }: Props) {
  const {
    value: nickname,
    isError,
    onChange,
  } = useText({
    validators: [nicknameValidator],
  });
  const [duplicateCheckErrorMsg, setDuplicateCheckErrorMsg] = useState("");
  const isDuplicateChecked = !duplicateCheckErrorMsg;

  const debouncedNickname = useDebounce(nickname, 400);

  const onEmailClear = () => {
    onChange("");
  };

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    setDuplicateCheckErrorMsg("");
  };

  useEffect(() => {
    if (debouncedNickname === "" || isError) return;

    (async () => {
      try {
        const res = await postNicknameDuplicateCheck(debouncedNickname);

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
  }, [debouncedNickname, isError]);

  return (
    <SubPage>
      <AuthOnPrevButton onPrev={onPrev} />

      <AuthPageHeader>
        <AuthPageTitle>닉네임</AuthPageTitle>
        <AuthPageTitleCaption>
          닉네임은 영문, 한글, 숫자를 사용할 수 있고 2~10자여야 합니다
        </AuthPageTitleCaption>
      </AuthPageHeader>
      <TextField
        error={isError || !isDuplicateChecked}
        placeholder="닉네임"
        value={nickname}
        errorText={duplicateCheckErrorMsg}
        onChange={onNicknameChange}
        clearValue={onEmailClear}
      />

      <NextButton
        disabled={isError || !isDuplicateChecked}
        type="button"
        onClick={() => onNext(nickname)}>
        다음
      </NextButton>
    </SubPage>
  );
}
