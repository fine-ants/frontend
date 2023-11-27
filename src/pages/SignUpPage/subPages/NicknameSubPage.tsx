import { postNicknameDuplicateCheck } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import useText from "@components/hooks/useText";
import { validateNickname } from "@utils/authInputValidators";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import SubPage, { InputWrapper, SignUpInput } from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (data: string) => void;
};

export default function NicknameSubPage({ onPrev, onNext }: Props) {
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
      <button type="button" onClick={onPrev}>
        이전 단계
      </button>

      <label htmlFor="nicknameInput">닉네임</label>
      <InputWrapper>
        <NicknameInput
          type="text"
          placeholder="닉네임"
          id="nicknameInput"
          value={nickname}
          onChange={onNicknameChange}
        />
        <UniqueCheckButton
          type="button"
          onClick={onDuplicateCheckButtonClick}
          disabled={isError}>
          중복 확인
        </UniqueCheckButton>
      </InputWrapper>

      <Caption>영문/한글/숫자 (2~10자)</Caption>

      <ErrorCaption>{duplicateCheckErrorMsg}</ErrorCaption>

      <NextButton
        type="button"
        onClick={() => onNext(nickname)}
        disabled={isError || !isDuplicateChecked}>
        다음
      </NextButton>
    </SubPage>
  );
}

const NicknameInput = styled(SignUpInput)``;

const UniqueCheckButton = styled.button`
  width: 120px;
  height: 48px;
  background-color: #2d3bae;
  border-radius: 8px;
  color: white;
`;

const Caption = styled.p`
  color: #697077;
`;

const ErrorCaption = styled.p`
  color: red;
`;

const NextButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  height: 48px;
  background-color: ${({ disabled }) => (disabled ? "#c4c4c4" : "#2d3bae")};
  border-radius: 8px;
  color: white;
`;
