import { Metadata } from "next";

/** Title of the app. */
export const TITLE = "Tip Calculator";

/** Creates Metadata for a page. */
export function metadataForPage(pageTitle: string = ""): Metadata {
  let title = TITLE;
  if (pageTitle) {
    title += ` - ${pageTitle}`;
  }
  return {
    title,
    applicationName: TITLE,
    description: "A static webpage for calculating tips",
  };
}
