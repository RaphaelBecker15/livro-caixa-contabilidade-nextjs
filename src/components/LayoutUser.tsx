import { ReactNode } from "react";
import { LayoutClientWrapper } from "@/components/LayoutClientWrapper";
import { createClient } from "@/lib/supabase/server";

export default async function LayoutUser({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
const role = user?.user_metadata?.role ?? 'empresa'
  
  return <LayoutClientWrapper role={role}>{children}</LayoutClientWrapper>;
}