import { BASE_API_URL } from "@constants/config";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function PortfolioPage() {
  const { id } = useParams();

  // const { data: portfolio, isLoading: isPortfolioDetailsLoading } =
  //   usePortfolioDetailsQuery(Number(id));

  // const [isAddHoldingDialogOpen, setIsAddHoldingDialogOpen] = useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const eventSource = new EventSourcePolyfill(
    `${BASE_API_URL}/api/portfolio/${id}/holdings`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  eventSource.onmessage = async (e) => {
    const res = await e.data;
    // eslint-disable-next-line no-console
    console.log(res);
  };

  // const onAddHoldingButtonClick = () => {
  //   setIsAddHoldingDialogOpen(true);
  // };

  // TODO: Handle loading
  // if (isPortfolioDetailsLoading) {
  //   return <div>Loading</div>;
  // }

  // // TODO: Handle error
  // if (!portfolio) {
  //   return <div>Error</div>;
  // }

  // const { portfolioDetails, portfolioHoldings } = portfolio!;

  return (
    <StyledPortfolioPage>
      {/* <main style={{ display: "flex", padding: "40px 150px", gap: "32px" }}>
        <LeftPanel>
          <HoldingsPieChart data={portfolioHoldings} />
          <DividendBarChart />
          <SectorBar />
        </LeftPanel>

        <RightPanel>
          <PortfolioOverviewContainer>
            <PortfolioOverview data={portfolioDetails} />
          </PortfolioOverviewContainer>

          <PortfolioHoldingsContainer>
            <header>
              <Typography variant="h6" component="h3">
                종목 목록
              </Typography>

              <AddHoldingButton
                variant="outlined"
                startIcon={<img src={plusIcon} alt="종목 추가" />}
                onClick={onAddHoldingButtonClick}>
                <Typography variant="button" sx={{ color: "#2C2C2E" }}>
                  종목 추가
                </Typography>
              </AddHoldingButton>
            </header>

            <PortfolioHoldingsTable
              portfolioId={portfolioDetails.id}
              data={portfolioHoldings}
            />
          </PortfolioHoldingsContainer>
        </RightPanel>
      </main>

      <PortfolioHoldingAddDialog
        portfolioId={Number(id)}
        isOpen={isAddHoldingDialogOpen}
        onClose={() => setIsAddHoldingDialogOpen(false)}
      /> */}
    </StyledPortfolioPage>
  );
}

const StyledPortfolioPage = styled(BasePage)``;

// const LeftPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const RightPanel = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const PortfolioOverviewContainer = styled.div``;

// const PortfolioHoldingsContainer = styled(Box)`
//   width: 988px;
//   padding: 16px 24px 22px;
//   box-shadow: 0px 0px 12px 0px #00000014;
//   border-radius: 8px;
//   background-color: #ffffff;

//   header {
//     margin-bottom: 16px;
//     display: flex;
//     justify-content: space-between;
//   }
// `;

// const AddHoldingButton = styled(Button)`
//   border: 1px solid #8e8e93;
//   border-radius: 8px;
// `;
