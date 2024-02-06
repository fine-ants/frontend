import { HTTPSTATUS } from "@api/types";
import { successfulMemberNotifications } from "@mocks/data/notificationsData";
import { HttpResponse, http } from "msw";

export default [
  // Get member notifications
  http.get("/api/members/:memberId/notifications", () => {
    return HttpResponse.json(successfulMemberNotifications, {
      status: HTTPSTATUS.success,
    });
  }),
];
