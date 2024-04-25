import authHandlers from "./authHandlers";
import dashboardHandlers from "./dashboardHandlers";
import memberNotifications from "./notifications/memberNotificationsHandlers";
import notificationSettingsHandlers from "./notifications/notificationSettingsHandlers";
import portfolioHandlers from "./portfolioHandlers";
import stockHandlers from "./stockHandlers";
import userHandlers from "./userHandlers";
import watchlistHandlers from "./watchlistHandlers";

export default [
  ...authHandlers,
  ...dashboardHandlers,
  ...portfolioHandlers,
  ...stockHandlers,
  ...userHandlers,
  ...watchlistHandlers,
  ...memberNotifications,
  ...notificationSettingsHandlers,
];
