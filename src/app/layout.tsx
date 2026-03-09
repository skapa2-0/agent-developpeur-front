import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skapa Développeur - Génération de Code IA",
  description: "Plateforme de génération de code assistée par IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="fr" className="dark">
        <body className="min-h-screen bg-dark-bg text-gray-200 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
