import { StockSearchItem } from "@api/stock";
import useStockSearchQuery from "@api/stock/queries/useStockSearchQuery";
import { Icon } from "@components/common/Icon";
import { useDebounce } from "@fineants/demolition";
import { Autocomplete, SxProps, TextField } from "@mui/material";
import designSystem from "@styles/designSystem";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderOptionDefault from "./RenderOptionDefault";
import RenderOptionSelect from "./RenderOptionSelect";
import RenderOptionSelectMultiple from "./RenderOptionSelectMultiple";

type Variant = "default" | "select" | "select-multiple";

type Props = {
  variant?: Variant;
  sx?: SxProps;
  selectedOptions?: StockSearchItem[];
  onSelectOption?: (item: StockSearchItem) => void;
};

/**
 * @param {StockSearchItem[]} [selectedOptions] - Must be provided when variant is `"select-multiple"`.
 * @param {Function} [onSelectOption] - Must be provided when variant is `"select"` or `"select-multiple"`.
 */
export default function SearchBar({
  variant = "default",
  sx,
  selectedOptions,
  onSelectOption,
}: Props) {
  if (variant === "select" && !onSelectOption) {
    throw Error("`onSelectOption` must be passed in when variant is 'select'");
  }
  if (variant === "select-multiple" && !onSelectOption) {
    throw Error(
      "`onSelectOption` must be passed in when variant is 'select-multiple'"
    );
  }
  if (variant === "select-multiple" && !selectedOptions) {
    throw Error(
      "`selectedOptions` must be passed in when variant is 'select-multiple'"
    );
  }

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedValue = useDebounce(searchInputValue, 250);

  const { data: searchResults, isLoading } =
    useStockSearchQuery(debouncedValue);

  const onSearchInputChange = (
    _: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    setSearchInputValue(newValue as string);
  };

  const clearSearchInput = () => {
    setSearchInputValue("");
  };

  const onClickOption = (option: string) => {
    setSearchInputValue(option);
  };

  return (
    <Autocomplete
      id="stock-search-bar"
      fullWidth
      sx={{ ...autocompleteSx(variant), ...sx }}
      inputValue={searchInputValue}
      open={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      getOptionLabel={(option) => option.companyName} // Used to fill the input value.
      onInputChange={onSearchInputChange}
      isOptionEqualToValue={(option, value) =>
        option.companyName === value.companyName
      }
      clearOnBlur={false}
      options={searchResults ?? []}
      loading={isLoading}
      loadingText={"검색 중입니다"} // TODO: Replace with animated FA logo
      noOptionsText={searchInputValue && "검색 결과가 없습니다"} // TODO: style this
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="검색어를 입력하세요"
          sx={{ height: "100%" }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <Icon
                icon="search"
                size={16}
                color={variant === "default" ? "gray400" : "gray600"}
              />
            ),
          }}
        />
      )}
      forcePopupIcon={searchInputValue !== ""}
      popupIcon={
        <Icon
          icon="close"
          size={16}
          color={variant === "default" ? "gray100" : "gray600"}
        />
      }
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
                  option,
                  onClick: () => {
                    if (onSelectOption) onSelectOption(option);
                    onClickOption(option.companyName);
                    onClose();
                  },
                  searchValue: debouncedValue,
                }}
              />
            );
          case "select-multiple":
            return (
              <RenderOptionSelectMultiple
                key={option.tickerSymbol}
                {...{
                  props,
                  option,
                  selectedOptions: selectedOptions ?? [],
                  onClick: () => {
                    if (onSelectOption) onSelectOption(option);
                  },
                  searchValue: debouncedValue,
                }}
              />
            );
          default:
            return (
              <RenderOptionDefault
                key={option.tickerSymbol}
                {...{
                  props,
                  option,
                  onClick: () => navigate(`/stock/${option.tickerSymbol}`),
                }}
              />
            );
        }
      }}
    />
  );
}

const autocompleteSx = (variant: Variant) => ({
  "height": variant === "default" ? "40px" : "32px",

  "& .MuiInputBase-root": {
    "width": "100%",
    "height": "100%",
    "padding": "0 12px",
    "gap": "8px",
    "backgroundColor": "inherit",

    "&:hover": {
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
      "font": designSystem.font.body3.font,
      "color":
        variant === "default"
          ? designSystem.color.neutral.gray100
          : designSystem.color.neutral.gray900,

      "&::placeholder": {
        color: designSystem.color.neutral.gray400,
      },

      "&:hover": {
        "& ~ fieldset": {
          border: `1px solid ${
            variant === "default"
              ? designSystem.color.neutral.gray500
              : designSystem.color.primary.blue500
          }`,
        },
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
      border: `1px solid ${
        variant === "default"
          ? designSystem.color.neutral.gray700
          : designSystem.color.neutral.gray200
      }`,
    },
  },
});

const popupIndicatorSx = {
  width: "16px",
  height: "16px",
  padding: "0",
};

const popperSx = (variant: Variant) => ({
  "marginTop": `${variant === "default" ? "8px" : "2px"} !important`,

  "& .MuiAutocomplete-listbox": {
    "maxHeight": variant === "default" ? "484px" : "168px",
    "padding": "4px",

    "& .MuiAutocomplete-option": {
      "width": "100%",
      "padding": "4px 8px",
      "display": "flex",
      "alignItems": "center",
      "gap": "4px",
      "borderRadius": "3px",

      "&:hover": {
        backgroundColor: designSystem.color.neutral.gray50,
      },
    },
  },
});
