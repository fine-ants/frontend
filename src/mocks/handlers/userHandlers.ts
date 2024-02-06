import { HTTPSTATUS } from "@api/types";
import {
  successfulPasswordEditData,
  successfulProfileDetailsEditData,
  successfulUserData,
} from "@mocks/data/userData";
import { HttpResponse, http } from "msw";

export default [
  http.get("/api/profile", async () => {
    return HttpResponse.json(successfulUserData, {
      status: HTTPSTATUS.success,
    });
  }),
  http.put("/api/profile", async ({ request }) => {
    const formData = await request.formData();

    const data = [...formData.keys()].reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: formData.get(curr),
      }),
      {}
    );

    return HttpResponse.json(successfulProfileDetailsEditData(data), {
      status: HTTPSTATUS.success,
    });
  }),

  http.put("/api/account/password", () => {
    return HttpResponse.json(successfulPasswordEditData, {
      status: HTTPSTATUS.success,
    });
  }),

  http.delete<never, { refreshToken: string }>("/api/account", async () => {
    return HttpResponse.json(successfulPasswordEditData, {
      status: HTTPSTATUS.success,
    });
  }),
];
