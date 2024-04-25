import { useMediaQuery } from "@mui/material";

export default function useResponsiveLayout() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  return { isDesktop, isTablet, isMobile };
}
