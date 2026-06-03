import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match Results | Football Pulse",
  description: "Check the latest football match results, scores, and match highlights.",
  alternates: { canonical: "https://www.footballpulse.online/results" },
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
