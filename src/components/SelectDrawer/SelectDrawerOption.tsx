import { ReactNode } from "react";

type Props<T> = {
  value: T;
  children: ReactNode;
};

export default function SelectDrawerOption<T>({ children }: Props<T>) {
  return <>{children}</>;
}
