import { IconButton } from "@components/Buttons/IconButton";
import { CardItemRow } from "@components/CardTable/CardItemRow";
import { PurchaseHistory } from "@features/portfolio/api/types";
import { thousandsDelimiter } from "@fineants/demolition";
import designSystem from "@styles/designSystem";
import { formatDate } from "@utils/date";
import styled from "styled-components";

type Props = {
  lot: PurchaseHistory;
  onEdit: () => void;
  onDeleteConfirmAlertOpen: () => void;
};

export default function PortfolioHoldingLots({
  lot: { purchaseDate, purchasePricePerShare, numShares, memo },
  onEdit,
  onDeleteConfirmAlertOpen,
}: Props) {
  return (
    <>
      <CardItemRow title="">
        <ButtonWrapper>
          <IconButton
            icon="edit"
            size="h32"
            iconColor="gray"
            onClick={onEdit}
          />
          <IconButton
            icon="trash"
            size="h32"
            iconColor="gray"
            onClick={onDeleteConfirmAlertOpen}
          />
        </ButtonWrapper>
      </CardItemRow>
      <CardItemRow title="매입 날짜">
        <Content>{formatDate(purchaseDate)}</Content>
      </CardItemRow>
      <CardItemRow title="매입가">
        <Content>₩{thousandsDelimiter(purchasePricePerShare)}</Content>
      </CardItemRow>
      <CardItemRow title="개수">
        <Content>{thousandsDelimiter(numShares)}</Content>
      </CardItemRow>
      <CardItemRow title="메모">
        <Content>{memo}</Content>
      </CardItemRow>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

const Content = styled.div`
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray900};
`;
