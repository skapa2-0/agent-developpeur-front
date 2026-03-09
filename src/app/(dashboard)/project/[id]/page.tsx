"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Code2, Play, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CodePreview } from "@/components/editor/CodePreview";
import { cn } from "@/lib/utils";
import type { CodeProject, PageConfig } from "@/types";

const mockProject: CodeProject = {
  id: "proj1",
  name: "Application E-commerce",
  description: "Plateforme de vente en ligne avec catalogue produits, panier et paiement Stripe.",
  techStack: "nextjs",
  status: "completed",
  pages: [
    { id: "pg1", name: "Accueil", path: "/", description: "Page d'accueil avec hero section et produits vedettes", components: ["HeroSection", "ProductGrid", "Newsletter"], status: "completed" },
    { id: "pg2", name: "Catalogue", path: "/products", description: "Liste paginée des produits avec filtres latéraux", components: ["ProductCard", "FilterSidebar", "Pagination"], status: "completed" },
    { id: "pg3", name: "Panier", path: "/cart", description: "Gestion du panier avec calcul des totaux et code promo", components: ["CartItem", "CartSummary", "PromoCode"], status: "generating" },
  ],
  createdAt: "2025-02-01T10:00:00Z",
  updatedAt: "2025-02-15T16:00:00Z",
};

const sampleCode = `import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";

const products = [
  { id: 1, name: "T-shirt Premium", price: 29.99, image: "/products/tshirt.jpg" },
  { id: 2, name: "Jean Slim", price: 59.99, image: "/products/jean.jpg" },
  { id: 3, name: "Sneakers Classic", price: 89.99, image: "/products/sneakers.jpg" },
];

export default function CataloguePage() {
  return (
    <div className="flex gap-6">
      <FilterSidebar />
      <div className="flex-1 grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}`;

const pageStatusConfig: Record<string, { label: string; variant: "success" | "warning" | "neutral" | "error" }> = {
  completed: { label: "Terminé", variant: "success" },
  generating: { label: "Génération...", variant: "warning" },
  pending: { label: "En attente", variant: "neutral" },
  error: { label: "Erreur", variant: "error" },
};

export default function ProjectPage() {
  const [selectedPage, setSelectedPage] = useState<PageConfig | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-dark-hover">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{mockProject.name}</h1>
            <p className="mt-1 text-gray-400">{mockProject.description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/project/${mockProject.id}/issues`}
            className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 hover:bg-dark-hover"
          >
            Issues
          </Link>
          <Link
            href={`/project/${mockProject.id}/editor`}
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-medium text-white hover:bg-brand-secondary"
          >
            <Code2 className="h-4 w-4" />
            Éditeur
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Pages list */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-white">Pages ({mockProject.pages.length})</h2>
          {mockProject.pages.map((page) => {
            const status = pageStatusConfig[page.status];
            return (
              <Card
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className={cn(selectedPage?.id === page.id && "border-brand-primary")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{page.name}</p>
                    <p className="text-xs text-gray-500">{page.path}</p>
                  </div>
                  <StatusBadge label={status.label} variant={status.variant} />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Code preview */}
        <div className="lg:col-span-2">
          {selectedPage ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">{selectedPage.name}</h2>
                  <p className="text-sm text-gray-400">{selectedPage.description}</p>
                </div>
                <div className="flex gap-2">
                  {selectedPage.status === "pending" && (
                    <button className="flex items-center gap-2 rounded-lg bg-brand-primary px-3 py-1.5 text-sm text-white hover:bg-brand-secondary">
                      <Play className="h-4 w-4" />
                      Générer
                    </button>
                  )}
                  {selectedPage.status === "completed" && (
                    <Link
                      href={`/project/${mockProject.id}/editor`}
                      className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-1.5 text-sm text-gray-300 hover:bg-dark-hover"
                    >
                      <Eye className="h-4 w-4" />
                      Voir le code
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {selectedPage.components.map((comp) => (
                  <StatusBadge key={comp} label={comp} variant="info" />
                ))}
              </div>

              {selectedPage.status === "completed" && (
                <CodePreview
                  code={sampleCode}
                  language="TypeScript (TSX)"
                  fileName={`src/app${selectedPage.path === "/" ? "" : selectedPage.path}/page.tsx`}
                />
              )}

              {selectedPage.status === "generating" && (
                <Card>
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
                    <p className="mt-4 text-sm text-gray-400">Génération du code en cours...</p>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Code2 className="h-12 w-12 text-gray-600" />
                <p className="mt-4 text-gray-400">Sélectionnez une page pour voir le code généré</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
