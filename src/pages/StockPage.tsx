import { AsyncBoundary } from "@components/AsyncBoundary";
import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import Header from "@components/Header/Header";
import Spinner from "@components/Spinner";
import StockDetails from "@features/stock/components/StockDetails";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function StockPage() {
  return (
    <>
      <Header />
      <BasePage>
        <Container>
          <AsyncBoundary
            ErrorFallback={ErrorFallbackContent}
            SuspenseFallback={
              <Spinner
                size={85}
                sx={{ color: designSystem.color.primary.blue500 }}
              />
            }>
            <StockDetails />
          </AsyncBoundary>
        </Container>
      </BasePage>
    </>
  );
}

const Container = styled.div`
  width: 1440px;
  height: 796px;
  margin-top: 48px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${designSystem.color.neutral.white};
`;
