"use client";

import { useState } from "react";
import { ArrowLeft, Save, RefreshCw } from "lucide-react";
import Link from "next/link";
import { CodePreview } from "@/components/editor/CodePreview";
import { PageConfigurator } from "@/components/editor/PageConfigurator";
import { cn } from "@/lib/utils";

const mockPages = [
  { id: "pg1", name: "Accueil", path: "/" },
  { id: "pg2", name: "Catalogue", path: "/products" },
  { id: "pg3", name: "Panier", path: "/cart" },
];

const mockCodeFiles: Record<string, { fileName: string; language: string; code: string }[]> = {
  pg1: [
    {
      fileName: "src/app/page.tsx",
      language: "TypeScript (TSX)",
      code: `import { HeroSection } from "@/components/HeroSection";
import { ProductGrid } from "@/components/ProductGrid";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <main>
      <HeroSection
        title="Découvrez notre collection"
        subtitle="Les meilleures pièces sélectionnées pour vous"
        ctaText="Voir le catalogue"
        ctaHref="/products"
      />
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold mb-8">Produits vedettes</h2>
        <ProductGrid featured limit={6} />
      </section>
      <Newsletter />
    </main>
  );
}`,
    },
    {
      fileName: "src/components/HeroSection.tsx",
      language: "TypeScript (TSX)",
      code: `interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
}

export function HeroSection({ title, subtitle, ctaText, ctaHref }: HeroSectionProps) {
  return (
    <section className="relative h-[60vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>
        <a
          href={ctaHref}
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          {ctaText}
        </a>
      </div>
    </section>
  );
}`,
    },
  ],
  pg2: [
    {
      fileName: "src/app/products/page.tsx",
      language: "TypeScript (TSX)",
      code: `import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Pagination } from "@/components/Pagination";

const products = [
  { id: 1, name: "T-shirt Premium", price: 29.99, category: "Hauts" },
  { id: 2, name: "Jean Slim Fit", price: 59.99, category: "Bas" },
  { id: 3, name: "Sneakers Classic", price: 89.99, category: "Chaussures" },
  { id: 4, name: "Veste en cuir", price: 199.99, category: "Vestes" },
  { id: 5, name: "Chemise Oxford", price: 45.99, category: "Hauts" },
  { id: 6, name: "Pantalon Chino", price: 49.99, category: "Bas" },
];

export default function ProductsPage() {
  return (
    <div className="flex gap-6 p-6">
      <FilterSidebar categories={["Hauts", "Bas", "Chaussures", "Vestes"]} />
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Pagination currentPage={1} totalPages={5} />
      </div>
    </div>
  );
}`,
    },
  ],
  pg3: [
    {
      fileName: "src/app/cart/page.tsx",
      language: "TypeScript (TSX)",
      code: `"use client";

import { useState } from "react";
import { CartItem } from "@/components/CartItem";
import { CartSummary } from "@/components/CartSummary";
import { PromoCode } from "@/components/PromoCode";

const initialItems = [
  { id: 1, name: "T-shirt Premium", price: 29.99, quantity: 2, image: "/tshirt.jpg" },
  { id: 2, name: "Jean Slim Fit", price: 59.99, quantity: 1, image: "/jean.jpg" },
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal - discount;

  return (
    <div className="flex gap-8 p-6">
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold">Mon Panier ({items.length})</h1>
        {items.map((item) => (
          <CartItem key={item.id} item={item} onRemove={(id) => setItems(items.filter(i => i.id !== id))} />
        ))}
      </div>
      <div className="w-80 space-y-4">
        <PromoCode onApply={(code) => setDiscount(code === "PROMO10" ? subtotal * 0.1 : 0)} />
        <CartSummary subtotal={subtotal} discount={discount} total={total} />
      </div>
    </div>
  );
}`,
    },
  ],
};

export default function EditorPage() {
  const [selectedPageId, setSelectedPageId] = useState(mockPages[0].id);
  const [showConfig, setShowConfig] = useState(false);

  const currentFiles = mockCodeFiles[selectedPageId] || [];
  const currentPage = mockPages.find((p) => p.id === selectedPageId);

  return (
    <div className="flex h-full -m-6">
      {/* Left panel: page selector + config */}
      <div className="flex w-80 flex-col border-r border-gray-800 bg-dark-card">
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <Link href="/project/proj1" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Retour au projet
          </Link>
        </div>

        <div className="border-b border-gray-800 p-4">
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfig(false)}
              className={cn(
                "flex-1 rounded-lg py-1.5 text-sm",
                !showConfig ? "bg-brand-primary text-white" : "text-gray-400 hover:bg-dark-hover"
              )}
            >
              Pages
            </button>
            <button
              onClick={() => setShowConfig(true)}
              className={cn(
                "flex-1 rounded-lg py-1.5 text-sm",
                showConfig ? "bg-brand-primary text-white" : "text-gray-400 hover:bg-dark-hover"
              )}
            >
              Config
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!showConfig ? (
            <div className="space-y-2">
              {mockPages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPageId(page.id)}
                  className={cn(
                    "w-full rounded-lg p-3 text-left transition-colors",
                    selectedPageId === page.id ? "bg-dark-hover border border-brand-primary/50" : "hover:bg-dark-hover"
                  )}
                >
                  <p className="text-sm font-medium text-white">{page.name}</p>
                  <p className="text-xs text-gray-500">{page.path}</p>
                </button>
              ))}
            </div>
          ) : (
            <PageConfigurator
              initial={{
                name: currentPage?.name || "",
                path: currentPage?.path || "",
                description: "",
                components: [],
              }}
              onSave={() => setShowConfig(false)}
            />
          )}
        </div>

        <div className="flex gap-2 border-t border-gray-800 p-4">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-700 py-2 text-sm text-gray-300 hover:bg-dark-hover">
            <RefreshCw className="h-4 w-4" />
            Régénérer
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-primary py-2 text-sm text-white hover:bg-brand-secondary">
            <Save className="h-4 w-4" />
            Sauver
          </button>
        </div>
      </div>

      {/* Right panel: code preview */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">
            Code généré — {currentPage?.name}
          </h2>
          {currentFiles.map((file, i) => (
            <CodePreview
              key={i}
              code={file.code}
              language={file.language}
              fileName={file.fileName}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
