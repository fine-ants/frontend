import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import BaseModal from "@components/BaseModal";
import SearchBar from "@components/SearchBar/SearchBar";

type Props = {
  portfolioId: number;
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddModal({
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
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <>
        <SearchBar>
          <SearchBar.Input />
          <SearchBar.SearchList onItemClick={addStockToPortfolio} />
        </SearchBar>
      </>
    </BaseModal>
  );
}
