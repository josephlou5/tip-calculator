"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

// We need to manually link to the GitHub Page home because `href="/"` uses the
// configured base path.
const HOME_LINK = "https://josephlou5.github.io/";
const BASE_PATH = "tip-calculator";

const NOT_FOUND_SEGMENT = "/_not-found";

/** Displays breadcrumbs for page navigation. */
export default function Breadcrumbs() {
  const segments = useSelectedLayoutSegments();
  if (segments.includes(NOT_FOUND_SEGMENT)) {
    // This is a "not found" page. Don't show the breadcrumbs.
    return <></>;
  }
  // In local development, the base path is "/". In GitHub Pages, the base path
  // is automatically injected, but `segments` doesn't include it. So we need to
  // manually add it in every time.
  segments.unshift(BASE_PATH);

  const href: string[] = [];
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          {/* Manually link to the GitHub Page home because we can't navigate
              beyond `basePath`. */}
          <Link href={HOME_LINK}>Home</Link>
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
          if (i > 0) {
            // Skip the base path in the link, since it will be
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
