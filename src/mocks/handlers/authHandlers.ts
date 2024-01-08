import { OAuthProvider } from "@api/auth";
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
import { rest } from "msw";

export default [
  rest.post("/api/auth/login", async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === "d@d.com" && password === "hello123!") {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulSignInData)
      );
    } else {
      return res(
        ctx.status(HTTPSTATUS.badRequest),
        ctx.json(unsuccessfulSignInData)
      );
    }
  }),

  rest.post("/api/auth/:provider/authUrl", async (req, res, ctx) => {
    const provider = req.params.provider as OAuthProvider;

    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulOAuthURLData(provider))
    );
  }),

  rest.post("/api/auth/:provider/login?code=blahblah", async (_, res, ctx) => {
    // Ignore `provider` and `code` for the sake of mock.
    return res(ctx.status(HTTPSTATUS.success), ctx.json(successfulSignInData));
  }),

  rest.post("/api/auth/logout", async (_, res, ctx) => {
    return res(ctx.status(HTTPSTATUS.success), ctx.json(successfulSignOutData));
  }),

  rest.post("/api/auth/signup", async (_, res, ctx) => {
    return res(ctx.status(HTTPSTATUS.created), ctx.json(successfulSignUpData));
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unsuccessfulSignUpData)
    );
  }),

  rest.get(
    "/api/auth/signup/duplicationcheck/nickname/:nickname",
    async (req, res, ctx) => {
      const nickname = req.params.nickname;

      if (nickname === "duplicate") {
        return res(
          ctx.status(HTTPSTATUS.badRequest),
          ctx.json(unsuccessfulNicknameDuplicationCheckData)
        );
      } else {
        return res(
          ctx.status(HTTPSTATUS.success),
          ctx.json(successfulNicknameDuplicationCheckData)
        );
      }
    }
  ),

  rest.get(
    "/api/auth/signup/duplicationcheck/email/:email",
    async (req, res, ctx) => {
      const email = req.params.email;

      if (email === "duplicate@email.com") {
        return res(
          ctx.status(HTTPSTATUS.badRequest),
          ctx.json(unsuccessfulEmailDuplicationCheckData)
        );
      } else {
        return res(
          ctx.status(HTTPSTATUS.success),
          ctx.json(successfulEmailDuplicationCheckData)
        );
      }
    }
  ),

  rest.post("/api/auth/signup/verifyEmail", async (_, res, ctx) => {
    return res(
      ctx.status(HTTPSTATUS.success),
      ctx.json(successfulEmailVerificationData)
    );
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unsuccessfulEmailVerificationData)
    );
  }),

  rest.post("/api/auth/signup/verifyCode", async (req, res, ctx) => {
    const { code } = await req.json();
    if (code === "777777") {
      return res(
        ctx.status(HTTPSTATUS.badRequest),
        ctx.json(unsuccessfulEmailCodeVerificationData)
      );
    } else {
      return res(
        ctx.status(HTTPSTATUS.success),
        ctx.json(successfulEmailCodeVerificationData)
      );
    }
  }),
];
