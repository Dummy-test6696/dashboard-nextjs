import Sidebar from "@/app/component/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
            <Sidebar />

      <main>{children}</main>
    </div>
  );
}