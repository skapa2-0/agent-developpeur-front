import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skapa Développeur - Génération de Code IA",
  description: "Plateforme de génération de code par IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-dark-bg text-gray-200 antialiased">
        {children}
      </body>
    </html>
  );
}
