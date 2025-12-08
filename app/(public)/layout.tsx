import { ReactNode } from "react";

import PartialNavbar from "@/components/partials/nav-bar";

export default function Layout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <PartialNavbar />
      {children}
    </div>
  );
}
