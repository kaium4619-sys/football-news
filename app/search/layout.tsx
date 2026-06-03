import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Football Pulse",
  description: "Search for the latest football news, teams, matches, and players.",
  alternates: { canonical: "https://www.footballpulse.online/search" },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
