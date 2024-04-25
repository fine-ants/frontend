import { HTTPSTATUS } from "@api/types";
import Button from "@components/Buttons/Button";
import { TextField } from "@components/TextField/TextField";
import { postEmailDuplicateCheck } from "@features/auth/api";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
} from "@features/auth/components/AuthPageCommon";
import { useDebounce, useText, validateEmail } from "@fineants/demolition";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext(debouncedEmail);
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

      <Form onSubmit={onSubmit}>
        <TextField
          error={isError || !isDuplicateChecked}
          placeholder="이메일"
          value={email}
          errorText={errorText}
          onChange={onEmailChange}
          clearValue={onEmailClear}
        />

        <Button
          variant="primary"
          size="h44"
          type="submit"
          disabled={isError || !isDuplicateChecked}>
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
