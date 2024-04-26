import { DropdownItemProps } from "@components/hooks/useDropdown";
import usePortfolioListQuery from "@features/portfolio/api/queries/usePortfolioListQuery";
import { PortfolioItem } from "@features/portfolio/api/types";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import { Link } from "react-router-dom";

type Props = {
  DropdownItem: ({ sx, onClick, children }: DropdownItemProps) => JSX.Element;
};

export default function PortfoliosDropdownList({ DropdownItem }: Props) {
  const { data: portfolioList } = usePortfolioListQuery();

  const portfolioDropdownItems = portfolioList.map(
    (portfolio: PortfolioItem) => ({
      name: portfolio.name,
      path: `/portfolio/${portfolio.id}`,
    })
  );

  return (
    <>
      {portfolioDropdownItems?.map((item) => (
        <Link key={item.name} to={item.path}>
          <DropdownItem sx={portfolioDropdownItemSx}>{item.name}</DropdownItem>
        </Link>
      ))}

      {portfolioDropdownItems && <Divider />}
    </>
  );
}

const portfolioDropdownItemSx = {
  font: designSystem.font.body2,
  color: designSystem.color.neutral.gray900,
};
