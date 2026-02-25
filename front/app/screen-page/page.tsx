import Image from "next/image";

export default function ScreenPage() {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <section
        className="flex-1 min-h-0 w-full flex flex-col items-center justify-center px-4 py-6"
        style={{ backgroundColor: "#033778" }}
      >
        <div className="w-full flex justify-center flex-shrink-0 px-2">
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

        <h1
          className="mt-6 text-white text-center font-bold text-xl sm:text-2xl md:text-3xl leading-tight px-2"
          style={{
            fontFamily: "sans-serif",
            fontWeight: "bold",
          }}
        >
          People Passionate about Technology
        </h1>
      </section>

      <section className="flex-1 min-h-0 w-full bg-black">
        <video
          className="w-full h-full object-cover"
          src="/the-ernian-journey.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </section>
    </div>
  );
}
