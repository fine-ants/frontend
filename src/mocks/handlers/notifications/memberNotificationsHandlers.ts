import { HTTPSTATUS } from "@api/types";
import { MemberNotificationsSettings } from "@features/notification/api/types";
import {
  memberNotificationsData,
  successfulDeleteAllMemberNotifications,
  successfulDeleteMemberNotification,
  successfulEditMemberNotificationsSettings,
  successfulMemberNotifications,
  successfulReadAllMemberNotifications,
} from "@mocks/data/notifications/memberNotificationsData";
import { HttpResponse, http } from "msw";
import { editNotificationPreferences } from "../userHandlers";

let notificationsData = memberNotificationsData;

export default [
  // Get member notifications
  http.get("/api/members/:memberId/notifications", () => {
    return HttpResponse.json(
      {
        ...successfulMemberNotifications,
        data: { notifications: notificationsData },
      },
      {
        status: HTTPSTATUS.success,
      }
    );
  }),

  // Patch read all member notifications
  http.patch("/api/members/:memberId/notifications", () => {
    notificationsData = notificationsData.map((notification) => {
      notification.isRead = true;
      return notification;
    });

    return HttpResponse.json(successfulReadAllMemberNotifications, {
      status: HTTPSTATUS.success,
    });
  }),

  // Delete all member notifications
  http.delete("/api/members/:memberId/notifications", () => {
    notificationsData = [];

    return HttpResponse.json(successfulDeleteAllMemberNotifications, {
      status: HTTPSTATUS.success,
    });
  }),

  // Delete member notifications
  http.delete(
    "/api/members/:memberId/notifications/:notificationId",
    ({ params }) => {
      const { notificationId } = params;

      notificationsData = notificationsData.filter(
        (data) => data.notificationId !== Number(notificationId)
      );

      return HttpResponse.json(successfulDeleteMemberNotification, {
        status: HTTPSTATUS.success,
      });
    }
  ),

  // Put member notifications settings
  http.put(
    "/api/members/:memberId/notification/settings",
    async ({ request }) => {
      const data = await request.json();

      editNotificationPreferences(data as MemberNotificationsSettings);

      return HttpResponse.json(successfulEditMemberNotificationsSettings, {
        status: HTTPSTATUS.success,
      });
    }
  ),
];
