import { HTTPSTATUS } from "@api/types";

export const successfulUserData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "유저 정보를 성공적으로 가져왔습니다",
  data: {
    user: {
      id: "1",
      nickname: "Kakamotobi",
      email: "d@d.com",
      profileUrl: "https://avatars.githubusercontent.com/u/79886384?v=4",
      notificationPreferences: {
        browserNotify: true,
        targetGainNotify: true,
        maxLossNotify: true,
        targetPriceNotify: true,
      },
    },
  },
};

export const successfulProfileDetailsEditData = async ({
  profileInformation,
  profileImageFile,
}: {
  profileInformation?: Blob;
  profileImageFile?: File | "";
}) => {
  const parsedProfileInformation = profileInformation
    ? await JSON.parse(await profileInformation.text())
    : null;

  return {
    code: HTTPSTATUS.success,
    status: "Success",
    message: "프로필 정보를 성공적으로 수정했습니다",
    data: {
      user: {
        id: "1",
        nickname: parsedProfileInformation?.nickname ?? "Kakamotobi",
        email: "d@d.com",
        profileUrl: profileImageFile
          ? URL.createObjectURL(profileImageFile)
          : profileImageFile === ""
          ? null
          : "https://avatars.githubusercontent.com/u/79886384?v=4",
      },
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
