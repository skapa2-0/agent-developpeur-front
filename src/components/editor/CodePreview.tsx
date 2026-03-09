"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  code: string;
  language: string;
  fileName?: string;
  className?: string;
}

export function CodePreview({ code, language, fileName, className }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("overflow-hidden rounded-lg border border-gray-800", className)}>
      {fileName && (
        <div className="flex items-center justify-between border-b border-gray-800 bg-dark-card px-4 py-2">
          <span className="text-xs text-gray-400">{fileName}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">{language}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 hover:bg-dark-hover hover:text-white"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copié" : "Copier"}
            </button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto bg-dark-bg p-4">
        <pre className="code-block text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="mr-4 inline-block w-8 select-none text-right text-gray-600">
                  {i + 1}
                </span>
                <span className="text-gray-300">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
