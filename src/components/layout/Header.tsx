"use client";

import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ChevronRight } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  "/": "Accueil",
  "/project/new": "Nouveau Projet",
  "/projects": "Mes Projets",
};

export function Header() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((_, i) => {
    const path = "/" + segments.slice(0, i + 1).join("/");
    return { path, label: breadcrumbMap[path] || segments[i] };
  });

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-800 bg-dark-card px-6">
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">Skapa Développeur</span>
        {crumbs.map((crumb) => (
          <span key={crumb.path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-gray-600" />
            <span className="text-gray-300">{crumb.label}</span>
          </span>
        ))}
      </div>

      <UserButton afterSignOutUrl="/sign-in" />
    </header>
  );
}
