import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import BaseDialog from "@components/BaseDialog";
import SearchBar from "@components/SearchBar/SearchBar";

type Props = {
  portfolioId: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddDialog({
  portfolioId,
  isOpen,
  onClose,
}: Props) {
  const { mutate: portfolioHoldingAddMutate } = usePortfolioHoldingAddMutation({
    portfolioId,
    onClose,
  });

  const addStockToPortfolio = (tickerSymbol: string) => {
    portfolioHoldingAddMutate({
      portfolioId,
      body: {
        tickerSymbol,
      },
    });
  };

  return (
    <BaseDialog isOpen={isOpen} onClose={onClose}>
      <SearchBar onItemClick={addStockToPortfolio} />
    </BaseDialog>
  );
}
