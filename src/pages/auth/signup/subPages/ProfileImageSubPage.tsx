import defaultProfile from "@assets/images/defaultProfile.png";
import Button from "@components/Buttons/Button";
import { TextButton } from "@components/Buttons/TextButton";
import { Icon } from "@components/Icon";
import { AuthOnPrevButton } from "@features/auth/components/AuthOnPrevButton";
import AuthPageHeader from "@features/auth/components/AuthPageHeader";
import { useImageInput } from "@fineants/demolition";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import styled from "styled-components";
import SubPage from "./SubPage";
import {
  AuthPageHeaderInnerWrapperD,
  AuthPageHeaderInnerWrapperM,
  AuthPageHeaderWrapperM,
  PrevButtonWrapperM,
} from "./common";

type Props = {
  onPrev: () => void;
  onNext: (data: File | null) => void;
};

export default function ProfileImageSubPage({ onPrev, onNext }: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  const {
    imageFilePath: profileImageUrl,
    imageFile: profileImageFile,
    error: imageFileError,
    onChange: onProfilePictureChange,
  } = useImageInput({
    sizeLimit: 2000000,
    errorMessages: { sizeLimit: "이미지 2MB 이하" },
  });

  const submit = () => {
    // Empty file indicates default image
    onNext(profileImageFile);
  };

  return (
    <SubPage>
      {isDesktop && (
        <AuthPageHeaderInnerWrapperD>
          <AuthOnPrevButton onPrev={onPrev} />
          <AuthPageHeader
            title="프로필 이미지 등록"
            subtitle="프로필 이미지를 등록하세요"
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
              title="프로필 이미지 등록"
              subtitle="프로필 이미지를 등록하세요"
            />
          </AuthPageHeaderInnerWrapperM>
        </AuthPageHeaderWrapperM>
      )}

      <Wrapper $isMobile={isMobile}>
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

            <ErrorCaption>{imageFileError}</ErrorCaption>
          </Profile>
        </ImageInputWrapper>

        <ButtonsContainer $isMobile={isMobile}>
          <Button
            variant="primary"
            size={isMobile ? "h48" : "h44"}
            onClick={submit}
            disabled={profileImageFile === null}>
            가입 완료
          </Button>
          <TextButton variant="underline" color="gray" onClick={submit}>
            지금은 건너뛰기
          </TextButton>
        </ButtonsContainer>
      </Wrapper>
    </SubPage>
  );
}

const Wrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin-top: 40px;
  padding-inline: ${({ $isMobile }) => ($isMobile ? "16px" : "0")};
  display: flex;
  flex-direction: column;
  align-self: center;
`;

const ImageInputWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Profile = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
  border: 1px solid #dedee0;
  border-radius: 50%;
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

const ErrorCaption = styled.p`
  position: absolute;
  right: -120px;
  bottom: 0;
  color: red;
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

const ButtonsContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? "auto" : "40px")};
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;
