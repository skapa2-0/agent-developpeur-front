"use client";

import Link from "next/link";
import { PlusCircle, Code2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProjectCard } from "@/components/project/ProjectCard";
import type { CodeProject } from "@/types";

const mockProjects: CodeProject[] = [
  {
    id: "proj1",
    name: "Application E-commerce",
    description: "Plateforme de vente en ligne avec catalogue produits, panier et paiement Stripe.",
    techStack: "nextjs",
    status: "completed",
    pages: [
      { id: "pg1", name: "Accueil", path: "/", description: "Page d'accueil avec produits vedettes", components: ["HeroSection", "ProductGrid", "Newsletter"], status: "completed" },
      { id: "pg2", name: "Catalogue", path: "/products", description: "Liste paginée des produits avec filtres", components: ["ProductCard", "FilterSidebar", "Pagination"], status: "completed" },
      { id: "pg3", name: "Panier", path: "/cart", description: "Gestion du panier avec calcul des totaux", components: ["CartItem", "CartSummary", "PromoCode"], status: "completed" },
    ],
    createdAt: "2025-02-01T10:00:00Z",
    updatedAt: "2025-02-15T16:00:00Z",
  },
  {
    id: "proj2",
    name: "Dashboard Analytics",
    description: "Tableau de bord avec graphiques interactifs, KPIs et export de rapports.",
    techStack: "react",
    status: "generating",
    pages: [
      { id: "pg4", name: "Overview", path: "/", description: "Vue d'ensemble avec KPIs", components: ["KPICard", "RevenueChart", "UserChart"], status: "completed" },
      { id: "pg5", name: "Rapports", path: "/reports", description: "Génération et export de rapports", components: ["ReportBuilder", "DatePicker", "ExportButton"], status: "generating" },
    ],
    createdAt: "2025-02-20T09:00:00Z",
    updatedAt: "2025-03-01T11:00:00Z",
  },
  {
    id: "proj3",
    name: "App de Gestion RH",
    description: "Application de gestion des employés, congés et fiches de paie.",
    techStack: "vue",
    status: "draft",
    pages: [
      { id: "pg6", name: "Employés", path: "/employees", description: "Liste et profils des employés", components: ["EmployeeTable", "EmployeeProfile"], status: "pending" },
      { id: "pg7", name: "Congés", path: "/leaves", description: "Calendrier et demandes de congés", components: ["LeaveCalendar", "LeaveForm"], status: "pending" },
    ],
    createdAt: "2025-03-01T14:00:00Z",
    updatedAt: "2025-03-01T14:00:00Z",
  },
];

const stats = [
  { label: "Projets", value: mockProjects.length.toString(), icon: Code2, color: "text-blue-400" },
  { label: "Pages générées", value: "7", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "En cours", value: "1", icon: AlertTriangle, color: "text-amber-400" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
          <p className="mt-1 text-gray-400">Gérez vos projets de génération de code</p>
        </div>
        <Link
          href="/project/new"
          className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-secondary"
        >
          <PlusCircle className="h-4 w-4" />
          Nouveau Projet
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>

      <div>
        <CardHeader>
          <CardTitle>Projets récents</CardTitle>
        </CardHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
