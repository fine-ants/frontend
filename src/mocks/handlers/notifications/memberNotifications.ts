import { HTTPSTATUS } from "@api/types";
import {
  successfulDeleteAllMemberNotifications,
  successfulDeleteMemberNotification,
  successfulEditMemberNotificationsSettings,
  successfulMemberNotifications,
  successfulReadAllMemberNotifications,
} from "@mocks/data/notificationsData";
import { HttpResponse, http } from "msw";
import { successfulReadMemberNotification } from "./../../data/notificationsData";

//TODO : 요청에 맞게 데이터 조작 추가하기
export default [
  // Get member notifications
  http.get("/api/members/:memberId/notifications", () => {
    return HttpResponse.json(successfulMemberNotifications, {
      status: HTTPSTATUS.success,
    });
  }),

  // Patch read all member notifications
  http.patch("/api/members/:memberId/notifications", () => {
    return HttpResponse.json(successfulReadAllMemberNotifications, {
      status: HTTPSTATUS.success,
    });
  }),

  // Patch read member notifications
  http.patch("/api/members/:memberId/notifications", () => {
    return HttpResponse.json(successfulReadMemberNotification, {
      status: HTTPSTATUS.success,
    });
  }),

  // Delete all member notifications
  http.delete("/api/members/:memberId/notifications", () => {
    return HttpResponse.json(successfulDeleteAllMemberNotifications, {
      status: HTTPSTATUS.success,
    });
  }),

  // Delete member notifications
  http.delete("/api/members/:memberId/notifications/:notificationId", () => {
    return HttpResponse.json(successfulDeleteMemberNotification, {
      status: HTTPSTATUS.success,
    });
  }),

  // Put member notifications settings
  http.put("/api/members/:memberId/notification/settings", () => {
    return HttpResponse.json(successfulEditMemberNotificationsSettings, {
      status: HTTPSTATUS.success,
    });
  }),
];
