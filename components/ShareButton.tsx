"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({
  className = "",
  label = "Deel deze scan",
}: {
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const shareData = {
      title: "Energie Weerbaarheidsscan | Impuls Zeeland",
      text: "Ontdek hoe weerbaar jouw bedrijf is tegen energie-onzekerheid.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Gebruiker heeft het delen geannuleerd — geen actie nodig.
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 text-base font-bold text-anthracite underline-offset-4 hover:underline ${className}`}
    >
      {copied ? (
        <Check className="h-5 w-5 text-green" aria-hidden="true" />
      ) : (
        <Share2 className="h-5 w-5" aria-hidden="true" />
      )}
      {copied ? "Link gekopieerd" : label}
    </button>
  );
}
