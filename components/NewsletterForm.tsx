"use client";

import { FormEvent, useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("pending");
    setMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(result.error || "There was a problem saving your email.");
        return;
      }

      setStatus("success");
      setMessage(result.message || "Thanks! Your email was added successfully.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Failed to connect. Please try again later.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="Email"
          className="bg-background border border-border rounded-lg px-3 py-2 text-xs flex-1"
          aria-label="Newsletter email"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-60"
          disabled={status === "pending"}
        >
          {status === "pending" ? "Saving..." : "Join"}
        </button>
      </div>
      {message ? (
        <p className={`text-xs ${status === "error" ? "text-destructive" : "text-success"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
