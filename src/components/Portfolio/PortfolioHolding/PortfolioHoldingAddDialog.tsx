import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import { StockSearchItem } from "@api/stock";
import BaseDialog from "@components/BaseDialog";
import SearchBar from "@components/SearchBar/SearchBar";
import Button from "@components/common/Buttons/Button";
import BigDatePicker from "@components/common/DatePicker/BigDatePicker";
import { Icon } from "@components/common/Icon";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddDialog({ isOpen, onClose }: Props) {
  const { portfolioId } = useParams();

  const { mutate: portfolioHoldingAddMutate } = usePortfolioHoldingAddMutation({
    portfolioId: Number(portfolioId),
    onClose,
  });

  const [selectedStock, setSelectedStock] = useState<StockSearchItem | null>(
    null
  );

  const [newPurchaseDate, setNewPurchaseDate] = useState<Date | null>(null);

  const onSelectOption = (stock: StockSearchItem) => {
    setSelectedStock(stock);
  };

  const addStockToPortfolio = (stock: StockSearchItem) => {
    portfolioHoldingAddMutate({
      portfolioId: Number(portfolioId),
      body: {
        tickerSymbol: stock.tickerSymbol,
      },
    });
    setSelectedStock(null);
  };

  const onAddButtonClick = () => {
    if (!selectedStock) return;
    addStockToPortfolio(selectedStock);
  };

  const onDialogClose = () => {
    onClose();
    setSelectedStock(null);
  };

  const onDeleteHoldingBoxClick = () => {
    setSelectedStock(null);
  };

  return (
    <BaseDialog
      style={portfolioHoldingAddDialogStyle}
      isOpen={isOpen}
      onClose={onDialogClose}>
      <Header>
        <Title>종목 추가</Title>
        <IconButton onClick={onDialogClose}>
          <Icon icon="close" size={24} color="gray600" />
        </IconButton>
      </Header>

      <SearchWrapper>
        <div>
          종목 검색 <span>*</span>
        </div>
        <SearchBar
          variant="select"
          sx={{ width: "480px" }}
          onSelectOption={onSelectOption}
        />
      </SearchWrapper>

      {selectedStock && (
        <HoldingBox>
          <TitleWrapper>
            <label>{selectedStock.companyName}</label>
            <span>{selectedStock.tickerSymbol}</span>
          </TitleWrapper>
          <IconButton onClick={onDeleteHoldingBoxClick}>
            <Icon icon="close" size={16} color="blue200" />
          </IconButton>
        </HoldingBox>
      )}

      <InputContainer>
        <InputBox>
          <label>매입 날짜</label>
          <BigDatePicker
            value={newPurchaseDate}
            onChange={(newVal) => setNewPurchaseDate(newVal)}
          />
        </InputBox>

        <InputBox>
          <label>매입가</label>
          <InputWrapper>
            <Input type="text" placeholder="매입가를 입력하세요" />
            <div>₩</div>
          </InputWrapper>
        </InputBox>

        <InputBox>
          <label>매입 개수</label>
          <InputWrapper>
            <Input type="text" placeholder="매입 개수를 입력하세요" />
          </InputWrapper>
        </InputBox>

        <InputBox>
          <label>메모</label>
          <InputTextArea placeholder="메모를 입력하세요" />
        </InputBox>
      </InputContainer>

      <Button
        variant="primary"
        size="h32"
        style={{ marginLeft: "auto" }}
        disabled={!selectedStock}
        onClick={onAddButtonClick}>
        추가
      </Button>
    </BaseDialog>
  );
}

const portfolioHoldingAddDialogStyle = {
  width: "544px",
  height: "auto",
  padding: "32px",
};

const Header = styled.header`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font: ${({ theme: { font } }) => font.heading3};
  color: ${({ theme: { color } }) => color.neutral.gray800};
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font: ${({ theme: { font } }) => font.title5};

  > div {
    color: ${({ theme: { color } }) => color.neutral.gray800};

    > span {
      color: ${({ theme: { color } }) => color.state.red};
    }
  }
`;

const HoldingBox = styled.div`
  width: 100%;
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
  border: 1px solid ${({ theme: { color } }) => color.primary.blue50};
  border-radius: 8px;
  font: ${({ theme: { font } }) => font.title5};
  color: ${({ theme: { color } }) => color.primary.blue500};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  > span {
    color: ${({ theme: { color } }) => color.neutral.gray400};
    font: ${({ theme: { font } }) => font.body4};
  }
`;

const InputContainer = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputBox = styled.div`
  display: flex;
  gap: 8px;

  > label {
    margin-top: 4px;
    display: flex;
    align-items: center;
    width: 120px;
    height: 24px;
    font: ${({ theme: { font } }) => font.title5};
    color: ${({ theme: { color } }) => color.neutral.gray800};
  }
`;

const InputWrapper = styled.div`
  height: 32px;
  padding: 4px 8px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  border-radius: 3px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray400};
`;

const InputTextArea = styled.textarea`
  height: 54px;
  padding: 4px 8px;
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  border-radius: 3px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray400};

  &&::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  }
`;

const Input = styled.input`
  height: 100%;
  flex: 1;
  border: none;
  outline: none;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray800};

  &&::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;
