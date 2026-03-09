"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus, X, Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const techStacks = [
  { value: "react", label: "React", description: "Bibliothèque UI avec Create React App ou Vite" },
  { value: "nextjs", label: "Next.js", description: "Framework React full-stack avec SSR/SSG" },
  { value: "vue", label: "Vue.js", description: "Framework progressif avec Vite" },
  { value: "angular", label: "Angular", description: "Framework complet avec TypeScript" },
];

interface PageDraft {
  name: string;
  path: string;
  description: string;
  components: string[];
}

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [pages, setPages] = useState<PageDraft[]>([]);
  const [currentPage, setCurrentPage] = useState<PageDraft>({ name: "", path: "", description: "", components: [] });
  const [componentInput, setComponentInput] = useState("");

  const handleAddComponent = () => {
    const val = componentInput.trim();
    if (!val) return;
    setCurrentPage((prev) => ({ ...prev, components: [...prev.components, val] }));
    setComponentInput("");
  };

  const handleAddPage = () => {
    if (!currentPage.name || !currentPage.path) return;
    setPages((prev) => [...prev, currentPage]);
    setCurrentPage({ name: "", path: "", description: "", components: [] });
  };

  const handleRemovePage = (index: number) => {
    setPages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 hover:bg-dark-hover">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Nouveau Projet</h1>
          <p className="mt-1 text-gray-400">Étape {step} sur 3</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={cn("h-1.5 flex-1 rounded-full", s <= step ? "bg-brand-primary" : "bg-gray-700")} />
        ))}
      </div>

      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Informations du projet</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Nom du projet</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Application E-commerce"
                  className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez votre projet en quelques phrases..."
                  rows={4}
                  className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Stack technique</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {techStacks.map((stack) => (
                <button
                  key={stack.value}
                  type="button"
                  onClick={() => setTechStack(stack.value)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-4 text-left transition-colors",
                    techStack === stack.value
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-gray-700 hover:border-gray-600 hover:bg-dark-hover"
                  )}
                >
                  <div className={cn(
                    "mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border",
                    techStack === stack.value ? "border-brand-primary bg-brand-primary" : "border-gray-600"
                  )}>
                    {techStack === stack.value && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <div>
                    <p className="font-medium text-white">{stack.label}</p>
                    <p className="mt-0.5 text-xs text-gray-400">{stack.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Configurer les pages</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-300">Nom</label>
                    <input
                      type="text"
                      value={currentPage.name}
                      onChange={(e) => setCurrentPage((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Ex: Accueil"
                      className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-300">Route</label>
                    <input
                      type="text"
                      value={currentPage.path}
                      onChange={(e) => setCurrentPage((p) => ({ ...p, path: e.target.value }))}
                      placeholder="Ex: /dashboard"
                      className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Description</label>
                  <textarea
                    value={currentPage.description}
                    onChange={(e) => setCurrentPage((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Décrivez le contenu de cette page..."
                    rows={2}
                    className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-300">Composants</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={componentInput}
                      onChange={(e) => setComponentInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddComponent(); } }}
                      placeholder="Ex: StatsCard"
                      className="flex-1 rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
                    />
                    <button type="button" onClick={handleAddComponent} className="flex h-10 w-10 items-center justify-center rounded-lg bg-dark-hover text-gray-400 hover:text-white">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  {currentPage.components.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {currentPage.components.map((c, i) => (
                        <span key={i} className="flex items-center gap-1 rounded-full border border-gray-700 bg-dark-hover px-2.5 py-0.5 text-xs text-gray-300">
                          {c}
                          <button type="button" onClick={() => setCurrentPage((p) => ({ ...p, components: p.components.filter((_, idx) => idx !== i) }))} className="text-gray-500 hover:text-white">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleAddPage}
                  disabled={!currentPage.name || !currentPage.path}
                  className="w-full rounded-lg border border-dashed border-gray-700 px-4 py-2.5 text-sm text-gray-400 hover:border-brand-primary hover:text-white disabled:opacity-50"
                >
                  <Plus className="mr-2 inline h-4 w-4" />
                  Ajouter cette page
                </button>
              </div>
            </CardContent>
          </Card>

          {pages.length > 0 && (
            <Card>
              <CardHeader><CardTitle>Pages ajoutées ({pages.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {pages.map((page, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-gray-800 p-3">
                      <div>
                        <p className="text-sm font-medium text-white">{page.name}</p>
                        <p className="text-xs text-gray-500">{page.path} — {page.components.length} composants</p>
                      </div>
                      <button onClick={() => handleRemovePage(i)} className="text-gray-500 hover:text-red-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-hover disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Précédent
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-secondary"
          >
            Suivant
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-brand-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-brand-secondary"
          >
            Créer le projet
          </button>
        )}
      </div>
    </div>
  );
}
