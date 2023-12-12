import { AuthOnPrevButton } from "@components/auth/AuthOnPrevButton";
import useImageInput from "@components/hooks/useImageInput";
import styled from "styled-components";
import SubPage from "./SubPage";

type Props = {
  onPrev: () => void;
  onNext: (data: File | null) => void;
};

export default function ProfileImageSubPage({ onPrev, onNext }: Props) {
  const {
    imageUrl: profileImageUrl,
    imageFile: profileImageFile,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({ sizeLimit: 2000000 });

  return (
    <SubPage>
      <AuthOnPrevButton onPrev={onPrev} />

      <ImageInputWrapper>
        {profileImageUrl && (
          <ProfileImage src={profileImageUrl} alt="profile" />
        )}
        <ImageInput
          type="file"
          accept="image/*"
          onChange={onProfilePictureChange}
        />
      </ImageInputWrapper>

      <Caption>2MB 이하의 이미지 파일</Caption>

      <ErrorCaption>{imageFileError}</ErrorCaption>

      <NextButton
        type="button"
        onClick={() => onNext(profileImageFile)}
        disabled={imageFileError.length > 0}>
        다음
      </NextButton>
    </SubPage>
  );
}

const ImageInputWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #dedee0;
  overflow: hidden;
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

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
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
