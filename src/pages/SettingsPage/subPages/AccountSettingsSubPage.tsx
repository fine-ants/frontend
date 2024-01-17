import usePasswordEditMutation from "@api/settings/queries/usePasswordEditMutation";
import AccountDeleteDialog from "@components/AccountDeleteDialog";
import Button from "@components/common/Buttons/Button";
import { PasswordTextField } from "@components/common/TextField/PasswordTextField";
import { useText, validatePassword } from "@fineants/demolition";
import { Button as MuiButton } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const passwordValidator = (password: string) =>
  validatePassword(password, {
    errorMessage: "영문, 숫자, 특수문자 최소 1개 (8~16자)",
  });

export default function AccountSettingsSubPage() {
  const navigate = useNavigate();

  const [isAccountDeleteDialogOpen, setIsAccountDeleteDialogOpen] =
    useState(false);

  const {
    value: currentPasswordValue,
    error: currentPasswordError,
    isError: currentPasswordIsError,
    onChange: currentPasswordOnChange,
  } = useText({
    validators: [passwordValidator],
  });

  const {
    value: newPasswordValue,
    error: newPasswordError,
    isError: newPasswordIsError,
    onChange: newPasswordOnChange,
  } = useText({
    validators: [passwordValidator],
  });

  const {
    value: newPasswordConfirmValue,
    onChange: newPasswordConfirmOnChange,
  } = useText({
    validators: [passwordValidator],
  });

  const { mutate: mutatePasswordEdit } = usePasswordEditMutation({
    onSuccess: () => {
      currentPasswordOnChange("");
      newPasswordOnChange("");
      newPasswordConfirmOnChange("");
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    mutatePasswordEdit({
      currentPassword: currentPasswordValue,
      newPassword: newPasswordValue,
      newPasswordConfirm: newPasswordConfirmValue,
    });
  };

  const onAccountDeleteClick = () => {
    setIsAccountDeleteDialogOpen(true);
  };

  const newPasswordIsErrorExtended =
    newPasswordIsError ||
    (currentPasswordValue !== "" && currentPasswordValue === newPasswordValue);

  const newPasswordConfirmIsErrorExtended =
    newPasswordConfirmValue !== "" &&
    newPasswordValue !== newPasswordConfirmValue;

  const newPasswordErrorExtended = newPasswordError
    ? newPasswordError
    : currentPasswordValue === newPasswordValue
    ? "현재 비밀번호와 다른 비밀번호를 입력해주세요"
    : "";

  const isSaveButtonDisabled =
    currentPasswordValue === "" ||
    currentPasswordIsError ||
    newPasswordValue === "" ||
    newPasswordIsErrorExtended ||
    newPasswordConfirmValue === "" ||
    newPasswordConfirmIsErrorExtended ||
    currentPasswordValue === newPasswordValue;

  return (
    <Form onSubmit={onSubmit}>
      <LabelsWrapper>
        <Label htmlFor="currentPasswordInput">
          <p>현재 비밀번호</p>
          <TextFieldWrapper>
            <PasswordTextField
              id="currentPasswordInput"
              error={currentPasswordIsError}
              password={currentPasswordValue}
              onChange={(e) => currentPasswordOnChange(e.target.value.trim())}
              placeholder="현재 비밀번호"
              errorText={currentPasswordError}
            />
          </TextFieldWrapper>
        </Label>

        <Label htmlFor="passwordInput">
          <p>새 비밀번호</p>
          <TextFieldWrapper>
            <PasswordTextField
              id="passwordInput"
              error={newPasswordIsErrorExtended}
              password={newPasswordValue}
              onChange={(e) => newPasswordOnChange(e.target.value.trim())}
              placeholder="새 비밀번호"
              errorText={newPasswordErrorExtended}
            />
          </TextFieldWrapper>
        </Label>

        <Label htmlFor="passwordConfirmInput">
          <p>새 비밀번호 확인</p>
          <TextFieldWrapper>
            <PasswordTextField
              id="passwordConfirmInput"
              error={newPasswordConfirmIsErrorExtended}
              password={newPasswordConfirmValue}
              onChange={(e) =>
                newPasswordConfirmOnChange(e.target.value.trim())
              }
              placeholder="새 비밀번호 확인"
              errorText="비밀번호가 일치하지 않습니다"
            />
          </TextFieldWrapper>
        </Label>
      </LabelsWrapper>

      <ButtonsContainer>
        <Button
          type="button"
          variant="tertiary"
          size="h44"
          style={buttonStyles}
          onClick={() => navigate(Routes.DASHBOARD)}>
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="h44"
          style={buttonStyles}
          disabled={isSaveButtonDisabled}>
          저장
        </Button>
      </ButtonsContainer>

      <MuiButton
        type="button"
        variant="text"
        sx={accountDeactivationButtonSx}
        onClick={onAccountDeleteClick}>
        계정 삭제하기
      </MuiButton>

      {isAccountDeleteDialogOpen && (
        <AccountDeleteDialog
          isOpen={isAccountDeleteDialogOpen}
          onClose={() => setIsAccountDeleteDialogOpen(false)}
        />
      )}
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const LabelsWrapper = styled.div`
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font: ${designSystem.font.title5};
  color: ${designSystem.color.neutral.gray800};

  > p {
    width: 120px;
  }
`;

const TextFieldWrapper = styled.div`
  flex-grow: 1;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const buttonStyles = {
  flexGrow: 1,
};

const accountDeactivationButtonSx = {
  "width": "82px",
  "height": "17px",
  "marginInline": "auto",
  "padding": 0,
  "font": designSystem.font.button2,
  "color": designSystem.color.neutral.gray600,
  "&:hover": {
    backgroundColor: "inherit",
    textDecoration: "underline",
  },
};
