import useWatchlistHasStockQuery from "@api/watchlist/queries/useWatchlistHasStockQuery";
import Button from "@components/common/Buttons/Button";
import { Icon } from "@components/common/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import designSystem from "@styles/designSystem";
import { MouseEvent } from "react";
import styled from "styled-components";
import HasStockDropdownItem from "./WatchlistHasStockDropdownItem";

type Props = {
  tickerSymbol: string;
};

export function WatchlistHasStockDropdown({ tickerSymbol }: Props) {
  const { onOpen, DropdownMenu, DropdownItem } = useDropdown();
  const { data: hasStockData } = useWatchlistHasStockQuery(tickerSymbol);

  const onDropdownButtonClick = (e: MouseEvent<HTMLElement>) => {
    onOpen(e);
  };

  return (
    <>
      <div onClick={onDropdownButtonClick}>
        <Button variant="secondary" size="h32">
          <Icon icon="favorite" size={16} color="blue500" />
          관심 종목 설정
        </Button>
      </div>
      <DropdownMenu
        sx={dropdownMenuSx}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        {hasStockData?.map((watchlist) => (
          <HasStockDropdownItem
            key={watchlist.id}
            DropdownItem={DropdownItem}
            tickerSymbol={tickerSymbol}
            watchlist={watchlist}
          />
        ))}
        <Divider />
        <AddWatchlistBox>
          <div>
            <Icon icon="folder-add" size={16} color="gray600" />새 리스트 추가
          </div>

          <SubmitButton>추가</SubmitButton>
        </AddWatchlistBox>
      </DropdownMenu>
    </>
  );
}

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "352px",
    "height": "auto",
    "marginTop": "2px",
    "padding": "4px",
    "display": "flex",
    "flexDirection": "column",
    "justifyContent": "center",
    "alignItems": "center",
    "backgroundColor": designSystem.color.neutral.white,
    "border": `1px solid ${designSystem.color.neutral.gray200}`,
    "borderRadius": "3px",
    "boxShadow": "0px 4px 8px 0px rgba(0, 0, 0, 0.08)",

    ".MuiList-root": {
      "width": "100%",
      "padding": "0",

      ".MuiMenuItem-root": {
        width: "336px",
        height: "32px",
        padding: "8px",
        borderRadius: "4px",
        boxSizing: "border-box",
        display: "flex",
        gap: "8px",
      },

      ".MuiMenuItem-root:hover": {
        backgroundColor: designSystem.color.neutral.gray50,
      },

      ".MuiDivider-root": {
        margin: "4px 0",
        borderColor: designSystem.color.neutral.gray100,
      },
    },
  },
};

const AddWatchlistBox = styled.div`
  display: flex;
  align-items: center;
  width: 336px;
  height: 32px;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.gray600};

  > div {
    height: 24px;
    display: flex;
    gap: 4px;
    padding: 0px 8px;
    align-items: center;
  }
`;

const SubmitButton = styled.div`
  width: 54px;
  height: 24px;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  font: ${designSystem.font.button2.font};
  letter-spacing: ${designSystem.font.button2.letterSpacing};
  color: ${designSystem.color.neutral.white};
  background-color: ${designSystem.color.primary.blue500};
  margin-left: auto;
`;

const Divider = styled.div`
  width: 336px;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray100};
`;
