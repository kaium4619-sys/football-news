"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="container py-20 flex flex-col items-center justify-center text-center space-y-6">
      <div className="p-6 rounded-full bg-red-500/10 text-red-500">
        <AlertCircle className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tighter uppercase">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md">
          We encountered an error while loading this page. Please try again or return to the home page.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm transition-transform hover:scale-105"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl border border-border bg-card font-bold text-sm hover:bg-muted transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
