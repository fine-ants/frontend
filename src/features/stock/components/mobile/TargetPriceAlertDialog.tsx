import { AsyncBoundary } from "@components/AsyncBoundary";
import BaseDialog from "@components/BaseDialog";
import { IconButton } from "@components/Buttons/IconButton";
import SlideUpTransition from "@components/SlideUpTransition";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import styled from "styled-components";
import TargetPriceForm from "../TargetPriceForm";
import TargetPricesList from "../TargetPricesList/TargetPricesList";
import TargetPricesListErrorFallback from "../TargetPricesList/errorFallback/TargetPricesListErrorFallback";
import TargetPricesListSkeleton from "../TargetPricesList/skeleton/TargetPricesListSkeleton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TargetPriceAlertDialog({ isOpen, onClose }: Props) {
  return (
    <BaseDialog
      fullScreen
      isOpen={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}>
      <Header>
        <Title>알림 설정</Title>
        <IconButton
          icon="close"
          size="h40"
          iconColor="gray"
          onClick={onClose}
        />
      </Header>

      <Body>
        <TargetPriceForm />

        <Divider />

        <TargetPricesListContainer>
          <TargetPricesListTitle>추가된 알림</TargetPricesListTitle>

          <AsyncBoundary
            SuspenseFallback={<TargetPricesListSkeleton />}
            ErrorFallback={TargetPricesListErrorFallback}>
            <TargetPricesList />
          </AsyncBoundary>
        </TargetPricesListContainer>
      </Body>
    </BaseDialog>
  );
}

const Header = styled.div`
  width: 100%;
  height: 56px;
  margin-bottom: 16px;
  padding-inline: 8px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const Body = styled.div`
  width: 100%;
  padding-inline: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TargetPricesListContainer = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const TargetPricesListTitle = styled.div`
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.neutral.gray600};
`;
