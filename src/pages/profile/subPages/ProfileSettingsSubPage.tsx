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
import useResponsiveLayout from "@hooks/useResponsiveLayout";
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
  const { isDesktop, isMobile } = useResponsiveLayout();

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
    initialImageUrl: user?.profileUrl ?? undefined,
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
    <Form onSubmit={onSubmit} $isMobile={isMobile}>
      <LabelsWrapper $isMobile={isMobile}>
        <ProfileImageLabel htmlFor="profileImageInput" $isMobile={isMobile}>
          <p>프로필 이미지</p>
          <ProfileImageWrapper $isMobile={isMobile}>
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

          {imageFileError && <ErrorCaption>{imageFileError}</ErrorCaption>}

          <ClearImageButton
            variant="text"
            onClick={onClearProfileImage}
            $isDesktop={isDesktop}>
            기본 이미지 사용
          </ClearImageButton>
        </ProfileImageLabel>

        <NicknameLabel htmlFor="nicknameInput" $isMobile={isMobile}>
          <p>닉네임</p>
          <TextFieldWrapper $isMobile={isMobile}>
            <TextField
              id="nicknameInput"
              size={isMobile ? "h48" : "h32"}
              error={nicknameIsError || !!duplicateCheckErrorMsg}
              placeholder="닉네임"
              value={nicknameValue}
              errorText={nicknameErrorText}
              onChange={onNicknameChange}
              clearValue={() => nicknameOnChange("")}
            />
          </TextFieldWrapper>
        </NicknameLabel>
      </LabelsWrapper>

      <ButtonsContainer>
        <Button
          type="button"
          variant="tertiary"
          size={isMobile ? "h48" : "h44"}
          style={buttonStyles}
          onClick={() => navigate(Routes.DASHBOARD)}>
          취소
        </Button>
        <Button
          type="submit"
          variant="primary"
          size={isMobile ? "h48" : "h44"}
          style={buttonStyles}
          disabled={isSaveButtonDisabled}>
          저장
        </Button>
      </ButtonsContainer>
    </Form>
  );
}

const Form = styled.form<{ $isMobile: boolean }>`
  width: 100%;
  padding: ${({ $isMobile }) => ($isMobile ? "24px 16px 8px" : "40px 0 0 0")};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
`;

const LabelsWrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-bottom: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? "16px" : "24px")};
`;

const ProfileImageLabel = styled.label<{ $isMobile: boolean }>`
  width: 100%;
  padding-bottom: ${({ $isMobile }) => ($isMobile ? "120px" : "0")};
  display: flex;
  justify-content: ${({ $isMobile }) =>
    $isMobile ? "space-between" : "flex-start"};
  gap: ${({ $isMobile }) => ($isMobile ? "0" : "8px")};
  position: ${({ $isMobile }) => ($isMobile ? "relative" : "static")};
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};

  > p:first-of-type {
    width: ${({ $isMobile }) => ($isMobile ? "auto" : "120px")};
  }
`;

const ProfileImageWrapper = styled.div<{ $isMobile: boolean }>`
  width: 120px;
  height: 120px;
  position: ${({ $isMobile }) => ($isMobile ? "absolute" : "static")};
  top: ${({ $isMobile }) => ($isMobile ? "25px" : "0")};
  left: ${({ $isMobile }) => ($isMobile ? "50%" : "0")};
  transform: ${({ $isMobile }) =>
    $isMobile ? "translateX(-50%)" : "translateX(0)"};
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
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 2;
  cursor: pointer;
`;

const CameraWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 4px;
  right: 4px;
  flex-shrink: 0;
  background: #373840;
  border-radius: 16px;
  z-index: 1;
`;

const ErrorCaption = styled.p`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  color: ${designSystem.color.state.red500};
`;

const ClearImageButton = styled(MuiButton)<{ $isDesktop: boolean }>`
  height: 24px;
  padding: 0;
  margin-left: auto;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.primary.blue500};
  text-align: right;
  transition: 250ms;

  &:hover {
    background-color: ${designSystem.color.primary.blue50};
  }
`;

const NicknameLabel = styled.label<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? "column" : "row")};
  align-items: ${({ $isMobile }) => ($isMobile ? "flex-start" : "center")};
  gap: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray800};

  > p {
    width: 120px;
  }
`;

const TextFieldWrapper = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "100%" : "auto")};
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
