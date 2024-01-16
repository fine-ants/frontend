import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import { TextField } from "@components/common/TextField/TextField";
import { useDebounce, useText, validateNickname } from "@fineants/demolition";
import useNicknameDuplicateCheck from "@hooks/useNicknameDuplicateCheck";
import { ChangeEvent } from "react";
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

  const debouncedNickname = useDebounce(nickname, 400);

  const {
    isDuplicateChecked,
    duplicateCheckErrorMsg,
    updateDuplicateCheckErrorMsg,
    updateIsDuplicateComplete,
  } = useNicknameDuplicateCheck({
    newNickname: debouncedNickname,
    newNicknameIsError: isError,
  });

  const onNicknameClear = () => {
    onChange("");
  };

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    updateIsDuplicateComplete(false);
    updateDuplicateCheckErrorMsg("");
  };

  const errorText = isError
    ? "영문/한글/숫자 (2~10자)으로 입력하세요."
    : isDuplicateChecked
    ? ""
    : duplicateCheckErrorMsg;

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
        errorText={errorText}
        onChange={onNicknameChange}
        clearValue={onNicknameClear}
      />

      <NextButton
        disabled={isError || !isDuplicateChecked}
        type="button"
        onClick={() => onNext(nickname)}>
        다음 단계
      </NextButton>
    </SubPage>
  );
}
