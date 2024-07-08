import { AsyncBoundary } from "@components/AsyncBoundary";
import { ErrorFallbackContent } from "@components/ErrorFallbackContent";
import Header from "@components/Header/Header";
import Spinner from "@components/Spinner";
import StockDetails from "@features/stock/components/StockDetails";
import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import BasePage from "./BasePage";

export default function StockPage() {
  const { isMobile } = useResponsiveLayout();

  return (
    <>
      <Header />
      <BasePage>
        <Container $isMobile={isMobile}>
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

const Container = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: 1440px;
  height: ${({ $isMobile }) => ($isMobile ? "100%" : "796px")};
  margin-top: ${({ $isMobile }) => ($isMobile ? 0 : 48)}px;
  padding: ${({ $isMobile }) => ($isMobile ? "32px 16px" : "32px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${designSystem.color.neutral.white};
  border-radius: 8px;
`;
