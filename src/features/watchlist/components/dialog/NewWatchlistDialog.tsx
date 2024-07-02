import useResponsiveLayout from "@hooks/useResponsiveLayout";
import NewWatchlistDialogD from "./desktop/NewWatchlistDialogD";
import NewWatchlistDialogM from "./mobile/NewWatchlistDialogM";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function NewWatchlistDialog(props: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <NewWatchlistDialogD {...props} />}
      {isMobile && <NewWatchlistDialogM {...props} />}
    </>
  );
}
