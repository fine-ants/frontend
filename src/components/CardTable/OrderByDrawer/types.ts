export type OrderByItem<Item> = {
  title: string;
  orderBy: keyof Item;
};

export type OrderByDrawerStep = "main" | "orderBy" | "order";
