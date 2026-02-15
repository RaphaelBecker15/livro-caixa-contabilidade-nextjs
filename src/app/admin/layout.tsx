import LayoutClient from "@/components/LayoutClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient>{children}</LayoutClient>;
}