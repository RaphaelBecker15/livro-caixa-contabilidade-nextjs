import LayoutUser from "@/components/LayoutUser";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutUser>{children}</LayoutUser>;
}