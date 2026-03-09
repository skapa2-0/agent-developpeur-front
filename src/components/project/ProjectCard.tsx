import Link from "next/link";
import { Code2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/utils";
import type { CodeProject } from "@/types";

const techStackLabels: Record<string, string> = {
  react: "React",
  nextjs: "Next.js",
  vue: "Vue.js",
  angular: "Angular",
};

const techStackColors: Record<string, string> = {
  react: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  nextjs: "bg-white/20 text-white border-white/30",
  vue: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  angular: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  draft: Clock,
  generating: Code2,
  completed: CheckCircle2,
  error: AlertCircle,
};

const statusConfig: Record<string, { label: string; variant: "neutral" | "warning" | "success" | "error" }> = {
  draft: { label: "Brouillon", variant: "neutral" },
  generating: { label: "Génération...", variant: "warning" },
  completed: { label: "Terminé", variant: "success" },
  error: { label: "Erreur", variant: "error" },
};

interface ProjectCardProps {
  project: CodeProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const StatusIcon = statusIcons[project.status];
  const status = statusConfig[project.status];
  const completedPages = project.pages.filter((p) => p.status === "completed").length;

  return (
    <Link href={`/project/${project.id}`}>
      <Card className="h-full">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary/20">
                <StatusIcon className="h-5 w-5 text-brand-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{project.name}</h3>
                <p className="text-xs text-gray-500">{formatDate(project.updatedAt)}</p>
              </div>
            </div>
            <StatusBadge label={status.label} variant={status.variant} />
          </div>

          <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>

          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${techStackColors[project.techStack]}`}
            >
              {techStackLabels[project.techStack]}
            </span>
            <span className="text-xs text-gray-500">
              {completedPages}/{project.pages.length} pages
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
