import useResponsiveLayout from "@hooks/useResponsiveLayout";
import WatchlistNameEditDialogD from "./desktop/WatchlistNameEditDialogD";
import WatchlistNameEditDialogM from "./mobile/WatchlistNameEditDialogM";

type Props = {
  currentWatchlistName: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function WatchlistNameEditDialog(props: Props) {
  const { isDesktop, isMobile } = useResponsiveLayout();

  return (
    <>
      {isDesktop && <WatchlistNameEditDialogD {...props} />}
      {isMobile && <WatchlistNameEditDialogM {...props} />}
    </>
  );
}
