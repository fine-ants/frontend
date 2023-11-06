import useText from "@components/hooks/useText";
import { Button } from "@mui/material";
import { validateNickname, validatePassword } from "@utils/authInputValidators";
import { ChangeEvent, FormEvent, useState } from "react";
import styled from "styled-components";

const SAMPLE_IMG = "https://avatars.githubusercontent.com/u/41321198?v=4";
const EMPTY_IMG =
  "https://www.interakt.shop/wp-content/uploads/2023/01/blank_profile_img.webp";

export default function ProfileEditPage() {
  // TODO : isNicknameChecked state를 이용해 닉네임 중복 체크 여부를 화면에 css color 또는 icon으로 표시

  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [imgFile, setImgFile] = useState<File>();
  const [profileImg, setProfileImg] = useState<string | undefined>(SAMPLE_IMG);

  const nickname = useText({
    validators: [validateNickname],
  });

  const password = useText({
    validators: [validatePassword],
  });

  const onProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // TODO : 이미지의 용량 제한
    const fileList = event.target.files;

    if (!fileList?.length) return;

    const imgFile = fileList[0];

    if (imgFile && imgFile.type.startsWith("image/")) {
      const profileImgUrl = URL.createObjectURL(imgFile);

      setImgFile(imgFile);
      setProfileImg(profileImgUrl);
    } else {
      event.target.value = "";
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  const onProfileRemove = () => {
    // TODO : api 추가 예정

    setProfileImg(undefined);
    setImgFile(undefined);
  };

  const onProfileSave = () => {
    // TODO : api 추가 예정

    if (!imgFile) return;
  };

  const onNicknameCheck = () => {
    // TODO : api 추가 예정

    if (!nickname.value) return;

    setIsNicknameChecked(true);
  };

  const onSubmit = (e: FormEvent) => {
    // TODO : api 추가 예정

    e.preventDefault();
  };

  return (
    <StyledProfileEditPage>
      <Title>프로필</Title>
      <ProfileWrapper>
        <ProfileImg htmlFor="fileUploader" $profileImgUrl={profileImg} />
        <input
          id="fileUploader"
          type="file"
          accept="image/*"
          onChange={onProfileChange}
        />
        <ButtonWrapper>
          <Button
            variant="contained"
            onClick={onProfileSave}
            disabled={isNicknameChecked}>
            저장
          </Button>
          <Button variant="contained" onClick={onProfileRemove}>
            삭제
          </Button>
        </ButtonWrapper>
      </ProfileWrapper>

      <Line />

      <Title>내 정보</Title>
      <Form onSubmit={onSubmit}>
        <InputController>
          <Label>닉네임</Label>
          <InputWrapper>
            <Input
              placeholder="닉네임"
              value={nickname.value}
              onChange={(e) => nickname.onChange(e.target.value.trim())}
            />
            <Button
              variant="contained"
              disabled={!nickname.value}
              onClick={onNicknameCheck}>
              중복확인
            </Button>
          </InputWrapper>
          <Description>영문/한글/숫자 (2~10자)</Description>
        </InputController>

        <InputController>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호"
            value={password.value}
            onChange={(e) => password.onChange(e.target.value.trim())}
          />
          <Description>
            영문, 숫자, 특수 문자 포함 8자 이상 조합되어야 합니다
          </Description>
        </InputController>

        <SubmitWrapper>
          <Button type="submit" variant="contained">
            저장
          </Button>
        </SubmitWrapper>
      </Form>
    </StyledProfileEditPage>
  );
}
const StyledProfileEditPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  height: 1px;
  background: #666666;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 18px;

  input[type="file"] {
    display: none;
  }
`;

const ProfileImg = styled.label<{ $profileImgUrl: string | undefined }>`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: ${({ $profileImgUrl }) =>
    $profileImgUrl ? `url(${$profileImgUrl})` : `url(${EMPTY_IMG})`};
  background-size: cover;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  height: 40px;
  display: flex;
  gap: 18px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const InputController = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 18px 0;
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 48px;

  input {
    flex: 1;
  }
`;

const Label = styled.label`
  margin-bottom: 8px;
  color: black;
  font-size: 14px;
  font-style: normal;
  font-weight: bold;
  line-height: 140%;
`;

const Input = styled.input`
  height: 48px;
  font-size: 16px;
`;

const Form = styled.form``;

const Description = styled.span`
  color: #697077;
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
`;

const SubmitWrapper = styled.div`
  width: 100%;
  text-align: right;
`;
