import LayoutClient from "@/components/LayoutClient";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient>{children}</LayoutClient>;
}