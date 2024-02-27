import { MemberNotificationsSettings } from "@api/notifications/types";
import { HTTPSTATUS } from "@api/types";
import {
  successfulPasswordEditData,
  successfulProfileDetailsEditData,
  successfulUserData,
  unsuccessfulUserData,
} from "@mocks/data/userData";
import { HttpResponse, http } from "msw";

const userData = successfulUserData;

export const editNotificationPreferences = (
  notificationPreferences: MemberNotificationsSettings
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fcmTokenId: _, ...newNotificationPreferences } =
    notificationPreferences;
  userData.data.user.notificationPreferences = newNotificationPreferences;
};

export default [
  http.get("/api/profile", async ({ request }) => {
    const authorizationHeader = request.headers.get("Authorization");
    if (authorizationHeader === "Bearer iamaccesstoken") {
      return HttpResponse.json(userData, {
        status: HTTPSTATUS.success,
      });
    } else {
      return HttpResponse.json(unsuccessfulUserData, {
        status: HTTPSTATUS.unAuthorized,
      });
    }
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
