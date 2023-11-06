import { postNicknameDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import useText from "@components/hooks/useText";
import { validateNickname } from "@utils/authInputValidators";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import SubPage from "./SubPage";

type Props = {
  onNext: (data: string) => void;
};

export default function NicknameSubPage({ onNext }: Props) {
  const {
    value: nickname,
    isError,
    onChange,
  } = useText({
    validators: [validateNickname],
  });

  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [duplicateCheckErrorMsg, setDuplicateCheckErrorMsg] = useState("");

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    setIsDuplicateChecked(false);
    setDuplicateCheckErrorMsg("");
  };

  const onDuplicateCheckButtonClick = async () => {
    try {
      const res = await postNicknameDuplicateCheck(nickname);

      if (res.code === HTTPSTATUS.success) {
        setIsDuplicateChecked(true);
        setDuplicateCheckErrorMsg("");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setDuplicateCheckErrorMsg(error.response?.data.message);
      } else {
        setDuplicateCheckErrorMsg((error as Error).message);
      }
    }
  };

  return (
    <SubPage>
      <label htmlFor="nicknameInput">닉네임</label>
      <input
        type="text"
        placeholder="닉네임"
        id="nicknameInput"
        value={nickname}
        onChange={onNicknameChange}
      />
      <button
        type="button"
        onClick={onDuplicateCheckButtonClick}
        disabled={isError}>
        중복 확인
      </button>

      <p>영문/한글/숫자 (2~10자)</p>

      <p>{duplicateCheckErrorMsg}</p>

      <button
        type="button"
        onClick={() => onNext(nickname)}
        disabled={isError || !isDuplicateChecked}>
        다음
      </button>
    </SubPage>
  );
}
