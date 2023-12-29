import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import BaseDialog from "@components/BaseDialog";
import SearchBar, { StockInfo } from "@components/SearchBar/SearchBar";
import Button from "@components/common/Buttons/Button";
import Icon from "@components/common/Icon";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";

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

  const [currentStock, setCurrentStock] = useState<StockInfo>({
    companyName: "",
    tickerSymbol: "",
  });

  const addStockToPortfolio = (tickerSymbol: string) => {
    portfolioHoldingAddMutate({
      portfolioId,
      body: {
        tickerSymbol,
      },
    });
    setCurrentStock({
      companyName: "",
      tickerSymbol: "",
    });
  };

  const addStockToDialog = (currentStock: StockInfo) => {
    setCurrentStock(currentStock);
  };

  const onDialogClose = () => {
    onClose();
    setCurrentStock({
      companyName: "",
      tickerSymbol: "",
    });
  };
  const onDeleteHoldingBoxClick = () => {
    setCurrentStock({
      companyName: "",
      tickerSymbol: "",
    });
  };

  return (
    <BaseDialog
      style={{ width: "544px", height: "547px", padding: "32px" }}
      isOpen={isOpen}
      onClose={onDialogClose}>
      <Title>종목 추가</Title>

      <SearchWrapper>
        <div>
          종목 검색 <span>*</span>
        </div>
        <SearchBar onItemClick={addStockToDialog} />
      </SearchWrapper>

      {currentStock.companyName && (
        <HoldingBox>
          <TitleWrapper>
            <label>{currentStock.companyName}</label>
            <span>{currentStock.tickerSymbol}</span>
          </TitleWrapper>
          <Icon
            onClick={onDeleteHoldingBoxClick}
            icon="close"
            size={16}
            color={designSystem.color.primary.blue200}
          />
        </HoldingBox>
      )}

      <InputContainer>
        <InputBox>
          <label>매입 날짜</label>
          <InputWrapper>
            <Input type="text" placeholder="매입 날짜 선택" />
            <Icon icon="calendar" size={16} color="white" />
          </InputWrapper>
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
        style={{ marginLeft: "auto" }}
        disabled={!currentStock.companyName}
        variant="primary"
        size="h32"
        onClick={() => addStockToPortfolio(currentStock.tickerSymbol)}>
        추가
      </Button>
    </BaseDialog>
  );
}

const Title = styled.div`
  font: ${({ theme: { font } }) => font.heading3};
  color: ${({ theme: { color } }) => color.neutral.gray800};
  margin-bottom: 32px;
`;

const SearchWrapper = styled.div`
  font: ${({ theme: { font } }) => font.title5};
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
  > div {
    color: ${({ theme: { color } }) => color.neutral.gray800};

    > span {
      color: ${({ theme: { color } }) => color.state.red};
    }
  }
`;

const HoldingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 480px;
  height: 64px;
  color: ${({ theme: { color } }) => color.primary.blue500};
  width: 100%;

  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme: { color } }) => color.primary.blue50};
  background-color: ${({ theme: { color } }) => color.neutral.gray50};
  font: ${({ theme: { font } }) => font.title5};
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
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 32px;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  border-radius: 3px;
  padding: 4px 8px;

  display: flex;
  align-items: center;
  color: ${({ theme: { color } }) => color.neutral.gray400};
  font: ${({ theme: { font } }) => font.body3};
`;

const InputTextArea = styled.textarea`
  flex: 1;
  height: 54px;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  border-radius: 3px;
  padding: 4px 8px;

  display: flex;
  align-items: center;
  color: ${({ theme: { color } }) => color.neutral.gray400};
  font: ${({ theme: { font } }) => font.body3};

  &&::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  color: ${({ theme: { color } }) => color.neutral.gray800};
  font: ${({ theme: { font } }) => font.body3};

  &&::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;
