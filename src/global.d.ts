interface Navigator extends Navigator {
  setAppBadge: (count: number) => Promise<void>;
  clearAppBadge: () => Promise<void>;
}
