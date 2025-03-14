import "bootstrap/dist/css/bootstrap.css";

import Breadcrumbs from "./breadcrumbs";
import { metadataForPage } from "./metadata";

export const metadata = metadataForPage();

/** The root layout. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="p-3">
          <Breadcrumbs />
          {children}
        </div>
      </body>
    </html>
  );
}
