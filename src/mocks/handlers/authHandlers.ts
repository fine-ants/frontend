import { HTTPSTATUS } from "@api/types";
import {
  successfulEmailDuplicationCheckData,
  successfulEmailVerificationData,
  successfulNicknameDuplicationCheckData,
  successfulSignInData,
  successfulSignOutData,
  successfulSignUpData,
  unsuccessfulEmailDuplicationCheckData,
  unsuccessfulEmailVerificationData,
  unsuccessfulNicknameDuplicationCheckData,
  unsuccessfulSignInData,
  unsuccessfulSignUpData,
} from "mocks/data/authData";
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

  rest.post("/api/auth/:provider/login", async (_, res, ctx) => {
    // Ignore `provider` and `code` for the sake of mock.
    return res(ctx.status(HTTPSTATUS.success), ctx.json(successfulSignInData));
  }),

  rest.delete("/api/auth/logout", async (_, res, ctx) => {
    return res(ctx.status(HTTPSTATUS.success), ctx.json(successfulSignOutData));
  }),

  rest.post("/api/auth/signup", async (_, res, ctx) => {
    return res(ctx.status(HTTPSTATUS.created), ctx.json(successfulSignUpData));
    return res(
      ctx.status(HTTPSTATUS.badRequest),
      ctx.json(unsuccessfulSignUpData)
    );
  }),

  rest.post(
    "/api/auth/signup/duplicationcheck/nickname",
    async (req, res, ctx) => {
      const { nickname } = await req.json();

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

  rest.post(
    "/api/auth/signup/duplicationcheck/email",
    async (req, res, ctx) => {
      const { email } = await req.json();

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
];
