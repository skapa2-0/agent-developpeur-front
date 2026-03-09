"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlusCircle, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/project/new", label: "Nouveau Projet", icon: PlusCircle },
  { href: "/projects", label: "Mes Projets", icon: FolderOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-800 bg-dark-card">
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary">
          <span className="text-sm font-bold text-white">S</span>
        </div>
        <span className="text-lg font-bold text-white">Skapa Développeur</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-brand-primary/20 text-brand-accent"
                  : "text-gray-400 hover:bg-dark-hover hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <p className="text-xs text-gray-600">Skapa Développeur v0.1.0</p>
      </div>
    </aside>
  );
}
