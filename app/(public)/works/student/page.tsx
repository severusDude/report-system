"use client";

import Image from "next/image";
import Link from "next/link";
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

function WorkCard({
  id,
  image,
  title,
  rating,
  date,
}: {
  id: number;
  image: string;
  title: string;
  rating: number;
  date: string;
}) {
  return (
    <div className="bg-pink-400/90 backdrop-blur-sm rounded-xl p-4 mb-4 relative">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={160}
            height={160}
            className="object-cover w-full h-full"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="text-white font-semibold text-lg mb-2">{title}</h4>
            <StarRating rating={rating} />
          </div>
          <Link
            href={`/works/student/${id}`}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg w-fit mt-4 transition-colors inline-block"
          >
            VIEW
          </Link>
        </div>
      </div>

      {/* Date */}
      <div className="absolute top-4 right-4 text-white text-sm font-medium">
        {date}
      </div>
    </div>
  );
}

export default function StudentWorks() {
  const works = [
    {
      id: 1,
      image: "/karya1.png",
      title: "Gambar Kaligrafi",
      rating: 3,
      date: "12-05-2025",
      pembina: "Ustadz Hasan",
      deskripsi:
        "Untuk melatih kreativitas Ananda dalam hal Seni, kami memberikan tugas untuk membuat kaligrafi bebas bla bla bla bla bla bla bla bla bla, hasil kaligrafi buatan Ananda sangat bagus bla bla bla bla bla.",
    },
    {
      id: 2,
      image: "/karya2.png",
      title: "Karya Seni",
      rating: 4,
      date: "10-05-2025",
      pembina: "Ustadzah Siti",
      deskripsi:
        "Karya seni ini menunjukkan kemampuan Ananda dalam menggambar dan mewarnai. Hasilnya sangat memuaskan dan menunjukkan perkembangan yang baik.",
    },
    {
      id: 3,
      image: "/karya3.png",
      title: "Proyek Kreatif",
      rating: 5,
      date: "08-05-2025",
      pembina: "Ustadz Ahmad",
      deskripsi:
        "Proyek kreatif ini menunjukkan inovasi dan kreativitas Ananda dalam membuat karya yang bermanfaat dan menarik.",
    },
  ];

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

          {/* Main Content Area - Works List */}
          <main className="flex-1">
            <div className="bg-pink-50/90 backdrop-blur-sm rounded-xl p-6 min-h-[600px]">
              <h2
                className={`${inter.className} text-2xl font-bold text-zinc-800 mb-6`}
              >
                Student Works
              </h2>

              <div className="space-y-4">
                {works.map((work) => (
                  <WorkCard
                    key={work.id}
                    id={work.id}
                    image={work.image}
                    title={work.title}
                    rating={work.rating}
                    date={work.date}
                  />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
