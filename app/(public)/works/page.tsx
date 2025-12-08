import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Works() {
  return (
    <div className="min-h-screen font-sans leading-relaxed relative">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
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
              <Image
                src="/logo-ibnu-siena.png"
                alt="Ibnu Siena Mulia logo"
                width={160}
                height={40}
                className="object-contain"
                priority
                unoptimized
              />
            </div>
            <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-6">
              <Link href="/" className="text-sm font-medium text-zinc-700">
                Home
              </Link>
              <Link
                href="/overview"
                className="text-sm font-medium text-zinc-700"
              >
                Overview
              </Link>
              <Link
                href="/works"
                className="text-sm font-medium text-[#5BB29D]"
              >
                Works
              </Link>
              <Link
                href="/report"
                className="text-sm font-medium text-zinc-700"
              >
                Report
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="rounded-md bg-pink-400 px-3 py-1 text-sm font-semibold text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content - Profile Card */}
        <main className="mx-auto max-w-4xl px-6 py-10">
          <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
            {/* Profile Card */}
            <div className="w-full max-w-md bg-pink-400 rounded-2xl p-8 shadow-2xl">
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="h-32 w-32 md:h-40 md:w-40 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg">
                    <Image
                      src="/profile-student.png"
                      alt="Profile"
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Name */}
              <h2
                className={`${inter.className} text-center text-2xl md:text-3xl font-bold text-white mb-6`}
              >
                Mochammad Sakha Makarim
              </h2>

              {/* Details - Center Aligned */}
              <div className="space-y-3 mb-8 text-center">
                <p className="text-white text-base md:text-lg">Kelas 1</p>
                <p className="text-white text-base md:text-lg">Semester 1</p>
                <p className="text-white text-base md:text-lg">
                  Jakarta, 13 November 2019
                </p>
                <p className="text-white text-base md:text-lg">
                  Email : AkuSakhaMakarim13@gmail.com
                </p>
                <p className="text-white text-base md:text-lg">
                  Nomor : 082255555555555
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-[#5BB29D] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#4a9d8a] transition-colors">
                  EDIT
                </button>
                <button className="flex-1 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
                  LOG OUT
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
