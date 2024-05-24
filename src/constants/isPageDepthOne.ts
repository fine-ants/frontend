const oneDepthPages = new Set([
  "/landing",
  "/dashboard",
  "/watchlists",
  "/portfolios",
  "/portfolio",
  "/indices",
  "/stock",
]);

export default function isPageDepthOne(route: string) {
  const regex = /\/\w+/;
  const parsedRoute = route.match(regex);
  return parsedRoute ? oneDepthPages.has(parsedRoute[0]) : false;
}
