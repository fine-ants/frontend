import useResponsiveLayout from "@hooks/useResponsiveLayout";
import designSystem from "@styles/designSystem";
import { ReactElement } from "react";
import PullToRefreshLib from "react-simple-pull-to-refresh";
import styled from "styled-components";
import Spinner from "./Spinner";

type Props = {
  children: ReactElement;
};

export default function PullToRefresh({ children }: Props) {
  const { isMobile } = useResponsiveLayout();

  const isStandalonePWA = window.matchMedia(
    "(display-mode: standalone)"
  ).matches;

  const onRefresh = async () => {
    window.location.reload();
  };

  return isStandalonePWA ? (
    <PullToRefreshLib
      backgroundColor={designSystem.color.neutral.gray900}
      resistance={isMobile ? 1 : 3}
      onRefresh={onRefresh}
      pullingContent={""}
      refreshingContent={
        <SpinnerWrapper>
          <Spinner color={designSystem.color.neutral.gray500} />
        </SpinnerWrapper>
      }>
      {children}
    </PullToRefreshLib>
  ) : (
    children
  );
}

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 95px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
`;
