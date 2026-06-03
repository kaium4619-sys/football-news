import { Metadata } from "next";

export const metadata: Metadata = {
  title: "League Tables | Football Pulse",
  description: "View comprehensive league tables, standings, and team points.",
  alternates: { canonical: "https://www.footballpulse.online/tables" },
};

export default function TablesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
