import { metadataForPage } from "../metadata";

export const metadata = metadataForPage("Changelog");

/** Changelog for this project. */
export default function Page() {
  return (
    <>
      <div className="h1">Changelog</div>

      <div className="mb-2">
        <div>
          <span className="fs-4">v0.1</span>
          <span className="fst-italic text-muted ms-3">2025-03-13 21:57</span>
        </div>
        <ul>
          <li>Initial release</li>
        </ul>
      </div>
    </>
  );
}
