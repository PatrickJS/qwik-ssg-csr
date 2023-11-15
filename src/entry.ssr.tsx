/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Fragment from "./fragment";
import Root from "./root";

const isFragment = process.env.SSR_FRAGMENT;
const MFE = isFragment ? Fragment : Root;

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<MFE />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: "en-us",
      ...opts.containerAttributes,
    },
    ...(isFragment
      ? {
          containerTagName: "div",
          qwikLoader: {
            include: "never",
          },
        }
      : {}),
  });
}
