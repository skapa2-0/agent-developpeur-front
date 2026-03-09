"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, Bug, Zap, Shield } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import type { CodeIssue } from "@/types";

const mockIssues: CodeIssue[] = [
  { id: "iss1", projectId: "proj1", title: "Ajouter la validation des champs du formulaire", description: "Les champs email et téléphone ne sont pas validés côté client. Ajouter une validation avec des regex et des messages d'erreur.", type: "improvement", status: "observer", priority: "high", assignedGroup: "Observer", createdAt: "2025-03-01T10:00:00Z" },
  { id: "iss2", projectId: "proj1", title: "Bug: le total du panier ne se recalcule pas", description: "Quand on modifie la quantité d'un article, le total ne se met pas à jour automatiquement.", type: "bug", status: "developer", priority: "high", assignedGroup: "Developer", createdAt: "2025-03-01T11:00:00Z" },
  { id: "iss3", projectId: "proj1", title: "Optimiser les images produit avec next/image", description: "Remplacer les balises img par le composant next/image pour le lazy loading et l'optimisation automatique.", type: "improvement", status: "developer", priority: "medium", assignedGroup: "Developer", createdAt: "2025-03-02T09:00:00Z" },
  { id: "iss4", projectId: "proj1", title: "Ajouter le mode sombre au composant FilterSidebar", description: "Le composant FilterSidebar utilise des couleurs hardcodées qui ne suivent pas le thème sombre.", type: "feature", status: "validator", priority: "low", assignedGroup: "Validator", createdAt: "2025-03-02T14:00:00Z" },
  { id: "iss5", projectId: "proj1", title: "Sanitiser les entrées utilisateur", description: "Les champs de recherche et de commentaires ne sanitisent pas les entrées, risque XSS potentiel.", type: "security", status: "observer", priority: "high", assignedGroup: "Observer", createdAt: "2025-03-03T08:00:00Z" },
  { id: "iss6", projectId: "proj1", title: "Implémenter la pagination côté serveur", description: "La pagination actuelle charge tous les produits puis pagine côté client. Passer en server-side pagination.", type: "improvement", status: "developer", priority: "medium", assignedGroup: "Developer", createdAt: "2025-03-03T10:00:00Z" },
];

const columns = [
  { key: "observer", label: "Observer", color: "text-blue-400" },
  { key: "developer", label: "Developer", color: "text-amber-400" },
  { key: "validator", label: "Validator", color: "text-emerald-400" },
];

const typeIcons: Record<string, typeof Bug> = {
  bug: Bug,
  improvement: Zap,
  feature: AlertCircle,
  security: Shield,
};

const typeConfig: Record<string, { label: string; variant: "error" | "info" | "success" | "warning" }> = {
  bug: { label: "Bug", variant: "error" },
  improvement: { label: "Amélioration", variant: "info" },
  feature: { label: "Fonctionnalité", variant: "success" },
  security: { label: "Sécurité", variant: "warning" },
};

const priorityConfig: Record<string, { label: string; variant: "error" | "warning" | "neutral" }> = {
  high: { label: "Haute", variant: "error" },
  medium: { label: "Moyenne", variant: "warning" },
  low: { label: "Basse", variant: "neutral" },
};

export default function IssuesPage() {
  const [issues] = useState(mockIssues);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/project/proj1" className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-dark-hover">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Issues</h1>
          <p className="mt-1 text-gray-400">Application E-commerce — {issues.length} issues</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {columns.map((column) => {
          const columnIssues = issues.filter((i) => i.status === column.key);
          return (
            <div key={column.key} className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className={cn("text-sm font-semibold", column.color)}>
                  {column.label}
                </h2>
                <span className="rounded-full bg-dark-hover px-2 py-0.5 text-xs text-gray-400">
                  {columnIssues.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnIssues.map((issue) => {
                  const Icon = typeIcons[issue.type];
                  const type = typeConfig[issue.type];
                  const priority = priorityConfig[issue.priority];

                  return (
                    <Card key={issue.id}>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                          <h3 className="text-sm font-medium text-white">{issue.title}</h3>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2">{issue.description}</p>
                        <div className="flex gap-1.5">
                          <StatusBadge label={type.label} variant={type.variant} />
                          <StatusBadge label={priority.label} variant={priority.variant} />
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
