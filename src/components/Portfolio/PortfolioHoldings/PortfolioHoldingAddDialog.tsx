import usePortfolioHoldingAddMutation from "@api/portfolio/queries/usePortfolioHoldingAddMutation";
import BaseDialog from "@components/BaseDialog";
import SearchBar, { StockInfo } from "@components/SearchBar/SearchBar";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { IconButton, ThemeProvider, createTheme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import { IconCalendar } from "./IconCalendar";

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
  const [newPurchaseDate, setNewPurchaseDate] = useState<Date | null>(null);
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

  const PortfolioHoldingAddDialogStyle = {
    width: "544px",
    height: currentStock.companyName !== "" ? "547px" : "467px",
    padding: "32px",
  };

  return (
    <BaseDialog
      style={PortfolioHoldingAddDialogStyle}
      isOpen={isOpen}
      onClose={onDialogClose}>
      <HeaderWrapper>
        <Header>종목 추가</Header>
        <Button size="h32" variant="tertiary" onClick={onDialogClose}>
          <Icon size={24} icon="close" color={"gray600"} />
        </Button>
      </HeaderWrapper>
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
          <IconButton onClick={onDeleteHoldingBoxClick}>
            <Icon icon="close" size={16} color={"blue200"} />
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

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Header = styled.div`
  font: ${({ theme: { font } }) => font.heading3};
  color: ${({ theme: { color } }) => color.neutral.gray800};
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

  &:focus-within {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  }
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
  color: ${({ theme: { color } }) => color.neutral.gray800};
  font: ${({ theme: { font } }) => font.body3};

  &&::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
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
          "font": designSystem.font.body3,
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
          "font": designSystem.font.body3,
          "color": designSystem.color.neutral.gray900,
          "::placeholder": {
            color: designSystem.color.neutral.gray700,
          },
        },
      },
    },
  },
});
