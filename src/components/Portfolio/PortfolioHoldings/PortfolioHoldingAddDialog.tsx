import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import { StockSearchItem } from "@api/stock";
import BaseDialog from "@components/BaseDialog";
import SearchBar from "@components/SearchBar/SearchBar";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { IconCalendar } from "./IconCalendar";

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
        {/* TODO: fix size */}
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
          <ThemeProvider theme={muiTheme}>
            <DatePicker
              value={newPurchaseDate}
              onChange={(newVal) => setNewPurchaseDate(newVal)}
              format="YYYY-MM-DD"
              slotProps={{
                textField: { placeholder: "매입 날짜" },
              }}
              slots={{
                openPickerIcon: IconCalendar,
              }}
            />
          </ThemeProvider>
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
  font: ${({ theme: { font } }) => font.heading3.font};
  letter-spacing: ${({ theme: { font } }) => font.heading3.letterSpacing};
  color: ${({ theme: { color } }) => color.neutral.gray800};
`;

const SearchWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font: ${({ theme: { font } }) => font.title5.font};
  letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};

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
  font: ${({ theme: { font } }) => font.title5.font};
  letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
  color: ${({ theme: { color } }) => color.primary.blue500};
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  > span {
    color: ${({ theme: { color } }) => color.neutral.gray400};
    font: ${({ theme: { font } }) => font.body4.font};
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
    font: ${({ theme: { font } }) => font.title5.font};
    letter-spacing: ${({ theme: { font } }) => font.title5.letterSpacing};
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
  font: ${({ theme: { font } }) => font.body3.font};
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
  font: ${({ theme: { font } }) => font.body3.font};
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
  font: ${({ theme: { font } }) => font.body3.font};
  color: ${({ theme: { color } }) => color.neutral.gray800};

  &&::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }
`;

const muiTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "352px",
          height: "32px",
          border: "none",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          width: "24px",
          height: "100%",
          margin: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: "0",
          margin: "0",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "100%",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          width: "87px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "display": "flex",
          "padding": "4px 8px",
          "justifyContent": "center",
          "width": "352px",
          "height": "32px",
          "font": designSystem.font.body3.font,
          "color": designSystem.color.neutral.gray400,
          "borderColor": designSystem.color.neutral.gray100,
          "backgroundColor": designSystem.color.neutral.white,
          "&:focus": {
            borderColor: designSystem.color.primary.blue500,
          },
          "&:hover": {
            borderColor: designSystem.color.neutral.gray100,
          },
        },
        input: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
        input: {
          "width": "304px",
          "height": "21px",
          "padding": "0 0 0 0",
          "font": designSystem.font.body3.font,
          "color": designSystem.color.neutral.gray900,
          "::placeholder": {
            color: designSystem.color.neutral.gray700,
          },
        },
      },
    },
  },
});
