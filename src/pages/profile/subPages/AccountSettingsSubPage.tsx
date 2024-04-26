import socialLoginImage from "@assets/images/social_login_image.svg";
import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import { PasswordTextField } from "@components/TextField/PasswordTextField";
import usePasswordEditMutation from "@features/user/api/queries/usePasswordEditMutation";
import AccountDeleteDialog from "@features/user/components/AccountDeleteDialog";
import { UserContext } from "@features/user/context/UserContext";
import { useText, validatePassword } from "@fineants/demolition";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const passwordValidator = (password: string) =>
  validatePassword(password, {
    errorMessage: "영문, 숫자, 특수문자 최소 1개 (8~16자)",
  });

export default function AccountSettingsSubPage() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

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
    <Form onSubmit={onSubmit} $isOAuth={user?.provider !== "local"}>
      {user?.provider === "local" ? (
        <>
          <LabelsWrapper>
            <Label htmlFor="currentPasswordInput">
              <p>현재 비밀번호</p>
              <TextFieldWrapper>
                <PasswordTextField
                  id="currentPasswordInput"
                  error={currentPasswordIsError}
                  password={currentPasswordValue}
                  onChange={(e) =>
                    currentPasswordOnChange(e.target.value.trim())
                  }
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
        </>
      ) : (
        <SocialLoginDescription>
          <img src={socialLoginImage} alt="소셜 계정으로 로그인함" />
          <p>소셜 계정으로 로그인되어 있습니다</p>
          <p>간편 로그인 회원은 비밀번호를 변경할 수 없습니다</p>
        </SocialLoginDescription>
      )}

      <AccountDeactivationButton
        type="button"
        variant="underline"
        color="gray"
        onClick={onAccountDeleteClick}>
        계정 삭제하기
      </AccountDeactivationButton>

      {isAccountDeleteDialogOpen && (
        <AccountDeleteDialog
          isOpen={isAccountDeleteDialogOpen}
          onClose={() => setIsAccountDeleteDialogOpen(false)}
        />
      )}
    </Form>
  );
}

const Form = styled.form<{ $isOAuth: boolean }>`
  padding-top: ${({ $isOAuth }) => ($isOAuth ? "0" : "40px")};
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
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
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

const SocialLoginDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;

  img {
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
  }

  p:first-of-type {
    margin-bottom: 8px;
    font: ${designSystem.font.title3.font};
    letter-spacing: ${designSystem.font.title3.letterSpacing};
    color: ${designSystem.color.neutral.gray600};
  }

  p:last-of-type {
    font: ${designSystem.font.body3.font};
    color: ${designSystem.color.neutral.gray500};
  }
`;

const AccountDeactivationButton = styled(TextButton)`
  width: auto;
  margin-inline: auto;
`;

const buttonStyles = {
  flexGrow: 1,
};