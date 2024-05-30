export type OrderByListType<Item> = {
  title: string;
  orderBy: keyof Item;
}[];

export type OrderByDrawerStep = "main" | "orderBy" | "order";
