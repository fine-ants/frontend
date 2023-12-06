import chevronLeftIcon from "@assets/icons/ic_chevron-left.svg";
import chevronRightIcon from "@assets/icons/ic_chevron-right.svg";
import { Pagination as MuiPagination, PaginationItem } from "@mui/material";

type Props = {
  count: number;
};

export default function Pagination({ count }: Props) {
  return (
    <MuiPagination
      count={count}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: () => <img src={chevronLeftIcon} />,
            next: () => <img src={chevronRightIcon} />,
          }}
          {...item}
        />
      )}
      sx={{ height: "24px" }}
    />
  );
}
