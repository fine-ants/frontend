import defaultProfile from "@assets/images/defaultProfile.png";
import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { TextField } from "@components/TextField/TextField";
import useProfileDetailsMutation from "@features/user/api/queries/useProfileDetailsMutation";
import { UserContext } from "@features/user/context/UserContext";
import {
  useDebounce,
  useImageInput,
  useText,
  validateNickname,
} from "@fineants/demolition";
import useNicknameDuplicateCheck from "@hooks/useNicknameDuplicateCheck";
import { Button as MuiButton } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { ChangeEvent, FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const nicknameValidator = (nickname: string) =>
  validateNickname(nickname, {
    errorMessage: "영문/한글/숫자 (2~10자)",
  });

export default function ProfileSettingsSubPage() {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { mutate: profileDetailsMutate } = useProfileDetailsMutation();

  const {
    imageFilePath: profileImageUrl,
    imageFile: profileImageFile,
    error: imageFileError,
    onChange: onProfileImageChange,
    onClearImage: onClearProfileImage,
  } = useImageInput({
    sizeLimit: 2000000,
    errorMessages: { sizeLimit: "이미지 2MB 이하" },
    initialImageUrl: user?.profileUrl,
  });

  const {
    value: nicknameValue,
    error: nicknameError,
    isError: nicknameIsError,
    onChange: nicknameOnChange,
  } = useText({
    initialValue: user?.nickname,
    validators: [nicknameValidator],
  });

  const debouncedNickname = useDebounce(nicknameValue, 400);

  const {
    isDuplicateChecked,
    duplicateCheckErrorMsg,
    updateDuplicateCheckErrorMsg,
    updateIsDuplicateComplete,
  } = useNicknameDuplicateCheck({
    newNickname: debouncedNickname,
    newNicknameIsError: nicknameIsError && debouncedNickname !== user?.nickname,
  });

  const onNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    nicknameOnChange(e.target.value.trim());
    updateIsDuplicateComplete(false);
    updateDuplicateCheckErrorMsg("");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (nicknameValue !== user?.nickname) {
      formData.append(
        "profileInformation",
        new Blob([JSON.stringify({ nickname: nicknameValue })], {
          type: "application/json",
        })
      );
    }
    if (profileImageUrl !== user?.profileUrl) {
      // Empty file indicates default image
      formData.append("profileImageFile", profileImageFile ?? new File([], ""));
    }

    profileDetailsMutate(formData);
  };

  const nicknameErrorText = nicknameIsError
    ? nicknameError
    : isDuplicateChecked
    ? ""
    : duplicateCheckErrorMsg;

  const isSaveButtonDisabled =
    nicknameValue === "" ||
    (nicknameValue === user?.nickname &&
      profileImageUrl === user?.profileUrl) ||
    (nicknameValue !== user?.nickname && !isDuplicateChecked) ||
    nicknameIsError ||
    imageFileError !== "";

  return (
    <Form onSubmit={onSubmit}>
      <LabelsWrapper>
        <ProfileImageLabel htmlFor="profileImageInput">
          <p>프로필 이미지</p>

          <ProfileImageWrapper>
            <ProfileImage
              src={profileImageUrl ? profileImageUrl : defaultProfile}
              alt="profile"
            />
            <CameraWrapper>
              <Icon icon="camera" color="white" size={16} />
            </CameraWrapper>
            <ImageInput
              type="file"
              accept="image/*"
              onChange={onProfileImageChange}
            />
          </ProfileImageWrapper>

          <ErrorCaption>{imageFileError}</ErrorCaption>

          <ClearImageButton variant="text" onClick={onClearProfileImage}>
            기본 이미지 사용
          </ClearImageButton>
        </ProfileImageLabel>

        <Label htmlFor="nicknameInput">
          <p>닉네임</p>
          <TextFieldWrapper>
            <TextField
              id="nicknameInput"
              error={nicknameIsError || !!duplicateCheckErrorMsg}
              placeholder="닉네임"
              value={nicknameValue}
              errorText={nicknameErrorText}
              onChange={onNicknameChange}
              clearValue={() => nicknameOnChange("")}
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
    </Form>
  );
}

const Form = styled.form`
  padding-top: 40px;
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

const ProfileImageLabel = styled.label`
  display: flex;
  gap: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};

  > p:first-of-type {
    width: 120px;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 120px;
  height: 120px;
  position: relative;
  border: 1px solid #dedee0;
  border-radius: 50%;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ImageInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

const CameraWrapper = styled.div`
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 16px;
  background: #373840;
  position: absolute;
  bottom: 4px;
  right: 4px;
  z-index: 1;
`;

const ErrorCaption = styled.p`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  color: red;
`;

const ClearImageButton = styled(MuiButton)`
  height: 24px;
  padding: 0 8px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.primary.blue500};
  text-align: right;
  transition: 250ms;

  &:hover {
    background-color: ${designSystem.color.primary.blue50};
  }
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
  display: flex;
  align-items: center;
  gap: 8px;
`;

const buttonStyles = {
  flexGrow: 1,
};
