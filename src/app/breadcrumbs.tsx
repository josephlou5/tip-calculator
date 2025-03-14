"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const IS_DEV = process.env.NODE_ENV === "development";
const BASE_PATH = "tip-calculator";

const NOT_FOUND_SEGMENT = "/_not-found";

/** Displays breadcrumbs for page navigation. */
export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  if (segments.includes(NOT_FOUND_SEGMENT)) {
    // This is a "not found" page. Don't show the breadcrumbs.
    return <></>;
  }
  if (IS_DEV) {
    // In local development, the base path is "/". In GitHub Pages, it will be
    // "/tip-calculator", so add it here for development.
    segments.unshift(BASE_PATH);
  }

  const href: string[] = [];
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>
        {segments.map((segment, i) => {
          const segmentTitle = segment
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          if (i === segments.length - 1) {
            // Active page and last breadcrumb.
            return (
              <li
                key={i}
                className="breadcrumb-item active"
                aria-current="page"
              >
                {segmentTitle}
              </li>
            );
          }
          if (!(IS_DEV && segment === BASE_PATH)) {
            // Only link with the base path in non-dev environments.
            href.push(segment);
          }
          return (
            <li key={i} className="breadcrumb-item">
              <Link href={"/" + href.join("/")}>{segmentTitle}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
