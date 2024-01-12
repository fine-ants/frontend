import usePortfolioHoldingPurchaseAddMutation from "@api/portfolio/queries/usePortfolioHoldingPurchaseAddMutation";
import { Icon } from "@components/common/Icon";
import {
  TableCell as MuiTableCell,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import designSystem from "@styles/designSystem";
import { useState } from "react";
import styled from "styled-components";
import { IconCalendar } from "../../../common/IconCalendar";

type Props = {
  portfolioId: number;
  portfolioHoldingId: number;
  onDeleteButtonClick: () => void;
};
export default function PortfolioHoldingLotAddRow({
  portfolioId,
  portfolioHoldingId,
  onDeleteButtonClick,
}: Props) {
  const [newPurchaseDate, setNewPurchaseDate] = useState<Date | null>(null);
  const [newPurchasePricePerShare, setNewPurchasePricePerShare] = useState("");
  const [newNumShares, setNewNumShares] = useState("");
  const [newMemo, setNewMemo] = useState("");

  const { mutate: portfolioHoldingPurchaseAddMutate } =
    usePortfolioHoldingPurchaseAddMutation(portfolioId);

  const onSaveClick = () => {
    // TODO: Handle error
    portfolioHoldingPurchaseAddMutate({
      portfolioId,
      portfolioHoldingId,
      body: {
        purchaseDate: newPurchaseDate?.toISOString() ?? "",
        purchasePricePerShare: Number(newPurchasePricePerShare),
        numShares: Number(newNumShares),
        memo: newMemo,
      },
    });
    onPurchaseValuesRemove();
  };

  const onPurchaseValuesRemove = () => {
    setNewPurchaseDate(null);
    setNewPurchasePricePerShare("");
    setNewNumShares("");
    setNewMemo("");
    onDeleteButtonClick();
  };

  const isValid = newPurchaseDate && newPurchasePricePerShare && newNumShares;

  return (
    <>
      <StyledTableCell
        component="th"
        scope="row"
        style={{ width: "143px", padding: "0 8px 0 16px" }}>
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
      </StyledTableCell>
      <StyledTableCell align="right" style={{ width: "119px" }}>
        <Input
          style={{ width: "100px", textAlign: "left" }}
          type="number"
          placeholder="매입가"
          value={newPurchasePricePerShare}
          onChange={(e) => setNewPurchasePricePerShare(e.target.value.trim())}
        />
      </StyledTableCell>

      <StyledTableCell align="right" style={{ width: "119px" }}>
        <Input
          style={{ width: "100px", textAlign: "left" }}
          type="number"
          placeholder="매입 개수"
          value={newNumShares}
          onChange={(e) => setNewNumShares(e.target.value.trim())}
        />
      </StyledTableCell>

      <StyledTableCell align="left" style={{ width: "395px" }}>
        <StyledTextArea
          value={newMemo}
          placeholder="메모를 입력하세요"
          onChange={(e) => setNewMemo(e.target.value.trim())}
        />
      </StyledTableCell>

      <StyledTableCell align="right" sx={{ width: "32px" }}>
        <IconButton onClick={onSaveClick}>
          <Icon
            icon="check"
            size={16}
            color={isValid ? "blue500" : "gray400"}
          />
        </IconButton>
      </StyledTableCell>

      <StyledTableCell align="right" sx={{ width: "32px" }}>
        <IconButton onClick={onPurchaseValuesRemove}>
          <Icon icon="remove" size={16} color={"gray600"} />
        </IconButton>
      </StyledTableCell>
    </>
  );
}

const StyledTableCell = styled(MuiTableCell)`
  height: 40px;
  padding: 0 8px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  border-radius: 2px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 24px;
  margin-top: 7px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: ${({ theme: { color } }) => color.neutral.white};
  border: 1px solid ${({ theme: { color } }) => color.neutral.gray200};
  border-radius: 2px;
  font: ${({ theme: { font } }) => font.body3};
  color: ${({ theme: { color } }) => color.neutral.gray900};
  text-align: left;

  &::placeholder {
    color: ${({ theme: { color } }) => color.neutral.gray400};
  }

  &:focus {
    border: 1px solid ${({ theme: { color } }) => color.primary.blue500};
  }
`;

const IconButton = styled.button`
  width: 100%;
`;

const muiTheme = createTheme({
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "127px",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "10px",
          height: "12px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          width: "16px",
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
          width: "32px",
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
          display: "flex",
          padding: "0 8px",
          justifyContent: "center",
          width: "127px",
          height: "24px",
          font: designSystem.font.body3,
          backgroundColor: designSystem.color.neutral.white,
          textAlign: "left",
        },
        input: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: "0",
        },
        input: {
          width: "87px",
          padding: "0 0 0 0",
          font: designSystem.font.body3,
        },
      },
    },
  },
});
