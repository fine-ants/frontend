const memberNotificationsData = [
  {
    notificationId: 3,
    title: "포트폴리오",
    content: "포트폴리오2의 최대 손실율을 초과했습니다",
    timestamp: "2024-01-24T10:10:10",
    isRead: false,
    type: "portfolio",
    referenceId: "2",
  },
  {
    notificationId: 2,
    title: "포트폴리오",
    content: "포트폴리오1의 목표 수익률을 달성했습니다",
    timestamp: "2024-01-23T10:10:10",
    isRead: false,
    type: "portfolio",
    referenceId: "1",
  },
  {
    notificationId: 1,
    title: "지정가",
    content: "삼성전자가 지정가 KRW60000에 도달했습니다",
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
