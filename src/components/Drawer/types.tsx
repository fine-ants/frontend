import { IconType } from "@components/Icon";

export type DrawerItemType = {
  icon: IconType;
  title: string;
  onClick: () => void;
};
