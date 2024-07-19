const oneDepthPages = new Set([
  "/",
  "/dashboard",
  "/watchlists",
  "/portfolios",
  "/portfolio",
  "/indices",
  "/stock",
]);

export default function isPageDepthOne(route: string) {
  const regex = /^\/(\w+)?$/;
  const parsedRoute = route.match(regex);
  return parsedRoute ? oneDepthPages.has(route) : false;
}
