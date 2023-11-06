import Footer from "@components/common/Footer";
import Header from "@components/common/Header";
import { Typography } from "@mui/material";
import BasePage from "./BasePage";

export default function LandingPage() {
  return (
    <BasePage>
      <Header />

      <Typography variant="h1">Landing Page!</Typography>
      <Footer />
    </BasePage>
  );
}
