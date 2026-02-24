"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

interface CaricaturesPanelProps {
  images: string[];
  userPhoto?: string | null;
}

export default function CaricaturesPanel({ images, userPhoto }: CaricaturesPanelProps) {
  const validImages = useMemo(
    () => images.filter((img) => typeof img === "string" && img.trim().length > 0),
    [images]
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (validImages.length === 0 && !userPhoto) return null;

  const selectedImage =
    selectedIndex !== null && selectedIndex >= 0 && selectedIndex < validImages.length
      ? validImages[selectedIndex]
      : null;

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 pointer-events-auto flex gap-4">
      {/* Panel de foto del usuario */}
      {userPhoto && (
        <div className="relative w-48 h-48 rounded-xl bg-black/35 backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl">
          <div className="absolute top-2 left-2 z-30 px-2 py-1 rounded bg-black/50 text-white text-xs">
            Foto original
          </div>
          <Image
            src={userPhoto}
            alt="Foto del usuario"
            fill
            unoptimized
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

