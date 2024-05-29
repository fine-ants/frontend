import dashboard from "@assets/images/dashboard.svg";
import featureImage1 from "@assets/images/feature1.svg";
import featureImage2 from "@assets/images/feature2.svg";
import featureImage3 from "@assets/images/feature3.svg";
import portfolioImage1 from "@assets/images/img_portfolio1.svg";
import portfolioImage2 from "@assets/images/img_portfolio2.svg";
import portfolioImage3 from "@assets/images/img_portfolio3.svg";
import landingTopBG from "@assets/images/landingTop.svg";
import landingTopChart from "@assets/images/landingTopChart.png";
import Footer from "@components/Footer";
import Header from "@components/Header/Header";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function LandingPage() {
  return (
    <>
      <Header />
      <BasePage>
        <LandingTopBG>
          <LandingTopBGContent>
            <LandingTopText>
              <h1>주식 자산 관리를 더 쉽고 간편하게</h1>
              <h2>실시간 자산 현황을 확인하고 똑똑한 투자 관리를 시작하세요</h2>
            </LandingTopText>
            <LandingTopChart src={landingTopChart} alt="landingTopChart" />
          </LandingTopBGContent>
        </LandingTopBG>
        <LandingBottom>
          <FeatureContainer>
            <FeatureTitle>대시보드</FeatureTitle>
            <FeatureDescription>
              보유 자산을 한 눈에 확인하세요
            </FeatureDescription>
            <DashboardImage src={dashboard} alt="dashboard" />
          </FeatureContainer>
          <FeatureContainer>
            <FeatureTitle>포트폴리오</FeatureTitle>
            <FeatureDescription>
              투자 목적에 맞는 다양한 포트폴리오를 생성하고
              <br />
              자산을 효율적으로 관리할 수 있습니다
            </FeatureDescription>
            <PortfolioImageContainer>
              <PortfolioImage src={portfolioImage1} alt="portfolio1" />
              <PortfolioImage src={portfolioImage2} alt="portfolio2" />
              <PortfolioImage src={portfolioImage3} alt="portfolio3" />
            </PortfolioImageContainer>
          </FeatureContainer>
          <ComfortContainer>
            <FeatureLeft>
              <FeatureTitle>편의 기능</FeatureTitle>
              <FeatureDescription>
                성공적인 투자 관리를 위한
                <br />
                다양한 기능을 지원합니다
              </FeatureDescription>
            </FeatureLeft>
            <FeatureRight>
              <FeatureImage src={featureImage1} alt="관심 종목" />
              <FeatureImage src={featureImage2} alt="종목 상세 차트" />
              <FeatureImage src={featureImage3} alt="손익 알림" />
            </FeatureRight>
          </ComfortContainer>
        </LandingBottom>
        <Footer />
      </BasePage>
    </>
  );
}

const BasePage = styled.div`
  width: 100%;
  height: auto;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${designSystem.color.neutral.white};
`;

const LandingTopBG = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(${landingTopBG});
  background-size: cover;
  background-position: center;
`;

const LandingTopBGContent = styled.div`
  display: flex;
  align-items: center;
  gap: 237px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LandingTopText = styled.div`
  width: auto;
  height: 224px;

  > h1 {
    width: 433px;
    font:
      900 64px/77px "IBM Plex Sans",
      sans-serif;
    color: ${designSystem.color.neutral.white};
    margin-bottom: 40px;
  }

  > h2 {
    font: ${designSystem.font.body1.font};
    color: ${designSystem.color.neutral.white};
  }
`;

const LandingTopChart = styled.img`
  width: 741px;
  height: 681px;
  pointer-events: none;
`;

const LandingBottom = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 200px;
  margin: 0 auto;
  margin-bottom: 200px;
  padding: 120px 240px 0 240px;
  width: 100%;
  max-width: 1920px;
  height: auto;
  min-height: inherit;
  background-color: ${designSystem.color.neutral.white};
`;

const FeatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FeatureTitle = styled.h3`
  margin-right: auto;
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;

const FeatureDescription = styled.p`
  margin-right: auto;
  margin-top: 16px;
  font:
    700 48px/62px "IBMPlexSansKR-Regular",
    sans-serif;
  color: #111111;
`;

const DashboardImage = styled.img`
  border-radius: 16px;
  width: 100%;
  height: 640px;
  margin-top: 80px;
  pointer-events: none;
`;

const PortfolioImageContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 80px;
`;

const PortfolioImage = styled.img`
  width: 464px;
  height: 464px;
  border-radius: 16px;
  pointer-events: none;
`;

const ComfortContainer = styled(FeatureContainer)`
  display: flex;
  flex-direction: row;
  height: auto;
  justify-content: space-between;
  align-items: flex-start;
`;
const FeatureLeft = styled.div``;
const FeatureRight = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 45px;
`;

const FeatureImage = styled.img`
  width: 224px;
  height: 224px;
  border-radius: 16px;
  pointer-events: none;
`;
