"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface PageConfiguratorProps {
  onSave: (config: {
    name: string;
    path: string;
    description: string;
    components: string[];
  }) => void;
  initial?: {
    name: string;
    path: string;
    description: string;
    components: string[];
  };
}

export function PageConfigurator({ onSave, initial }: PageConfiguratorProps) {
  const [name, setName] = useState(initial?.name || "");
  const [path, setPath] = useState(initial?.path || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [components, setComponents] = useState<string[]>(initial?.components || []);
  const [componentInput, setComponentInput] = useState("");

  const handleAddComponent = () => {
    const val = componentInput.trim();
    if (!val || components.includes(val)) return;
    setComponents((prev) => [...prev, val]);
    setComponentInput("");
  };

  const handleRemoveComponent = (index: number) => {
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, path, description, components });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Nom de la page</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Tableau de bord"
          className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Chemin (route)</label>
        <input
          type="text"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="Ex: /dashboard"
          className="w-full rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-300">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Décrivez le contenu et les fonctionnalités de cette page..."
          rows={3}
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddComponent();
              }
            }}
            placeholder="Ex: StatsCard, DataTable..."
            className="flex-1 rounded-lg border border-gray-700 bg-dark-bg px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-brand-primary"
          />
          <button
            type="button"
            onClick={handleAddComponent}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-brand-secondary"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {components.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {components.map((comp, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded-full border border-gray-700 bg-dark-hover px-3 py-1 text-sm text-gray-300"
              >
                {comp}
                <button type="button" onClick={() => handleRemoveComponent(i)} className="text-gray-500 hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-brand-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-secondary"
      >
        Sauvegarder la page
      </button>
    </form>
  );
}
