"use client";

import { ReactNode } from "react";
import { useIsClient } from "usehooks-ts";

export default function ClientComponent({ children }: { children: ReactNode }) {
  const isClient = useIsClient();

  if (!isClient) return;

  return <>{children}</>;
}
