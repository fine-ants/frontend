import defaultProfile from "@assets/images/defaultProfile.png";
import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import {
  AuthPageHeader,
  AuthPageTitle,
  AuthPageTitleCaption,
  NextButton,
} from "@components/auth/AuthPageCommon";
import { Icon } from "@components/common/Icon";
import { useImageInput } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import SubPage from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (data: File | null) => void;
};

export default function ProfileImageSubPage({ onPrev, onNext }: Props) {
  const {
    imageFilePath: profileImageUrl,
    imageFile: profileImageFile,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  const submit = () => {
    onNext(profileImageFile);
  };

  return (
    <SubPage>
      <AuthPageHeader>
        <AuthOnPrevButton onPrev={onPrev} />

        <AuthPageTitle>프로필 이미지 등록</AuthPageTitle>
        <AuthPageTitleCaption>
          2MB 이하의프로필 이미지를 등록하세요
        </AuthPageTitleCaption>
      </AuthPageHeader>
      <ImageInputWrapper>
        <Profile>
          <CameraWrapper>
            <Icon icon="camera" color="white" size={16} />
          </CameraWrapper>
          <Image
            src={profileImageUrl ? profileImageUrl : defaultProfile}
            alt="profile"
          />

          <ImageInput
            type="file"
            accept="image/*"
            onChange={onProfilePictureChange}
          />
        </Profile>
      </ImageInputWrapper>

      <ErrorCaption>{imageFileError}</ErrorCaption>

      <NextButton
        type="button"
        onClick={submit}
        disabled={profileImageFile === null}>
        등록 완료
      </NextButton>
      <Container>
        <TextButton onClick={submit}>지금은 건너뛰기</TextButton>
      </Container>
    </SubPage>
  );
}

const ImageInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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

const Profile = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #dedee0;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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

const TextButton = styled.button`
  padding: 0;
  color: ${designSystem.color.neutral.gray600};
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorCaption = styled.p`
  color: red;
`;
