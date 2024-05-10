import { TextField } from "@components/TextField/TextField";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import AuthPageHeader from "@features/auth/components/AuthPageHeader";
import { useDebounce, useText, validateNickname } from "@fineants/demolition";
import useNicknameDuplicateCheck from "@hooks/useNicknameDuplicateCheck";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import { ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import SubPage from "./SubPage";
import {
  AuthNextButton,
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderWrapperM,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  onPrev: () => void;
  onNext: (data: string) => void;
};

const nicknameValidator = (nickname: string) =>
  validateNickname(nickname, {
    errorMessage: "영문/한글/숫자 (2~10자)",
  });

export default function NicknameSubPage({ onPrev, onNext }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNext(nickname);
  };

  return (
    <SubPage>
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthOnPrevButton onPrev={onPrev} />
          <AuthPageHeader
            title="닉네임 입력"
            subtitle="닉네임은 영문, 한글, 숫자를 사용할 수 있고 2~10자여야 합니다"
          />
        </AuthPageHeaderInnerWrapperD>
      )}
      {isMobile && (
        <AuthPageHeaderWrapperM>
          <PrevButtonWrapperM>
            <AuthOnPrevButton onPrev={onPrev} />
          </PrevButtonWrapperM>
          <AuthPageHeaderInnerWrapperM>
            <AuthPageHeader
              title="닉네임 입력"
              subtitle="닉네임은 영문, 한글, 숫자를 사용할 수 있고 2~10자여야 합니다"
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderWrapperM>
      )}

      <Form onSubmit={onSubmit} $isMobile={isMobile}>
        <TextField
          error={isError || !isDuplicateChecked}
          placeholder="닉네임"
          value={nickname}
          errorText={errorText}
          onChange={onNicknameChange}
          clearValue={onNicknameClear}
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
