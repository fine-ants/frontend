import { OAuthProvider, SignInCredentials } from "@api/auth";
import { HTTPSTATUS } from "@api/types";
import {
  successfulEmailCodeVerificationData,
  successfulEmailDuplicationCheckData,
  successfulEmailVerificationData,
  successfulNicknameDuplicationCheckData,
  successfulOAuthURLData,
  successfulSignInData,
  successfulSignOutData,
  successfulSignUpData,
  unsuccessfulEmailCodeVerificationData,
  unsuccessfulEmailDuplicationCheckData,
  unsuccessfulEmailVerificationData,
  unsuccessfulNicknameDuplicationCheckData,
  unsuccessfulSignInData,
  unsuccessfulSignUpData,
} from "@mocks/data/authData";
import { HttpResponse, http } from "msw";

export default [
  // Email/Password Sign In
  http.post<never, SignInCredentials>(
    "/api/auth/login",
    async ({ request }) => {
      const data = await request.json();
      const { email, password } = data;

      if (email === "d@d.com" && password === "hello123!") {
        return HttpResponse.json(successfulSignInData, {
          status: HTTPSTATUS.success,
        });
      } else {
        return HttpResponse.json(unsuccessfulSignInData, {
          status: HTTPSTATUS.badRequest,
        });
      }
    }
  ),

  // OAuth URL
  http.post<{ provider: OAuthProvider }>(
    "/api/auth/:provider/authUrl",
    ({ params }) => {
      const { provider } = params;

      return HttpResponse.json(successfulOAuthURLData(provider), {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // OAuth Sign In
  http.post("/api/auth/:provider/login?code=blahblah", () => {
    // Ignore `provider` and `code` for the sake of mock.
    return HttpResponse.json(successfulSignInData, {
      status: HTTPSTATUS.success,
    });
  }),

  // Sign Out
  http.post("/api/auth/logout", () => {
    return HttpResponse.json(successfulSignOutData, {
      status: HTTPSTATUS.success,
    });
  }),

  // Email/Pasword Sign Up
  http.post("/api/auth/signup", () => {
    return HttpResponse.json(successfulSignUpData, {
      status: HTTPSTATUS.created,
    });
    return HttpResponse.json(unsuccessfulSignUpData, {
      status: HTTPSTATUS.badRequest,
    });
  }),

  // Nickname Duplicate Check
  http.get<{ nickname: string }>(
    "/api/auth/signup/duplicationcheck/nickname/:nickname",
    ({ params }) => {
      const { nickname } = params;

      if (nickname === "duplicate") {
        return HttpResponse.json(unsuccessfulNicknameDuplicationCheckData, {
          status: HTTPSTATUS.badRequest,
        });
      } else {
        return HttpResponse.json(successfulNicknameDuplicationCheckData, {
          status: HTTPSTATUS.success,
        });
      }
    }
  ),

  // Email Duplicate Check
  http.get<{ email: string }>(
    "/api/auth/signup/duplicationcheck/email/:email",
    ({ params }) => {
      const { email } = params;

      if (email === "duplicate@email.com") {
        return HttpResponse.json(unsuccessfulEmailDuplicationCheckData, {
          status: HTTPSTATUS.badRequest,
        });
      } else {
        return HttpResponse.json(successfulEmailDuplicationCheckData, {
          status: HTTPSTATUS.success,
        });
      }
    }
  ),

  // Send Email Verification Code to Email
  http.post("/api/auth/signup/verifyEmail", () => {
    return HttpResponse.json(successfulEmailVerificationData, {
      status: HTTPSTATUS.success,
    });
    return HttpResponse.json(unsuccessfulEmailVerificationData, {
      status: HTTPSTATUS.badRequest,
    });
  }),

  // Email Code Verification
  http.post<never, { code: string }>(
    "/api/auth/signup/verifyCode",
    async ({ request }) => {
      const { code } = await request.json();
      if (code === "777777") {
        return HttpResponse.json(unsuccessfulEmailCodeVerificationData, {
          status: HTTPSTATUS.badRequest,
        });
      } else {
        return HttpResponse.json(successfulEmailCodeVerificationData, {
          status: HTTPSTATUS.success,
        });
      }
    }
  ),
];
