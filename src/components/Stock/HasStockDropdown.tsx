import { deleteWatchlistStock, postWatchlistStock } from "@api/watchlist";
import { watchlistKeys } from "@api/watchlist/queries/queryKeys";
import useWatchlistHasStockQuery from "@api/watchlist/queries/useWatchlistHasStockQuery";
import Button from "@components/common/Buttons/Button";
import CheckBox from "@components/common/Checkbox/Checkbox";
import { Icon } from "@components/common/Icon";
import { useDropdown } from "@components/hooks/useDropdown";
import designSystem from "@styles/designSystem";
import { useQueryClient } from "@tanstack/react-query";
import { MouseEvent } from "react";
import styled from "styled-components";

type Props = {
  tickerSymbol: string;
  type: "add" | "remove";
};

export function HasStockDropdown({ tickerSymbol, type }: Props) {
  const queryClient = useQueryClient();

  const { onOpen, DropdownMenu, DropdownItem } = useDropdown();
  const { data: hasStockData } = useWatchlistHasStockQuery(tickerSymbol);

  const onDropdownButtonClick = (e: MouseEvent<HTMLElement>) => {
    onOpen(e);
  };

  const onDropdownItemClick = async (
    tickerSymbol: string,
    watchlistId: number,
    hasStock: boolean
  ) => {
    if (type === "add" && !hasStock) {
      const res = await postWatchlistStock({
        watchlistId,
        tickerSymbols: [tickerSymbol],
      });

      if (res.code === 200) {
        queryClient.invalidateQueries({
          queryKey: watchlistKeys.hasStock().queryKey,
        });
      }
      return;
    }
    if (type === "remove" && hasStock) {
      const res = await deleteWatchlistStock({
        watchlistId,
        tickerSymbols: [tickerSymbol],
      });

      if (res.code === 200) {
        queryClient.invalidateQueries({
          queryKey: watchlistKeys.hasStock().queryKey,
        });
      }
      return;
    }
  };

  return (
    <>
      <DropdownButton onClick={onDropdownButtonClick}>
        {type === "add" ? (
          <Button variant="secondary" size="h32">
            <Icon icon="favorite-add" size={16} color="blue500" />
            관심 종목으로 추가
          </Button>
        ) : (
          <Button variant="tertiary" size="h32">
            <Icon icon="favorite-remove" size={16} color="gray600" />
            관심 종목에서 해제
          </Button>
        )}
      </DropdownButton>
      <DropdownMenu sx={dropdownMenuSx}>
        {hasStockData?.map((watchlist) => (
          <DropdownItem
            key={watchlist.id}
            sx={fixedDropdownItemSx}
            onClick={() =>
              onDropdownItemClick(
                tickerSymbol,
                watchlist.id,
                watchlist.hasStock
              )
            }>
            <CheckBox size="h16" checked={watchlist.hasStock} />
            {watchlist.name}
          </DropdownItem>
        ))}
        <Divider />
        <AddWatchlistBox>
          {type === "add" && (
            <div>
              <Icon icon="folder-add" size={16} color="gray600" />새 리스트 추가
            </div>
          )}
          <SubmitButton>{type === "add" ? "추가" : "해제"}</SubmitButton>
        </AddWatchlistBox>
      </DropdownMenu>
    </>
  );
}

const DropdownButton = styled.div``;

const dropdownMenuSx = {
  "& .MuiPaper-root": {
    "width": "352px",
    "height": "auto",
    "display": "flex",
    "flexDirection": "column",
    "alignItems": "center",
    "justifyContent": "center",
    "padding": "4px",
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

const fixedDropdownItemSx = {
  font: designSystem.font.body3.font,
  color: designSystem.color.neutral.gray900,
};

const Divider = styled.div`
  width: 336px;
  height: 1px;
  background-color: ${designSystem.color.neutral.gray100};
`;
