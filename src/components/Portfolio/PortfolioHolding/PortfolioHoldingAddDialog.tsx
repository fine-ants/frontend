import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import { StockSearchItem } from "@api/stock";
import BaseDialog from "@components/BaseDialog";
import SearchBar from "@components/SearchBar/SearchBar";
import Button from "@components/common/Buttons/Button";
import { default as DatePicker } from "@components/common/DatePicker/DatePicker";
import { Icon } from "@components/common/Icon";
import Spinner from "@components/common/Spinner";
import { useText } from "@fineants/demolition";
import { IconButton } from "@mui/material";
import designSystem from "@styles/designSystem";
import { executeIfNumeric } from "@utils/executeIfNumeric";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PortfolioHoldingAddDialog({ isOpen, onClose }: Props) {
  const { portfolioId } = useParams();

  const {
    mutateAsync: portfolioHoldingAddMutateAsync,
    isPending: isPortfolioHoldingAddMutatePending,
  } = usePortfolioHoldingAddMutation({
    portfolioId: Number(portfolioId),
    onClose,
  });

  const [selectedStock, setSelectedStock] = useState<StockSearchItem | null>(
    null
  );

  const [newPurchaseDate, setNewPurchaseDate] = useState<Dayjs | null>(
    dayjs(new Date())
  );

  const { value: numShares, onChange: onNumSharesChange } = useText();
  const {
    value: purchasePricePerShare,
    onChange: onPurchasePricePerShareChange,
  } = useText();
  const { value: memo, onChange: onMemoChange } = useText();

  const onSelectOption = (stock: StockSearchItem) => {
    setSelectedStock(stock);
  };

  const addStockToPortfolio = async (stock: StockSearchItem) => {
    const purchaseHistory = {
      purchaseDate: newPurchaseDate
        ? newPurchaseDate.format("YYYY-MM-DDTHH:mm:ss")
        : "",
      numShares: Number(numShares),
      purchasePricePerShare: Number(purchasePricePerShare),
      memo,
    };

    const hasPurchaseHistory =
      newPurchaseDate?.toString() !== "" &&
      numShares !== "" &&
      purchasePricePerShare !== "";

    await portfolioHoldingAddMutateAsync({
      portfolioId: Number(portfolioId),
      body: {
        tickerSymbol: stock.tickerSymbol,
        purchaseHistory: hasPurchaseHistory ? purchaseHistory : undefined,
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
          disabled={isPortfolioHoldingAddMutatePending}
        />
      </SearchWrapper>

      {selectedStock && (
        <HoldingBox>
          <TitleWrapper>
            <label>{selectedStock.companyName}</label>
            <span>{selectedStock.tickerSymbol}</span>
          </TitleWrapper>
          <IconButton
            disabled={isPortfolioHoldingAddMutatePending}
            onClick={onDeleteHoldingBoxClick}>
            <Icon icon="close" size={16} color="blue200" />
          </IconButton>
        </HoldingBox>
      )}

      <InputContainer>
        <InputBox>
          <label>매입 날짜</label>
          <DatePicker
            size="big"
            disabled={isPortfolioHoldingAddMutatePending}
            value={newPurchaseDate}
            onChange={(newVal) => setNewPurchaseDate(newVal)}
          />
        </InputBox>

        <InputBox>
          <label>매입가</label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="매입가를 입력하세요"
              disabled={isPortfolioHoldingAddMutatePending}
              value={purchasePricePerShare}
              onChange={(e) =>
                executeIfNumeric(
                  e.target.value.trim(),
                  onPurchasePricePerShareChange
                )
              }
            />
            <div>₩</div>
          </InputWrapper>
        </InputBox>

        <InputBox>
          <label>매입 개수</label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="매입 개수를 입력하세요"
              disabled={isPortfolioHoldingAddMutatePending}
              value={numShares}
              onChange={(e) =>
                executeIfNumeric(e.target.value.trim(), onNumSharesChange)
              }
            />
          </InputWrapper>
        </InputBox>

        <InputBox>
          <label>메모</label>
          <InputTextArea
            placeholder="메모를 입력하세요"
            disabled={isPortfolioHoldingAddMutatePending}
            value={memo}
            onChange={(e) => onMemoChange(e.target.value.trim())}
          />
        </InputBox>
      </InputContainer>

      <Button
        variant="primary"
        size="h32"
        style={{ marginLeft: "auto" }}
        disabled={!selectedStock || isPortfolioHoldingAddMutatePending}
        onClick={onAddButtonClick}>
        {isPortfolioHoldingAddMutatePending ? (
          <Spinner size={15} color={designSystem.color.neutral.white} />
        ) : (
          "추가"
        )}
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
  font: ${designSystem.font.heading3.font};
  letter-spacing: ${designSystem.font.heading3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};

  > div {
    color: ${designSystem.color.neutral.gray800};

    > span {
      color: ${designSystem.color.state.red500};
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
  background-color: ${designSystem.color.neutral.gray50};
  border: 1px solid ${designSystem.color.primary.blue50};
  border-radius: 8px;
  font: ${designSystem.font.title5.font};
  letter-spacing: ${designSystem.font.title5.letterSpacing};
  color: ${designSystem.color.primary.blue500};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  > span {
    font: ${designSystem.font.body4.font};
    color: ${designSystem.color.neutral.gray400};
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
    width: 120px;
    height: 24px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;

const InputWrapper = styled.div`
  height: 32px;
  padding: 4px 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  box-sizing: border-box;
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 3px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray400};

  &:hover,
  &:focus-within {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;

const InputTextArea = styled.textarea`
  height: 54px;
  padding: 4px 8px;
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 3px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray400};

  &&::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }

  &:hover,
  &:focus {
    border: 1px solid ${designSystem.color.primary.blue500};
  }
`;

const Input = styled.input`
  height: 100%;
  flex: 1;
  border: none;
  outline: none;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray800};

  &&::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }
`;
