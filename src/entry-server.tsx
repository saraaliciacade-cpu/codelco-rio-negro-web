import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

import { AppProviders, AppRoutes } from "./App";
import "./index.css";

export interface RenderResult {
  html: string;
  head: string;
}

export function render(url: string): RenderResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helmetContext: any = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <AppProviders>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </AppProviders>
      </HelmetProvider>
    </StrictMode>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return { html, head };
}
