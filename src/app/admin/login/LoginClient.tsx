"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabase, supabaseEnabled } from "@/lib/supabase";

export default function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const enabled = supabaseEnabled();

  // If a session already exists, bounce straight to /admin.
  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/admin");
    });
  }, [router]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const sb = getSupabase();
    if (!sb) {
      setError("Supabase is not configured.");
      return;
    }
    setSubmitting(true);
    const { error: err } = await sb.auth.signInWithPassword({
      email: email.trim(),
      password
    });
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.replace("/admin");
  };

  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-sm">
        <p className="eyebrow text-center">Admin</p>
        <h1 className="font-display mt-2 text-center text-3xl">Sign in</h1>
        <p className="mt-2 text-center text-sm text-ink/60">
          Access the Facez admin dashboard.
        </p>

        {!enabled && (
          <div className="mt-5 rounded-2xl border border-blush-200 bg-blush-50 p-4 text-xs text-blush-700">
            <p className="font-semibold">Supabase isn’t configured.</p>
            <p className="mt-1">
              Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, then create an admin user in the
              Supabase dashboard (Authentication → Users → Add user).
            </p>
            <p className="mt-2">
              Until then, <Link href="/admin" className="underline">/admin</Link> runs in local
              dev mode and reads orders from this device’s storage.
            </p>
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block">
            <span className="label">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="username"
            />
          </label>
          <label className="block">
            <span className="label">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              autoComplete="current-password"
            />
          </label>
          {error && (
            <p className="rounded-xl bg-blush-50 p-3 text-xs text-blush-700">{error}</p>
          )}
          <button
            disabled={submitting || !enabled}
            type="submit"
            className="btn-primary w-full"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-ink/50">
          <Link href="/" className="underline">← Back to store</Link>
        </p>
      </div>
    </section>
  );
}
