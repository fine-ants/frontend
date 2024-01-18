import { OAuthProvider } from "@api/auth";
import { HTTPSTATUS } from "@api/types";

export const successfulSignUpData = {
  code: HTTPSTATUS.created,
  status: "Created",
  message: "회원가입이 완료되었습니다",
  data: null,
};

export const unsuccessfulSignUpData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "회원가입이 실패했습니다",
  data: null,
};

export const successfulOAuthURLData = (provider: OAuthProvider) => {
  const authUrls = {
    google: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    }&redirect_uri=https://localhost:5173/signin/loading?provider=google&scope=openid profile email&state=12345&nonce=6789&code_challenge=IAmCodeChallenge&code_challenge_method=S256`,
    kakao: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${
      import.meta.env.VITE_KAKAO_CLIENT_ID
    }&redirect_uri=http://localhost:5173/signin/loading?provider=kakao&scope=openid&state=12345&nonce=6789&code_challenge=IAmCodeChallenge&code_challenge_method=S256`,
    naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
      import.meta.env.VITE_NAVER_CLIENT_ID
    }&redirect_uri=http://localhost:5173/signin/loading?provider=naver&state=12345`,
  };

  return {
    code: HTTPSTATUS.success,
    status: "Success",
    message: "OAuth URL을 성공적으로 가져왔습니다",
    data: {
      authURL: authUrls[provider],
    },
  };
};

export const successfulSignInData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "로그인이 성공했습니다",
  data: {
    jwt: {
      accessToken: "iamaccesstoken",
      refreshToken: "iamrefreshtoken",
    },
    user: {
      id: 1,
      nickname: "Kakamotobi",
      email: "daeram.chung@gmail.com",
      profileUrl: "https://avatars.githubusercontent.com/u/79886384?v=4",
    },
  },
};

export const unsuccessfulSignInData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "로그인이 실패했습니다",
  data: null,
};

export const successfulSignOutData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "로그아웃이 성공했습니다",
  data: null,
};

export const successfulNicknameDuplicationCheckData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "닉네임이 사용 가능합니다",
  data: null,
};

export const unsuccessfulNicknameDuplicationCheckData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "닉네임이 중복되었습니다",
  data: null,
};

export const successfulEmailDuplicationCheckData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "이메일이 사용 가능합니다",
  data: null,
};

export const unsuccessfulEmailDuplicationCheckData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "이메일이 중복되었습니다",
  data: null,
};

export const successfulEmailVerificationData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "이메일로 검증코드를 전송하였습니다",
  data: null,
};

export const unsuccessfulEmailVerificationData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "이메일 검증코드 전송을 실패했습니다",
  data: null,
};

export const successfulEmailCodeVerificationData = {
  code: HTTPSTATUS.success,
  status: "Success",
  message: "올바른 인증 코드 입니다",
  data: null,
};

export const unsuccessfulEmailCodeVerificationData = {
  code: HTTPSTATUS.badRequest,
  status: "Bad Request",
  message: "올바르지 않은 인증 코드 입니다",
  data: null,
};
