import useResponsiveLayout from "@hooks/useResponsiveLayout";
import PortfolioHoldingAddDialogD from "./desktop/PortfolioHoldingAddDialogD";
import PortfolioHoldingAddDialogM from "./mobile/PortfolioHoldingAddDialogM";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddDialog(props: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <PortfolioHoldingAddDialogD {...props} />}
      {isMobile && <PortfolioHoldingAddDialogM {...props} />}
    </>
  );
}
