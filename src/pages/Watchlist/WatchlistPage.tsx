import ConfirmAlert from "@components/ConfirmAlert";
import WatchlistTable from "@components/Watchlist/WatchlistTable/WatchlistTable";
import WatchlistTableErrorFallback from "@components/Watchlist/errorFallback/WatchlistTableErrorFallback";
import WatchlistTableSkeleton from "@components/Watchlist/skeletons/WatchlistTableSkeleton";
import { AsyncBoundary } from "@components/common/AsyncBoundary";
import Breadcrumb from "@components/common/Breadcrumb";
import Button from "@components/common/Buttons/Button";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BasePage from "../BasePage";

export default function WatchlistPage() {
  const { watchlisdId } = useParams();

  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const onPortfolioEdit = () => {
    // setIsDialogOpen(true);
  };

  const onPortfolioRemove = () => {
    setIsConfirmOpen(true);
  };

  // const onDialogClose = () => {
  //   setIsDialogOpen(false);
  // };

  const onConfirmAlertClose = () => {
    setIsConfirmOpen(false);
  };

  const onConfirmAction = () => {
    // portfolioDeleteMutate(Number(portfolioId));
  };

  return (
    <BasePage>
      {/* {isDialogOpen && (
        <WatchlistItemEditDialog
          isOpen={isDialogOpen}
          onClose={onDialogClose}
          portfolioDetails={data}
        />
      )} */}
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="관심종목 목록을 삭제 하시겠습니까?"
          onClose={onConfirmAlertClose}
          onConfirm={onConfirmAction}
        />
      )}
      <Container>
        <TitleContainer>
          <Breadcrumb
            depthData={[
              { name: "전체 관심 종목 리스트", url: "/watchlists" },
              {
                name: "와치리스트id에 맞는",
                url: `/watchlists/${watchlisdId}`,
              },
            ]}
          />
          <TitleContent>
            <Header>
              <h1>My Watchlist 1</h1>
            </Header>
            <ButtonWrapper>
              <Button
                variant="tertiary"
                size="h32"
                onClick={onPortfolioRemove}
                disabled={false}>
                삭제
              </Button>
              <Button
                variant="secondary"
                size="h32"
                onClick={onPortfolioEdit}
                disabled={false}>
                이름 편집
              </Button>
            </ButtonWrapper>
          </TitleContent>
        </TitleContainer>
        <AsyncBoundary
          ErrorFallback={WatchlistTableErrorFallback}
          SuspenseFallback={<WatchlistTableSkeleton />}>
          <WatchlistTable />
        </AsyncBoundary>
      </Container>
    </BasePage>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 796px;
  margin-top: 48px;
  padding: 32px;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border-radius: 8px;
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;

  h1 {
    font: ${({ theme: { font } }) => font.heading2.font};
    letter-spacing: ${({ theme: { font } }) => font.heading2.letterSpacing};
    color: ${({ theme: { color } }) => color.neutral.gray900};
  }
`;

const TitleContainer = styled.div`
  height: 73px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
`;

const TitleContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
