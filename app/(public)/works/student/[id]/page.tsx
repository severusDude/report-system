"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-lg">
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}

// Data works (sama dengan di parent page)
const worksData: Record<
  number,
  {
    id: number;
    image: string;
    title: string;
    rating: number;
    date: string;
    pembina: string;
    deskripsi: string;
  }
> = {
  1: {
    id: 1,
    image: "/karya1.png",
    title: "Gambar Kaligrafi",
    rating: 3,
    date: "12-05-2025",
    pembina: "Ustadz Hasan",
    deskripsi:
      "Untuk melatih kreativitas Ananda dalam hal Seni, kami memberikan tugas untuk membuat kaligrafi bebas bla bla bla bla bla bla bla bla bla, hasil kaligrafi buatan Ananda sangat bagus bla bla bla bla bla.",
  },
  2: {
    id: 2,
    image: "/karya2.png",
    title: "Karya Seni",
    rating: 4,
    date: "10-05-2025",
    pembina: "Ustadzah Siti",
    deskripsi:
      "Karya seni ini menunjukkan kemampuan Ananda dalam menggambar dan mewarnai. Hasilnya sangat memuaskan dan menunjukkan perkembangan yang baik.",
  },
  3: {
    id: 3,
    image: "/karya3.png",
    title: "Proyek Kreatif",
    rating: 5,
    date: "08-05-2025",
    pembina: "Ustadz Ahmad",
    deskripsi:
      "Proyek kreatif ini menunjukkan inovasi dan kreativitas Ananda dalam membuat karya yang bermanfaat dan menarik.",
  },
};

export default function WorkDetail() {
  const params = useParams();
  const router = useRouter();
  const workId = parseInt(params.id as string);
  const work = worksData[workId];

  if (!work) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Work not found</p>
      </div>
    );
  }

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

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 mx-auto max-w-7xl px-6 py-8">
          {/* Left Sidebar - Student Profile */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-pink-400/90 backdrop-blur-sm rounded-2xl p-6 text-white sticky top-24">
              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                <div className="h-32 w-32 rounded-full border-2 border-white overflow-hidden bg-white shadow-lg">
                  <Image
                    src="/profile-student.png"
                    alt="Profile"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              </div>

              {/* Name */}
              <h2
                className={`${inter.className} text-center text-xl font-bold mb-2`}
              >
                Mochammad Sakha Makarim
              </h2>

              {/* Location and DOB */}
              <p className="text-center text-sm mb-6">
                Jakarta, 13 November 2019
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <p>Email :</p>
                <p>AkuSakhaMakarim13@gmail.com</p>
                <p className="mt-3">Nomor :</p>
                <p>082255555555555</p>
              </div>
            </div>
          </aside>

          {/* Main Content Area - Work Detail */}
          <main className="flex-1">
            <div className="bg-gray-100/90 backdrop-blur-sm rounded-xl p-6">
              {/* Work Image */}
              <div className="mb-6">
                <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              </div>

              {/* Work Details */}
              <div className="space-y-4">
                <h2
                  className={`${inter.className} text-3xl font-bold text-zinc-800`}
                >
                  {work.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <StarRating rating={work.rating} />
                </div>

                {/* Pembina and Date */}
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-semibold">Pembina:</span>{" "}
                    {work.pembina}
                  </p>
                  <p>
                    <span className="font-semibold">Tanggal:</span> {work.date}
                  </p>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <h3
                    className={`${inter.className} text-[#5BB29D] text-lg font-bold mb-3`}
                  >
                    Deskripsi:
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {work.deskripsi}
                  </p>
                </div>

                {/* Close Button */}
                <div className="flex justify-end mt-8">
                  <Link
                    href="/works/student"
                    className="bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                  >
                    Close
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
