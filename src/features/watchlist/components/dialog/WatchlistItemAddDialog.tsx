import useResponsiveLayout from "@hooks/useResponsiveLayout";
import WatchlistItemAddDialogD from "./desktop/WatchlistItemAddDialogD";
import WatchlistItemAddDialogM from "./mobile/WatchlistItemAddDialogM";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistItemAddDialog(props: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <WatchlistItemAddDialogD {...props} />}
      {isMobile && <WatchlistItemAddDialogM {...props} />}
    </>
  );
}
