import dashboard from "@assets/images/dashboard.png";
import landingTopBG from "@assets/images/landingTop.png";
import landingTopChart from "@assets/images/landingTopChart.png";
import landingTopText from "@assets/images/landingTopText.png";
import portfolioImage1 from "@assets/images/portfolio1.png";
import portfolioImage2 from "@assets/images/portfolio2.png";
import portfolioImage3 from "@assets/images/portfolio3.png";
import Footer from "@components/common/Footer";
import Header from "@components/common/Header/Header";
import designSystem from "@styles/designSystem";
import styled from "styled-components";

export default function LandingPage() {
  // const navigate = useNavigate();

  return (
    <>
      <BasePage>
        <Header />
        {/* <nav>
        <ul>
          <li onClick={() => navigate(Routes.SIGNIN)}>로그인</li>
          <li onClick={() => navigate(Routes.SIGNUP)}>회원가입</li>
        </ul>
      </nav> */}
        {/* <Typography variant="h1">Landing Page!</Typography> */}
        <LandingTopBG>
          <LandingTopText src={landingTopText} alt="landingTopText" />
          <LandingTopChart src={landingTopChart} alt="landingTopChart" />
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
  background-color: ${designSystem.color.neutral.gray50};
`;

const LandingTopBG = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  width: 1920px;
  height: 956px;
  background-image: url(${landingTopBG});
`;

const LandingTopText = styled.img`
  width: 494px;
  height: 224px;
  position: absolute;
  top: 351px;
  left: 240px;
`;

const LandingTopChart = styled.img`
  width: 741px;
  height: 681px;
  position: absolute;
  top: 138px;
  right: 208px;
`;

const LandingBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 200px;
  margin: 0 auto;
  padding: 120px 240px 0 240px;
  width: 1920px;
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
  width: 1140px;
  height: 640px;
  margin-top: 80px;
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
`;
