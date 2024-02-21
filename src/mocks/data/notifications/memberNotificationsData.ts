import { MemberNotification } from "@api/notifications/types";

export const memberNotificationsData: MemberNotification[] = [
  {
    notificationId: 3,
    title: "포트폴리오",
    name: "포트폴리오2",
    target: "최대 손실율",
    timestamp: "2024-01-24T10:10:10",
    isRead: false,
    type: "portfolio",
    referenceId: "2",
  },
  {
    notificationId: 2,
    title: "포트폴리오",
    name: "포트폴리오1",
    target: "목표 수익률",
    timestamp: "2024-01-23T10:10:10",
    isRead: false,
    type: "portfolio",
    referenceId: "1",
  },
  {
    notificationId: 1,
    title: "지정가",
    name: "삼성전자",
    target: "60000",
    timestamp: "2024-01-22T10:10:10",
    isRead: true,
    type: "stock",
    referenceId: "005930",
  },
];

export const successfulMemberNotifications = {
  code: 200,
  status: "OK",
  message: "현재 알림 목록 조회를 성공했습니다",
  data: memberNotificationsData,
};

export const successfulReadMemberNotification = {
  code: 200,
  status: "OK",
  message: "지정 알림을 읽음 처리했습니다",
  data: null,
};

export const successfulReadAllMemberNotifications = {
  code: 200,
  status: "OK",
  message: "알림을 모두 읽음 처리했습니다",
  data: null,
};

export const successfulDeleteMemberNotification = {
  code: 200,
  status: "OK",
  message: "알림 삭제를 성공하였습니다",
  data: null,
};

export const successfulDeleteAllMemberNotifications = {
  code: 200,
  status: "OK",
  message: "알림 전체 삭제를 성공하였습니다",
  data: null,
};

export const successfulEditMemberNotificationsSettings = {
  code: 200,
  status: "OK",
  message: "알림 설정을 변경했습니다",
  data: null,
};
