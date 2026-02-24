"use client";

import { Suspense, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

function PhotoSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmittingGift, setIsSubmittingGift] = useState(false);

  const fullName = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";

  const queryString = useMemo(() => {
    const params = new URLSearchParams({
      name: fullName,
      email,
    });
    return params.toString();
  }, [email, fullName]);

  const goToCaptureFlow = () => {
    router.push(`/photo/capture?${queryString}`);
  };

  const sendGiftFlow = async () => {
    if (!email || !fullName) return;

    setIsSubmittingGift(true);
    try {
      const { FirebaseService } = await import("../../services/firebaseService");
      const usersData = await FirebaseService.read<Record<string, unknown>>("users");
      const keys = usersData ? Object.keys(usersData) : [];
      const numericKeys = keys.filter((k) => /^\d+$/.test(k)).map(Number);
      const nextId = numericKeys.length === 0 ? 1 : Math.max(...numericKeys) + 1;
      const userKey = String(nextId);

      await FirebaseService.write(`users/${userKey}`, {
        fullName,
        email,
        photo: "",
        timestamp: new Date().toISOString(),
      });

      router.push(`/photo/code?code=${userKey}`);
    } catch (error) {
      console.error("Error saving gift flow to Firebase:", error);
      setIsSubmittingGift(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8" style={{ backgroundColor: "#033778" }}>
      {isSubmittingGift && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70">
          <div className="w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="mt-5 text-white text-base sm:text-lg font-semibold text-center px-4">
            Sending data, please wait...
          </p>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full flex justify-center flex-shrink-0 px-2 pt-6 pointer-events-none z-10">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] aspect-[3/1]">
          <Image
            src="/erni_logo_white.png"
            alt="ERNI Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 360px"
          />
        </div>
      </div>
      <div className="w-full max-w-3xl flex flex-col gap-4 mt-15">
      <h1 
          className="text-white text-center font-bold text-xl sm:text-2xl md:text-3xl leading-tight px-2 flex-shrink-0"
          style={{ 
            fontFamily: 'sans-serif',
            fontWeight: 'bold'
          }}
        >
          Choose your experience
        </h1>
        <button
          type="button"
          onClick={goToCaptureFlow}
          disabled={isSubmittingGift}
          className="w-full rounded-xl overflow-hidden shadow-lg disabled:opacity-70 disabled:cursor-not-allowed h-[180px] sm:h-[240px] md:h-[280px]"
          aria-label="Go to caricature flow"
        >
          <div className="relative w-full h-full">
            <Image
              src="/caricatureBanner.png"
              alt="Caricature banner"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </button>

        <button
          type="button"
          onClick={sendGiftFlow}
          disabled={isSubmittingGift}
          className="w-full rounded-xl overflow-hidden shadow-lg disabled:opacity-70 disabled:cursor-not-allowed h-[180px] sm:h-[240px] md:h-[280px]"
          aria-label="Send data without photo"
        >
          <div className="relative w-full h-full">
            <Image
              src="/giftBanner.png"
              alt="Gift banner"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </button>
      </div>
    </div>
  );
}

export default function PhotoSelectionPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen w-full flex flex-col items-center justify-center"
          style={{ backgroundColor: "#033778" }}
        >
          <p className="text-white">Loading...</p>
        </div>
      }
    >
      <PhotoSelectionContent />
    </Suspense>
  );
}
