import { postEmailDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import useText from "@components/hooks/useText";
import { validateEmail } from "@utils/authInputValidators";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import SubPage from "./SubPage";

type Props = {
  onNext: (data: string) => void;
};

export default function EmailSubPage({ onNext }: Props) {
  const {
    value: email,
    isError,
    onChange,
  } = useText({ validators: [validateEmail] });

  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);
  const [duplicateCheckErrorMsg, setDuplicateCheckErrorMsg] = useState("");

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.trim());
    setIsDuplicateChecked(false);
    setDuplicateCheckErrorMsg("");
  };

  const onDuplicateCheckButtonClick = async () => {
    try {
      const res = await postEmailDuplicateCheck(email);

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
      <label htmlFor="emailInput">이메일</label>
      <input
        type="text"
        placeholder="이메일"
        id="emailInput"
        value={email}
        onChange={onEmailChange}
      />

      <button
        type="button"
        onClick={onDuplicateCheckButtonClick}
        disabled={isError}>
        중복 확인
      </button>

      <p>{duplicateCheckErrorMsg}</p>

      <button
        type="button"
        onClick={() => onNext(email)}
        disabled={isError || !isDuplicateChecked}>
        다음
      </button>
    </SubPage>
  );
}
