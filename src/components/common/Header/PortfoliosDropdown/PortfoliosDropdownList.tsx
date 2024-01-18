import usePortfolioListQuery from "@api/portfolio/queries/usePortfolioListQuery";
import { PortfolioItem } from "@api/portfolio/types";
import { useDropdown } from "@components/hooks/useDropdown";
import { Divider } from "@mui/material";
import designSystem from "@styles/designSystem";
import { useNavigate } from "react-router-dom";

export default function PortfoliosDropdownList() {
  const navigate = useNavigate();

  const { DropdownItem } = useDropdown();

  const { data: portfolioList } = usePortfolioListQuery();

  const portfolioDropdownItems = portfolioList.map(
    (portfolio: PortfolioItem) => ({
      name: portfolio.name,
      onClick: () => {
        navigate(`/portfolio/${portfolio.id}`);
      },
    })
  );

  return (
    <>
      {portfolioDropdownItems?.map((item) => (
        <DropdownItem
          key={item.name}
          sx={portfolioDropdownItemSx}
          onClick={item.onClick}>
          {item.name}
        </DropdownItem>
      ))}

      {portfolioDropdownItems && <Divider />}
    </>
  );
}

const portfolioDropdownItemSx = {
  font: designSystem.font.body2,
  color: designSystem.color.neutral.gray900,
};
