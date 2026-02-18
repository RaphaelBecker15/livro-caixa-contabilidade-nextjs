import { ReactNode } from "react";
import { LayoutClientWrapper } from "@/components/usuario/LayoutClientWrapper";

export default function LayoutUser({ children }: { children: ReactNode }) {
  return <LayoutClientWrapper>{children}</LayoutClientWrapper>;
}