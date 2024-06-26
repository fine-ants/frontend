import { IconButton } from "@components/Buttons/IconButton";
import { Icon } from "@components/Icon";
import { StockSearchItem } from "@features/stock/api";
import useStockSearchQuery from "@features/stock/api/queries/useStockSearchQuery";
import { useBoolean, useDebounce } from "@fineants/demolition";
import { Autocomplete, SxProps, TextField } from "@mui/material";
import Routes from "@router/Routes";
import designSystem from "@styles/designSystem";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderOptionDefault from "../RenderOptionDefault";
import RenderOptionSelect from "../RenderOptionSelect";
import RenderOptionSelectMultiple from "../RenderOptionSelectMultiple";

type Variant = "default" | "select" | "select-multiple";

type Props = {
  variant?: Variant;
  sx?: SxProps;
  selectedOptions?: StockSearchItem[];
  onSelectOption?: (item: StockSearchItem) => void;
  disabled?: boolean;
};

export default function SearchBarM({
  variant = "default",
  sx,
  selectedOptions,
  onSelectOption,
  disabled = false,
}: Props) {
  const navigate = useNavigate();

  const { state: isOpen, setTrue: onOpen, setFalse: onClose } = useBoolean();

  const [value, setValue] = useState<StockSearchItem | null>(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValue, 250);

  const { data: searchResults, isLoading } = useStockSearchQuery(
    debouncedSearchInputValue
  );

  const onSearchInputChange = (_: SyntheticEvent, newValue: string) => {
    setSearchInputValue(newValue);
  };

  const clearSearchInput = () => {
    setSearchInputValue("");
  };

  const updateSearchInputValue = (newVal: string) => {
    setSearchInputValue(newVal);
  };

  const onValueChange = (_: SyntheticEvent, value: StockSearchItem | null) => {
    if (!value) return;

    setValue(value);

    switch (variant) {
      case "select":
        onSelectRenderOptionSelect(value);
        break;
      case "select-multiple":
        onSelectRenderOptionSelectMultiple(value);
        break;
      default:
        navigate(Routes.STOCK(value.tickerSymbol));
    }
  };

  const onSelectRenderOptionSelect = (option: StockSearchItem) => {
    if (onSelectOption) onSelectOption(option);
    updateSearchInputValue(option.companyName);
    onClose();
  };

  const onSelectRenderOptionSelectMultiple = (option: StockSearchItem) => {
    if (onSelectOption) onSelectOption(option);
  };

  return (
    <Autocomplete
      id="stock-search-bar"
      fullWidth
      disablePortal={true}
      sx={{ ...autocompleteSx(variant), ...sx }}
      disabled={disabled}
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      value={value}
      inputValue={searchInputValue}
      getOptionLabel={(option) => option.companyName} // Used to fill the input value.
      onInputChange={onSearchInputChange}
      onChange={onValueChange}
      isOptionEqualToValue={(option, value) =>
        option.companyName === value.companyName
      }
      filterOptions={(x) => x}
      clearOnBlur={false}
      options={searchResults ?? []}
      loading={isLoading}
      loadingText={"검색 중입니다"} // TODO: Replace with animated FA logo
      noOptionsText={searchInputValue && "검색 결과가 없습니다"} // TODO: style this
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="종목을 검색하세요"
          sx={{ height: "100%" }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Icon
                icon="search"
                size={16}
                color={variant === "default" ? "gray600" : "gray600"}
              />
            ),
            endAdornment: searchInputValue && (
              <IconButton
                icon="close"
                size="h24"
                iconColor="custom"
                customColor={{
                  color: "gray600",
                  hoverColor: "gray50",
                }}
                onClick={clearSearchInput}
              />
            ),
          }}
        />
      )}
      componentsProps={{
        popupIndicator: {
          sx: popupIndicatorSx,
          onClick: clearSearchInput,
        },
        popper: {
          sx: popperSx(variant),
        },
      }}
      renderOption={(props, option) => {
        switch (variant) {
          case "select":
            return (
              <RenderOptionSelect
                key={option.tickerSymbol}
                {...{
                  props,
                  searchValue: debouncedSearchInputValue,
                  option,
                  onClick: () => {
                    onSelectRenderOptionSelect(option);
                  },
                }}
              />
            );
          case "select-multiple":
            return (
              <RenderOptionSelectMultiple
                key={option.tickerSymbol}
                {...{
                  props,
                  searchValue: debouncedSearchInputValue,
                  option,
                  selectedOptions: selectedOptions ?? [],
                  onClick: () => {
                    onSelectRenderOptionSelectMultiple(option);
                  },
                }}
              />
            );
          default:
            return (
              <RenderOptionDefault
                key={option.tickerSymbol}
                {...{
                  props,
                  searchValue: debouncedSearchInputValue,
                  option,
                  path: Routes.STOCK(option.tickerSymbol),
                }}
              />
            );
        }
      }}
    />
  );
}

const autocompleteSx = (variant: Variant) => ({
  "height": "48px",
  "padding": "0 16px",

  "& .MuiInputBase-root": {
    "width": "100%",
    "height": "100%",
    "padding": "0 12px !important",
    "gap": "8px",
    "backgroundColor": "inherit",

    "&:hover, &:focus-within": {
      fieldset: {
        border: `1px solid ${
          variant === "default"
            ? designSystem.color.neutral.gray500
            : designSystem.color.primary.blue500
        }`,
      },
    },

    "& .MuiInputBase-input": {
      "padding": "0",
      "font": designSystem.font.body2.font,
      "color": designSystem.color.neutral.gray900,

      "input::placeholder": {
        color: designSystem.color.neutral.gray400,
      },
    },

    ".MuiAutocomplete-endAdornment": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
    },

    "fieldset": {
      border: `1px solid ${designSystem.color.neutral.gray200}`,
    },
  },
});

const popupIndicatorSx = {
  width: "16px",
  height: "16px",
  padding: "0",
};

const popperSx = (variant: Variant) => {
  const POPPER_MARGIN_TOP = variant === "default" ? 8 : 2;

  return {
    "width": "100% !important",
    "marginTop": `${POPPER_MARGIN_TOP}px !important`,
    "display": "flex",
    "flexDirection": "column",
    "flex": "1",
    "position": "static !important",
    "transform": "none !important",
    "overflow": "auto",
    "zIndex": "9999",

    ".MuiPaper-root": {
      "border-radius": "0 !important",
    },

    ".MuiPaper-elevation": {
      padding: 0,
    },

    "& .MuiAutocomplete-listbox": {
      "width": "100%",
      "maxHeight": "none !important",
      "padding": "4px",
      "display": "flex",
      "flexDirection": "column",
      "flex": "1",

      "& .MuiAutocomplete-option": {
        "width": "100%",
        "padding": "4px 8px",
        "display": "flex",
        "alignItems": "center",

        "&:hover": {
          backgroundColor: designSystem.color.neutral.gray50,
        },
      },
    },
  };
};
