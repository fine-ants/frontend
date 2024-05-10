import { HTTPSTATUS } from "@api/types";
import { TextField } from "@components/TextField/TextField";
import { postEmailDuplicateCheck } from "@features/auth/api";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import AuthPageHeader from "@features/auth/components/AuthPageHeader";
import { useDebounce, useText, validateEmail } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import SubPage from "./SubPage";
import {
  AuthNextButton,
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderMWrapper,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  onPrev: () => void;
  onNext: (data: string) => void;
};

const emailValidator = (email: string) =>
  validateEmail(email, { errorMessage: "올바른 이메일을 입력해주세요" });

export default function EmailSubPage({ onPrev, onNext }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

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
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthOnPrevButton onPrev={onPrev} />
          <AuthPageHeader
            title="이메일 입력"
            subtitle="올바른 형식의 이메일을 입력하세요 (example@email.com)"
          />
        </AuthPageHeaderInnerWrapperD>
      )}
      {isMobile && (
        <AuthPageHeaderMWrapper>
          <PrevButtonWrapperM>
            <AuthOnPrevButton onPrev={onPrev} />
          </PrevButtonWrapperM>
          <AuthPageHeaderInnerWrapperM>
            <AuthPageHeader
              title="이메일 입력"
              subtitle={
                <span>
                  올바른 형식의 이메일을 입력하세요 <br />
                  (example@email.com)
                </span>
              }
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderMWrapper>
      )}

      <Form onSubmit={onSubmit} $isMobile={isMobile}>
        <TextField
          size={isMobile ? "h48" : "h44"}
          error={isError || !isDuplicateChecked}
          placeholder="이메일"
          value={email}
          errorText={errorText}
          onChange={onEmailChange}
          clearValue={onEmailClear}
        />

        <AuthNextButton
          variant="primary"
          size={isMobile ? "h48" : "h44"}
          type="submit"
          disabled={isError || !isDuplicateChecked}
          $isMobile={isMobile}>
          다음 단계
        </AuthNextButton>
      </Form>
    </SubPage>
  );
}

const Form = styled.form<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 58px;
  align-self: center;
`;
