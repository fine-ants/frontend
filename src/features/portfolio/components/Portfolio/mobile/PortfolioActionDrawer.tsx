import ConfirmAlert from "@components/ConfirmAlert";
import BottomDrawer from "@components/Drawer/BottomDrawer";
import { Icon } from "@components/Icon";
import { useBoolean } from "@fineants/demolition";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import usePortfolioDeleteMutation from "../../../api/queries/usePortfolioDeleteMutation";
import usePortfolioDetailsQuery from "../../../api/queries/usePortfolioDetailsQuery";
import PortfolioAddOrEditDialog from "../../PortfolioAddOrEditDialog/PortfolioAddOrEditDialog";

type Props = {
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
};

export default function PortfolioActionDrawer({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
}: Props) {
  const { portfolioId } = useParams();
  const navigate = useNavigate();

  const {
    data: { portfolioDetails },
  } = usePortfolioDetailsQuery(Number(portfolioId));
  const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation();

  const {
    state: isDialogOpen,
    setTrue: onDialogOpen,
    setFalse: onDialogClose,
  } = useBoolean();
  const {
    state: isConfirmOpen,
    setTrue: onConfirmAlertOpen,
    setFalse: onConfirmAlertClose,
  } = useBoolean();

  const onConfirmAction = () => {
    portfolioDeleteMutate(Number(portfolioId));
    navigate(Routes.PORTFOLIOS);
  };

  return (
    <>
      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        onOpenDrawer={onDrawerOpen}
        onCloseDrawer={onDrawerClose}>
        <ul>
          <ContentItem>
            <ContentItemButton
              onClick={() => {
                onDrawerClose();
                onDialogOpen();
              }}>
              <ContentWrapper>
                <Icon icon="edit" size={16} color="gray400" />
                <ItemTitle>편집</ItemTitle>
              </ContentWrapper>
            </ContentItemButton>
          </ContentItem>
          <ContentItem>
            <ContentItemButton
              onClick={() => {
                onDrawerClose();
                onConfirmAlertOpen();
              }}>
              <ContentWrapper>
                <Icon icon="trash" size={16} color="gray400" />
                <ItemTitle>삭제</ItemTitle>
              </ContentWrapper>
            </ContentItemButton>
          </ContentItem>
        </ul>
      </BottomDrawer>

      {isDialogOpen && (
        <PortfolioAddOrEditDialog
          isOpen={isDialogOpen}
          onClose={onDialogClose}
          portfolioDetails={portfolioDetails}
        />
      )}
      {isConfirmOpen && (
        <ConfirmAlert
          isOpen={isConfirmOpen}
          title="포트폴리오 삭제"
          onClose={onConfirmAlertClose}
          onConfirm={onConfirmAction}>
          <p>'{portfolioDetails.name}' 포트폴리오를 삭제하시겠습니까?</p>
        </ConfirmAlert>
      )}
    </>
  );
}

const ContentItem = styled.li`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 16px;

  &:active {
    background-color: ${designSystem.color.neutral.gray50};
  }
`;

const ContentItemButton = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: ${designSystem.font.title4.font};
  letter-spacing: ${designSystem.font.title4.letterSpacing};
`;

const ItemTitle = styled.span`
  color: ${designSystem.color.neutral.gray800};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
