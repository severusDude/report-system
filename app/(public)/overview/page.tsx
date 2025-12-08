import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

function CircularCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-48 w-48 md:h-56 md:w-56 rounded-full overflow-hidden bg-white shadow-lg transition-transform transform hover:-translate-y-2 hover:scale-105">
      <Image src={src} alt={alt} width={224} height={224} className="object-cover w-full h-full" unoptimized />
    </div>
  );
}

export default function Overview() {
  return (
    <div className="min-h-screen font-sans leading-relaxed relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Overlay gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-pink-50/80 to-[#5BB29D]/80" />
      
      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/30 backdrop-blur-sm">
        <div className="mx-auto relative flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo-ibnu-siena.png" alt="Ibnu Siena Mulia logo" width={160} height={40} className="object-contain" priority unoptimized />
          </div>
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-6">
            <Link href="/" className="text-sm font-medium text-zinc-700">Home</Link>
            <Link href="/overview" className="text-sm font-medium text-[#5BB29D]">Overview</Link>
            <Link href="/works" className="text-sm font-medium text-zinc-700">Works</Link>
            <Link href="/report" className="text-sm font-medium text-zinc-700">Report</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="rounded-md bg-pink-400 px-3 py-1 text-sm font-semibold text-white">Login</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Section: Riwayat Karya */}
        <section id="riwayat-karya" className="mt-8 py-8">
          <h2 className={`${inter.className} mb-6 text-2xl md:text-3xl font-bold text-zinc-800`}>Riwayat Karya:</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <CircularCard src="/karya1.png" alt="Karya 1" />
            <CircularCard src="/karya2.png" alt="Karya 2" />
            <CircularCard src="/karya3.png" alt="Karya 3" />
          </div>
        </section>

        {/* Section: Kegiatan Anak */}
        <section id="kegiatan-anak" className="mt-12 py-8">
          <h2 className={`${inter.className} mb-6 text-2xl md:text-3xl font-bold text-zinc-800`}>Kegiatan Anak:</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <CircularCard src="/kegiatan1.png" alt="Kegiatan 1" />
            <CircularCard src="/kegiatan2.png" alt="Kegiatan 2" />
            <CircularCard src="/kegiatan3.png" alt="Kegiatan 3" />
          </div>
        </section>

        {/* Section: Lingkungan Belajar */}
        <section id="lingkungan-belajar" className="mt-12 py-8">
          <h2 className={`${inter.className} mb-6 text-2xl md:text-3xl font-bold text-zinc-800`}>Lingkungan Belajar:</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <CircularCard src="/lingkungan1.png" alt="Lingkungan 1" />
            <CircularCard src="/lingkungan2.png" alt="Lingkungan 2" />
            <CircularCard src="/lingkungan3.png" alt="Lingkungan 3" />
            <CircularCard src="/lingkungan4.png" alt="Lingkungan 4" />
          </div>
        </section>
        <section id="Pembina-Anak" className="mt-12 py-8">
          <h2 className={`${inter.className} mb-6 text-2xl md:text-3xl font-bold text-zinc-800`}>Pembina Anak:</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <CircularCard src="/pembina1.png" alt="Pembina Anak 1" />
            <CircularCard src="/pembina2.png" alt="Pembina Anak 2" />
            <CircularCard src="/pembina3.png" alt="Pembina Anak 3" />
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}

