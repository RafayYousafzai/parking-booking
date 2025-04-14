import { EnvVarWarning } from "@/components/env-var-warning";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import HeaderAuth from "@/components/header-auth";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col items-center w-full">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>Next.js </Link>
            </div>
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>
        </nav>
        <div className="flex-1">{children}</div>

        <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}
            <a
              href="https"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              Dev
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
