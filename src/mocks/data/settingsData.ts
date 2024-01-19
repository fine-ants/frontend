import { HTTPSTATUS } from "@api/types";

export const successfulProfileDetailsEditData = ({
  profileInformation,
  profileImageFile,
}: {
  profileInformation?: string;
  profileImageFile?: File;
}) => {
  const parsedProfileInformation = profileInformation
    ? JSON.parse(profileInformation)
    : null;

  return {
    code: HTTPSTATUS.success,
    status: "Success",
    message: "프로필 정보를 성공적으로 수정했습니다",
    data: {
      id: "1",
      nickname: parsedProfileInformation?.nickname ?? "Kakamotobi",
      email: "d@d.com",
      profileUrl: profileImageFile
        ? URL.createObjectURL(profileImageFile)
        : "https://avatars.githubusercontent.com/u/79886384?v=4",
    },
  };
};

export const successfulPasswordEditData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "비밀번호를 성공적으로 변경했습니다",
  data: null,
};

export const successfulAccountDeleteData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "계정을 성공적으로 삭제했습니다",
  data: null,
};
