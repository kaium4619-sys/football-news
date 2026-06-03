import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match Fixtures & Results | Football Pulse",
  description: "View the complete list of football fixtures, past match results, and detailed statistics.",
  alternates: { canonical: "https://www.footballpulse.online/matches" },
};

export default function MatchesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
