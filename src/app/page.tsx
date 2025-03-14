import Link from "next/link";

import { TITLE } from "./metadata";

/** Tip calculator. */
export default function Page() {
  return (
    <>
      <div className="mb-2">
        <span className="h1">{TITLE}</span>
        <span className="h6 fst-italic text-secondary ms-3">
          (
          <Link href="/changelog" className="text-reset">
            v0.1
          </Link>
          )
        </span>
      </div>
    </>
  );
}
