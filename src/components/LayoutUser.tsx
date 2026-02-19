import { ReactNode } from "react";
import { LayoutClientWrapper } from "@/components/LayoutClientWrapper";
import { cookies } from "next/headers";

export default async function LayoutUser({ children }: { children: ReactNode }) {
  const cookieStore = await cookies()
  const role = cookieStore.get('mock_role')?.value ?? 'empresa'
  
  return <LayoutClientWrapper role={role}>{children}</LayoutClientWrapper>;
}