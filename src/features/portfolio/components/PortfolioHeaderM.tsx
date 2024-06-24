import LabelBadge from "@components/Badges/LabelBadge";
import { SecuritiesFirm, securitiesFirmLogos } from "@constants/securitiesFirm";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

type Props = {
  securitiesFirm: SecuritiesFirm;
  name: string;
  tab: "portfolio" | "chart";
  onChangeTab: (tab: "portfolio" | "chart") => void;
};

export default function PortfolioHeaderM({
  name,
  securitiesFirm,
  tab,
  onChangeTab,
}: Props) {
  return (
    <>
      <TitleWrapper>
        <FirmImage
          src={securitiesFirmLogos[securitiesFirm]}
          alt={`${securitiesFirm} 로고`}
        />
        <Title>{name}</Title>
        <LabelBadge title={securitiesFirm} />
      </TitleWrapper>
      <Tabs>
        <TabItem $isActive={tab === "portfolio"}>
          <button onClick={() => onChangeTab("portfolio")}>
            포트폴리오 정보
          </button>
        </TabItem>
        <TabItem $isActive={tab === "chart"}>
          <button onClick={() => onChangeTab("chart")}>차트</button>
        </TabItem>
      </Tabs>
    </>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
`;

const FirmImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
`;

const Title = styled.span`
  font: ${designSystem.font.heading4.font};
  letter-spacing: ${designSystem.font.heading4.letterSpacing};
  color: ${designSystem.color.neutral.gray900};
`;

const Tabs = styled.ul`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
`;

const TabItem = styled.li<{ $isActive: boolean }>`
  width: 50%;
  height: 100%;
  margin-bottom: -2px;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
  border-bottom: ${({ $isActive }) =>
    $isActive
      ? `2px solid ${designSystem.color.primary.blue500}`
      : `2px solid ${designSystem.color.neutral.white}`};

  > button {
    width: 100%;
    height: 100%;
    display: block;
    text-align: center;
    line-height: 40px;
    color: ${({ $isActive }) =>
      $isActive
        ? designSystem.color.primary.blue500
        : designSystem.color.neutral.gray600};
  }
`;
