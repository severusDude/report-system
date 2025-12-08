"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

const generalStudies = [
  "Matematika",
  "IPA",
  "Pendidikan Pancasila",
  "Pendidikan Karakter",
  "Bahasa Inggris",
  "Bahasa Indonesia",
  "Bahasa Sunda",
  "Seni Budaya",
  "PJOK",
];

const islamicStudies = [
  "Pembiasaan Al-Qur'an",
  "Aqidah",
  "Akhlak",
  "Fiqh",
  "Bahasa Arab",
];

export default function Report() {
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [nilaiGeneral, setNilaiGeneral] = useState<Record<string, number>>({});
  const [nilaiIslamic, setNilaiIslamic] = useState<Record<string, number>>({});

  // Generate random nilai (70-100) ketika kelas atau semester berubah
  useEffect(() => {
    if (selectedKelas && selectedSemester) {
      const generateNilai = () => {
        const newNilaiGeneral: Record<string, number> = {};
        const newNilaiIslamic: Record<string, number> = {};

        generalStudies.forEach((subject) => {
          newNilaiGeneral[subject] = Math.floor(Math.random() * 31) + 70; // 70-100
        });

        islamicStudies.forEach((subject) => {
          newNilaiIslamic[subject] = Math.floor(Math.random() * 31) + 70; // 70-100
        });

        setNilaiGeneral(newNilaiGeneral);
        setNilaiIslamic(newNilaiIslamic);
      };

      generateNilai();
    } else {
      // Reset nilai jika kelas atau semester kosong
      setNilaiGeneral({});
      setNilaiIslamic({});
    }
  }, [selectedKelas, selectedSemester]);
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
      {/* Overlay gradient pink */}
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
              <Link href="/works" className="text-sm font-medium text-zinc-700">
                Works
              </Link>
              <Link
                href="/report"
                className="text-sm font-medium text-[#5BB29D]"
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
          {/* Left Sidebar - Student Information */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-[#5BB29D]/90 backdrop-blur-sm rounded-2xl p-6 text-white">
              {/* Profile Picture */}
              <div className="flex justify-center mb-4">
                <div className="h-32 w-32 rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
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

              {/* Class and Semester Selection */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
                  <span className="text-sm">Pilih Kelas</span>
                  <select
                    value={selectedKelas}
                    onChange={(e) => setSelectedKelas(e.target.value)}
                    className="h-8 w-12 rounded-full bg-white text-[#5BB29D] text-center font-bold border-none outline-none cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235BB29D' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 4px center",
                      paddingRight: "20px",
                    }}
                  >
                    <option value="" className="text-[#5BB29D]">
                      -
                    </option>
                    {[1, 2, 3, 4, 5, 6].map((kelas) => (
                      <option
                        key={kelas}
                        value={kelas.toString()}
                        className="text-[#5BB29D]"
                      >
                        {kelas}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-between bg-white/20 rounded-lg p-3">
                  <span className="text-sm">Pilih Semester</span>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="h-8 w-12 rounded-full bg-white text-[#5BB29D] text-center font-bold border-none outline-none cursor-pointer appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%235BB29D' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 4px center",
                      paddingRight: "20px",
                    }}
                  >
                    <option value="" className="text-[#5BB29D]">
                      -
                    </option>
                    <option value="1" className="text-[#5BB29D]">
                      1
                    </option>
                    <option value="2" className="text-[#5BB29D]">
                      2
                    </option>
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <p>Email: AkuSakhaMakarim13@gmail.com</p>
                <p>Nomor: 082255555555555</p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-6">
            {/* Academic Subjects Section */}
            <div className="bg-gray-100/90 backdrop-blur-sm rounded-xl p-6">
              {/* General Studies */}
              <div className="mb-6">
                <h3
                  className={`${inter.className} text-[#5BB29D] text-lg font-bold mb-4`}
                >
                  General Studies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {generalStudies.map((subject) => (
                    <div
                      key={subject}
                      className="flex justify-between items-center"
                    >
                      <p className="text-gray-700">{subject}</p>
                      {selectedKelas &&
                        selectedSemester &&
                        nilaiGeneral[subject] && (
                          <span className="text-[#5BB29D] font-bold">
                            {nilaiGeneral[subject]}
                          </span>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Al-Qur'an & Islamic Studies */}
              <div className="mb-6">
                <h3
                  className={`${inter.className} text-[#5BB29D] text-lg font-bold mb-4`}
                >
                  Al-Qur'an & Islamic Studies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {islamicStudies.map((subject) => (
                    <div
                      key={subject}
                      className="flex justify-between items-center"
                    >
                      <p className="text-gray-700">{subject}</p>
                      {selectedKelas &&
                        selectedSemester &&
                        nilaiIslamic[subject] && (
                          <span className="text-[#5BB29D] font-bold">
                            {nilaiIslamic[subject]}
                          </span>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-red-600 transition-colors">
                  UNDUH PDF
                </button>
                <Link
                  href="/works/student"
                  className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors text-center"
                >
                  Lihat Detail Nilai
                </Link>
              </div>
            </div>

            {/* Right Side Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Behavior Section */}
              <div className="bg-gray-100/90 backdrop-blur-sm rounded-xl p-6">
                <h3
                  className={`${inter.className} text-[#5BB29D] text-lg font-bold mb-4`}
                >
                  Sikap & Perilaku
                </h3>
                {/* Bar Chart */}
                <div className="space-y-2 mb-4">
                  <div className="relative">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-8 rounded-full flex items-center"
                        style={{ width: "60%" }}
                      >
                        <span className="text-white text-sm font-medium pl-3">
                          senyum
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-8 rounded-full flex items-center"
                        style={{ width: "75%" }}
                      >
                        <span className="text-white text-sm font-medium pl-3">
                          sapa
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-8 rounded-full flex items-center"
                        style={{ width: "90%" }}
                      >
                        <span className="text-white text-sm font-medium pl-3">
                          salam
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-8 rounded-full flex items-center"
                        style={{ width: "78%" }}
                      >
                        <span className="text-white text-sm font-medium pl-3">
                          sopan
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-blue-500 h-8 rounded-full flex items-center"
                        style={{ width: "82%" }}
                      >
                        <span className="text-white text-sm font-medium pl-3">
                          santun
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Emoji scale below chart */}
                <div className="flex justify-center gap-3 text-2xl pt-2">
                  <span>😐</span>
                  <span>🙂</span>
                  <span>😀</span>
                  <span>😉</span>
                  <span>😍</span>
                  <span>🥰</span>
                </div>
              </div>

              {/* Attendance Section */}
              <div className="bg-gray-100/90 backdrop-blur-sm rounded-xl p-6">
                <h3
                  className={`${inter.className} text-[#5BB29D] text-lg font-bold mb-4`}
                >
                  Presensi
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Izin</span>
                    <span className="text-gray-700 font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sakit</span>
                    <span className="text-gray-700 font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tanpa Keterangan</span>
                    <span className="text-gray-700 font-semibold">-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Notes Section */}
            <div className="bg-gray-100/90 backdrop-blur-sm rounded-xl p-6">
              <h3
                className={`${inter.className} text-[#5BB29D] text-lg font-bold mb-4`}
              >
                Catatan Siswa:
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Ananda menunjukkan perkembangan yang sangat baik selama di
                semester ini. Hafalan surat-surat pendek semakin lancar dan
                konsisten dalam setiap evaluasi. Nilai pelajaran agama juga
                pelajaran umum juga tercapai dengan seimbang, menggambarkan
                usaha belajar yang stabil. Sikap dan tanggung jawab Ananda turut
                mendukung keberhasilan proses belajar sehari-hari. Perkembangan
                sosialnya juga tampak positif dalam kerja sama kelompok dan
                menjaga komunikasi baik.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
