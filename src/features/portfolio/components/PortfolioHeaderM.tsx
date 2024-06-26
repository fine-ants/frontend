import LabelBadge from "@components/Badges/LabelBadge";
import { IconButton } from "@components/Buttons/IconButton";
import { SecuritiesFirm, securitiesFirmLogos } from "@constants/securitiesFirm";
import { useBoolean } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PortfolioHeaderDrawer from "./PortfolioHeaderDrawer";

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
  const navigate = useNavigate();

  const {
    state: isDrawerOpen,
    setTrue: onDrawerOpen,
    setFalse: onDrawerClose,
  } = useBoolean();

  return (
    <>
      <StyledPortfolioHeader>
        <ButtonWrapper>
          <IconButton
            icon="arrow-left"
            size="h40"
            iconColor="gray"
            onClick={() => navigate(-1)}
          />
          <IconButton
            icon="kebab-vertical"
            size="h40"
            iconColor="gray"
            onClick={onDrawerOpen}
          />
        </ButtonWrapper>

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
      </StyledPortfolioHeader>

      <PortfolioHeaderDrawer
        isDrawerOpen={isDrawerOpen}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onDrawerClose}
      />
    </>
  );
}

const StyledPortfolioHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 8px;
`;

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
