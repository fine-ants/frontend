import AsyncButton from "@components/Buttons/AsyncButton";
import { IconButton } from "@components/Buttons/IconButton";
import DatePicker from "@components/DatePicker";
import { Icon } from "@components/Icon";
import SlideUpTransition from "@components/SlideUpTransition";
import usePortfolioHoldingAddMutation from "@features/portfolio/api/queries/usePortfolioHoldingAddMutation";
import { StockSearchItem } from "@features/stock/api";
import {
  executeCbIfNumeric,
  removeThousandsDelimiter,
  useBoolean,
  useText,
} from "@fineants/demolition";
import { Dialog } from "@mui/material";
import designSystem from "@styles/designSystem";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEvent, FormEvent, memo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PortfolioHoldingSearchDrawerM from "./PortfolioHoldingSearchDrawerM";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default memo(function PortfolioHoldingAddDialogM({
  isOpen,
  onClose,
}: Props) {
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

  const {
    state: isDrawerOpen,
    setTrue: onDrawerOpen,
    setFalse: onDrawerClose,
  } = useBoolean();

  const {
    value: purchasePricePerShare,
    onChange: onPurchasePricePerShareChange,
  } = useText();
  const purchasePricePerShareHandler = (e: ChangeEvent<HTMLInputElement>) => {
    executeCbIfNumeric({
      value: e.target.value.trim(),
      callback: onPurchasePricePerShareChange,
    });
  };

  const { value: numShares, onChange: onNumSharesChange } = useText();
  const numSharesHandler = (e: ChangeEvent<HTMLInputElement>) => {
    executeCbIfNumeric({
      value: e.target.value.trim(),
      callback: onNumSharesChange,
    });
  };

  const { value: memo, onChange: onMemoChange } = useText();

  const onSelectOption = (stock: StockSearchItem) => {
    setSelectedStock(stock);
  };

  const addStockToPortfolio = async (stock: StockSearchItem) => {
    const purchaseHistory = {
      purchaseDate: newPurchaseDate
        ? newPurchaseDate.format("YYYY-MM-DDTHH:mm:ss")
        : "",
      numShares: Number(removeThousandsDelimiter(numShares)),
      purchasePricePerShare: Number(
        removeThousandsDelimiter(purchasePricePerShare)
      ),
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
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
    <>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onDialogClose}
        TransitionComponent={SlideUpTransition}>
        <HeaderWrapper>
          <IconButton
            icon="close"
            size="h40"
            iconColor="custom"
            customColor={{ color: "gray800", hoverColor: "gray50" }}
            onClick={onDialogClose}
          />
          <Header>종목 추가</Header>
        </HeaderWrapper>

        <ContentWrapper>
          <SearchWrapper>
            <div>
              종목 검색 <span>*</span>
            </div>
            <SearchButton onClick={onDrawerOpen}>
              <Icon icon="search" size={16} color={"gray600"} />
              종목을 검색하세요
            </SearchButton>
          </SearchWrapper>

          <Form onSubmit={onSubmit}>
            {selectedStock && (
              <HoldingBox>
                <TitleWrapper>
                  <label>{selectedStock.companyName}</label>
                  <span>{selectedStock.tickerSymbol}</span>
                </TitleWrapper>
                <IconButton
                  icon="close"
                  size="h24"
                  iconColor="custom"
                  customColor={{
                    color: "blue200",
                    hoverColor: "blue50",
                  }}
                  disabled={isPortfolioHoldingAddMutatePending}
                  onClick={onDeleteHoldingBoxClick}
                />
              </HoldingBox>
            )}

            <InputContainer>
              <InputBox>
                <label>매입 날짜</label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <DatePicker
                    size="big"
                    disabled={isPortfolioHoldingAddMutatePending}
                    value={newPurchaseDate}
                    onChange={(newVal) => setNewPurchaseDate(newVal)}
                  />
                </div>
              </InputBox>

              <InputBox>
                <label>매입가</label>
                <InputWrapper>
                  <Input
                    type="text"
                    placeholder="매입가를 입력하세요"
                    disabled={isPortfolioHoldingAddMutatePending}
                    value={purchasePricePerShare}
                    onChange={purchasePricePerShareHandler}
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
                    onChange={numSharesHandler}
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

            <AsyncButton
              variant="primary"
              size="h48"
              style={{ width: "100%", marginLeft: "auto" }}
              type="submit"
              disabled={!selectedStock || isPortfolioHoldingAddMutatePending}
              isPending={isPortfolioHoldingAddMutatePending}>
              추가
            </AsyncButton>
          </Form>
        </ContentWrapper>
      </Dialog>
      <PortfolioHoldingSearchDrawerM
        isDrawerOpen={isDrawerOpen}
        onDrawerOpen={onDrawerOpen}
        onDrawerClose={onDrawerClose}
        onSelectOption={onSelectOption}
      />
    </>
  );
});

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 16px;
`;

const Header = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font: ${designSystem.font.title3.font};
  letter-spacing: ${designSystem.font.title3.letterSpacing};
  color: ${designSystem.color.neutral.gray800};
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 32px;
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

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 4px;
  padding: 0 16px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray400};
`;

const Form = styled.form`
  width: 100%;
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
  gap: 34px;
`;

const InputBox = styled.div`
  > label {
    display: block;
    width: 120px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    font: ${designSystem.font.title5.font};
    letter-spacing: ${designSystem.font.title5.letterSpacing};
    color: ${designSystem.color.neutral.gray800};
  }
`;

const InputWrapper = styled.div`
  height: 48px;
  padding: 0 8px;
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
  width: 100%;
  height: 96px;
  padding: 12px;
  flex: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid ${designSystem.color.neutral.gray200};
  border-radius: 3px;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray800};

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
  box-sizing: border-box;
  flex: 1;
  border: none;
  outline: none;
  font: ${designSystem.font.body3.font};
  color: ${designSystem.color.neutral.gray800};

  &&::placeholder {
    color: ${designSystem.color.neutral.gray400};
  }
`;
