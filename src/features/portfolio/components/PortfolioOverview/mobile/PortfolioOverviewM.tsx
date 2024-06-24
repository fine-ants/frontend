import Button from "@components/Buttons/Button";
import { Icon } from "@components/Icon";
import { PortfolioDetails } from "@features/portfolio/api/types";
import { useBoolean } from "@fineants/demolition";
import styled from "styled-components";
import PortfolioHoldingAddDialog from "../../PortfolioHolding/desktop/PortfolioHoldingAddDialog";
import PortfolioOverviewBodyM from "./PortfolioOverviewBodyM";

type Props = {
  data: PortfolioDetails;
};

export default function PortfolioOverviewM({ data }: Props) {
  // const navigate = useNavigate();
  // const { portfolioId } = useParams();
  // const { mutate: portfolioDeleteMutate } = usePortfolioDeleteMutation();

  // const {
  //   state: isDialogOpen,
  //   setTrue: onPortfolioEdit,
  //   setFalse: onDialogClose,
  // } = useBoolean();
  // const {
  //   state: isConfirmOpen,
  //   setTrue: onPortfolioRemove,
  //   setFalse: onConfirmAlertClose,
  // } = useBoolean();

  // const onConfirmAction = () => {
  //   portfolioDeleteMutate(Number(portfolioId));
  //   navigate(Routes.PORTFOLIOS);
  // };

  const {
    state: isAddHoldingDialogOpen,
    setTrue: onDialogOpen,
    setFalse: onDialogClose,
  } = useBoolean();

  return (
    <>
      <PortfolioOverviewBodyM data={data} />

      <ButtonWrapper>
        <Button variant="primary" size="h40" onClick={onDialogOpen}>
          <Icon icon="add" size={16} color="white" />
          <span>종목 추가</span>
        </Button>
      </ButtonWrapper>

      {isAddHoldingDialogOpen && (
        <PortfolioHoldingAddDialog
          isOpen={isAddHoldingDialogOpen}
          onClose={onDialogClose}
        />
      )}
    </>
  );
}

// const TitleWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 0 16px;
// `;

// const FirmImage = styled.img`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   overflow: hidden;
// `;

// const Title = styled.span`
//   font: ${designSystem.font.heading4.font};
//   letter-spacing: ${designSystem.font.heading4.letterSpacing};
//   color: ${designSystem.color.neutral.gray900};
// `;

// const Tabs = styled.ul`
//   width: 100%;
//   height: 48px;
//   display: flex;
//   align-items: center;
// `;

// const TabItem = styled.li<{ $isActive: boolean }>`
//   width: 50%;
//   height: 100%;
//   margin-bottom: -2px;
//   font: ${designSystem.font.title4.font};
//   letter-spacing: ${designSystem.font.title4.letterSpacing};
//   color: ${designSystem.color.neutral.gray600};
//   border-bottom: ${({ $isActive }) =>
//     $isActive ? `2px solid ${designSystem.color.primary.blue500}` : "0px"};

//   > button {
//     width: 100%;
//     height: 100%;
//     display: block;
//     text-align: center;
//     line-height: 40px;
//     color: ${({ $isActive }) =>
//       $isActive
//         ? designSystem.color.primary.blue500
//         : designSystem.color.neutral.gray600};
//   }
// `;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: right;
  padding: 16px 16px 24px;
`;
