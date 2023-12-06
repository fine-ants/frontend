import bnk from "@assets/images/securitiesFirmLogo/bnk.png";
import bookook from "@assets/images/securitiesFirmLogo/bookook.png";
import cape from "@assets/images/securitiesFirmLogo/cape.png";
import daishin from "@assets/images/securitiesFirmLogo/daishin.png";
import daol from "@assets/images/securitiesFirmLogo/daol.png";
import db from "@assets/images/securitiesFirmLogo/db.png";
import ebest from "@assets/images/securitiesFirmLogo/ebest.png";
import eugene from "@assets/images/securitiesFirmLogo/eugene.png";
import hana from "@assets/images/securitiesFirmLogo/hana.png";
import hanwha from "@assets/images/securitiesFirmLogo/hanwha.png";
import hi from "@assets/images/securitiesFirmLogo/hi.png";
import hyundai from "@assets/images/securitiesFirmLogo/hyundai.png";
import ibk from "@assets/images/securitiesFirmLogo/ibk.png";
import kakao from "@assets/images/securitiesFirmLogo/kakao.png";
import kb from "@assets/images/securitiesFirmLogo/kb.png";
import kiwoom from "@assets/images/securitiesFirmLogo/kiwoom.png";
import korea from "@assets/images/securitiesFirmLogo/korea.png";
import koreafoss from "@assets/images/securitiesFirmLogo/koreafoss.png";
import kyobo from "@assets/images/securitiesFirmLogo/kyobo.png";
import meritz from "@assets/images/securitiesFirmLogo/meritz.png";
import miraeasset from "@assets/images/securitiesFirmLogo/miraeasset.png";
import namuh from "@assets/images/securitiesFirmLogo/namuh.png";
import samsung from "@assets/images/securitiesFirmLogo/samsung.png";
import sangsangin from "@assets/images/securitiesFirmLogo/sangsangin.png";
import shinhan from "@assets/images/securitiesFirmLogo/shinhan.png";
import shinyoung from "@assets/images/securitiesFirmLogo/shinyoung.png";
import sk from "@assets/images/securitiesFirmLogo/sk.png";
import toss from "@assets/images/securitiesFirmLogo/toss.png";
import yuanta from "@assets/images/securitiesFirmLogo/yuanta.png";

const securitiesFirmLogos = {
  bnk,
  bookook,
  cape,
  daishin,
  daol,
  db,
  ebest,
  eugene,
  hana,
  hanwha,
  hi,
  hyundai,
  ibk,
  kakao,
  kb,
  kiwoom,
  korea,
  koreafoss,
  kyobo,
  meritz,
  miraeasset,
  namuh,
  samsung,
  sangsangin,
  shinhan,
  shinyoung,
  sk,
  toss,
  yuanta,
  undefined: "FA", // TODO: Change to FineAnts Logo
};

export default securitiesFirmLogos;

export type SecuritiesFirm = keyof typeof securitiesFirmLogos;
