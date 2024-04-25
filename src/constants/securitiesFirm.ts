import FA from "@assets/icons/logo/ic_fineants.svg";
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

export const securitiesFirmLogos = {
  FineAnts: FA,
  BNK투자증권: bnk,
  부국증권: bookook,
  케이프투자증권: cape,
  대신증권: daishin,
  다올투자증권: daol,
  DB금융투자: db,
  이베스트투자증권: ebest,
  유진투자증권: eugene,
  하나증권: hana,
  한화투자증권: hanwha,
  하이투자증권: hi,
  현대차증권: hyundai,
  IBK투자증권: ibk,
  카카오페이증권: kakao,
  KB증권: kb,
  키움증권: kiwoom,
  한국투자증권: korea,
  한국포스증권: koreafoss,
  교보증권: kyobo,
  메리츠증권: meritz,
  미래에셋증권: miraeasset,
  나무증권: namuh,
  삼성증권: samsung,
  상상인증권: sangsangin,
  신한투자증권: shinhan,
  신영증권: shinyoung,
  SK증권: sk,
  토스증권: toss,
  유안타증권: yuanta,
};

export type SecuritiesFirm = keyof typeof securitiesFirmLogos;

export const SECURITIES_FIRM = Object.keys(
  securitiesFirmLogos
) as SecuritiesFirm[];
