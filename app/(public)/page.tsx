import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["700"],
});

function IconCard({ src, label }: { src: string; label: string }) {
  return (
    <Link
      href="#"
      className="group inline-flex flex-col items-center gap-3 w-52 md:w-56"
    >
      <div
        className="h-48 w-48 md:h-56 md:w-56 rounded-lg bg-white transition-transform transform hover:-translate-y-2 hover:scale-105 overflow-hidden flex items-center justify-center"
        style={{ border: "none" }}
      >
        <Image
          src={src}
          alt={label}
          width={160}
          height={160}
          className="object-cover w-full h-full"
          style={{ border: "none" }}
          unoptimized
        />
      </div>
      <span className="mt-3 w-full text-center text-sm md:text-base font-semibold text-zinc-700 group-hover:text-pink-400">
        {label}
      </span>
    </Link>
  );
}

export default async function Home() {
  return (
    <div className="min-h-screen font-sans leading-relaxed">
      {/* Gradient Section */}
      <div className="bg-gradient-to-b from-pink-50 to-[#5BB29D]">
        <main className="mx-auto max-w-7xl px-6 py-10">
          {/* Hero Section */}
          <section
            id="hero"
            className="flex flex-col items-center md:items-start gap-6 md:gap-12 py-12"
          >
            <div className="w-full text-center md:text-left">
              <h1
                className={inter.className}
                style={{
                  color: "#5BB29D",
                  fontSize: "clamp(32px, 8vw, 64px)",
                  fontStyle: "normal",
                  fontWeight: 700,
                }}
              >
                <div>We Prepare</div>
                <div>
                  Your <span style={{ color: "#EC4899" }}>CHILD</span> For Life!
                </div>
              </h1>
            </div>
          </section>

          {/* Icon Cards Section */}
          <section id="icon-cards" className="mt-8 py-4">
            <div className="flex w-full justify-center flex-wrap items-center gap-12 md:gap-16">
              <IconCard src="/profile.png" label="PROFILE" />
              <IconCard src="/overview.png" label="OVERVIEW" />
              <IconCard src="/report.png" label="REPORT" />
              <IconCard src="/work.png" label="WORK" />
            </div>
          </section>

          {/* Title Section */}
          <section id="overview" className="mt-8 text-center py-4">
            <div>
              <h2
                className={inter.className}
                style={{
                  color: "#5BB29D",
                  fontSize: "clamp(32px, 8vw, 64px)",
                  fontStyle: "normal",
                  fontWeight: 700,
                }}
              >
                Ibnu Siena <span style={{ color: "#EC4899" }}>Mulia</span>
              </h2>
              <p className="mt-3 text-xl md:text-2xl lg:text-3xl font-semibold text-pink-400">
                Tasikmalaya
              </p>
            </div>
          </section>

          {/* Photo Cluster - Arc layout PERSIS seperti Figma */}
          <section id="photo-cluster" className="mt-4 py-4 pb-8">
            <div className="flex items-center justify-center px-4">
              <div
                className="relative mx-auto"
                style={{ width: "100%", maxWidth: "1100px", height: "320px" }}
              >
                {/* Left Bottom - Profile (paling kiri bawah) */}
                <div
                  className="absolute h-36 w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white"
                  style={{ left: "0%", bottom: "0px", zIndex: 10 }}
                >
                  <Image
                    src="/bulat1.png"
                    alt="bulat1"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Left Top - Overview (kiri tengah, lebih tinggi) */}
                <div
                  className="absolute h-36 w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white"
                  style={{ left: "18%", top: "30px", zIndex: 15 }}
                >
                  <Image
                    src="/bulat2.png"
                    alt="bulat2"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Center Top - Hero (tengah sempurna, paling atas, paling besar) */}
                <div
                  className="absolute h-44 w-44 md:h-52 md:w-52 lg:h-56 lg:w-56 rounded-full border-2 border-white shadow-xl overflow-hidden bg-white"
                  style={{
                    left: "50%",
                    top: "0",
                    transform: "translateX(-50%)",
                    zIndex: 20,
                  }}
                >
                  <Image
                    src="/bulat3.png"
                    alt="bulat3"
                    width={224}
                    height={224}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Right Top - Report (kanan tengah, mirror dari overview) */}
                <div
                  className="absolute h-36 w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white"
                  style={{ right: "18%", top: "30px", zIndex: 15 }}
                >
                  <Image
                    src="/bulat4.png"
                    alt="bulat4"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                {/* Right Bottom - Work (paling kanan bawah, mirror dari profile) */}
                <div
                  className="absolute h-36 w-36 md:h-44 md:w-44 lg:h-48 lg:w-48 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white"
                  style={{ right: "0%", bottom: "0px", zIndex: 10 }}
                >
                  <Image
                    src="/bulat5.png"
                    alt="bulat5"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Section after gradient */}
      <div className="bg-[#5BB29D]">
        <main className="mx-auto max-w-7xl px-6 py-10">
          {/* Perkenalan Section - Overlapping Layout */}
          <section id="perkenalan" className="mt-8 md:mt-12 py-8">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">
              <div className="relative flex items-center justify-center order-first lg:order-none min-h-[300px] md:min-h-[400px]">
                {/* Hero-1-2.png - Behind/Bottom */}
                <div className="absolute z-10 translate-x-4 translate-y-4">
                  <Image
                    src="/hero-1-2.png"
                    alt="kids bottom"
                    width={500}
                    height={350}
                    className="object-cover w-[380px] h-[240px] md:w-[440px] md:h-[300px] lg:w-[500px] lg:h-[350px] rounded-xl"
                    unoptimized
                  />
                </div>
                {/* Hero-1.png - Front/Top */}
                <div className="relative z-20">
                  <Image
                    src="/hero-1.png"
                    alt="kids top"
                    width={500}
                    height={350}
                    className="object-cover w-[380px] h-[240px] md:w-[440px] md:h-[300px] lg:w-[500px] lg:h-[350px] rounded-xl"
                    unoptimized
                  />
                </div>
              </div>
              <div className="rounded-2xl bg-pink-50 p-6 shadow-lg">
                <div className="text-sm text-zinc-700">
                  <p className="mb-4">
                    Selamat datang di Ibnu Siena Mulia, sekolah yang membina
                    siswa berkarakter dan berprestasi melalui Kurikulum MULIA,
                    agar tumbuh menjadi pribadi unggul, berintegritas, dan siap
                    berkontribusi bagi masa depan bangsa.
                  </p>
                  <p className="text-sm">
                    Di SIT Ibnu Siena Mulia, pendidikan kami menumbuhkan manusia
                    seutuhnya, cerdas, beriman, dan berakhlak. Filosofi kami
                    berpijak pada empat pilar: Al-Qur&apos;an, akademik,
                    kebangsaan, dan leadership. Semua pilar ini diterapkan dalam
                    pembentukan lima karakter utama: Mandiri, Unggul, Literat,
                    Iman, dan Amanah. Kami menyeimbangkan nilai keislaman,
                    kecerdasan, dan kepemimpinan agar siswa tumbuh menjadi
                    pribadi yang berilmu, bertanggung jawab, dan berdampak.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Visi & Misi Section - Overlapping Layout */}
          <section id="visi-misi" className="mt-12 py-12">
            <div className="relative flex flex-col lg:flex-row items-start gap-6">
              {/* Text Content - Left, behind */}
              <div className="relative z-10 lg:w-2/3 -mr-0 lg:-mr-16">
                <div className="space-y-6">
                  <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-lg font-semibold text-[#5BB29D]">
                      Visi
                    </h3>
                    <p className="mt-2 text-sm text-zinc-700">
                      Mempersiapkan peserta didik sebagai pemimpin yang
                      mencintai Al-Quran, cerdas, dan siap memimpin bangsa.
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-lg font-semibold text-[#5BB29D]">
                      Misi
                    </h3>
                    <ul className="mt-3 list-disc pl-5 text-sm text-zinc-700">
                      <li>
                        Mendidik siswa memiliki kecintaan terhadap alquran dan
                        memiliki pemahaman keislaman yang menyeluruh
                      </li>
                      <li>
                        Mengenali dan mengembangkan kecerdasan holistic dan
                        potensi akademik siswa
                      </li>
                      <li>
                        Mendidik siswa menjadi pribadi yang berakhlak mulia.
                      </li>
                      <li>
                        Mendidik setiap siswa menjadi pribadi yang memiliki
                        karakter, kepemimpinan, bertanggung jawab dan mandiri
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Images - Right, overlapping */}
              <div className="relative z-20 lg:absolute lg:right-0 lg:top-0 -mt-8 lg:mt-0 lg:-ml-16">
                {/* Visi-misi-1.png - Behind/Bottom */}
                <div className="absolute translate-x-4 translate-y-4 z-10">
                  <div className="rounded-xl">
                    <Image
                      src="/visi-misi-1.png"
                      alt="Visi dan Misi bottom"
                      width={420}
                      height={260}
                      className="object-cover w-[280px] md:w-[330px] lg:w-[400px] h-auto"
                      unoptimized
                    />
                  </div>
                </div>
                {/* Visi-misi.png - Front/Top */}
                <div className="relative z-20">
                  <div className="rounded-xl">
                    <Image
                      src="/visi-misi.png"
                      alt="Visi dan Misi top"
                      width={420}
                      height={260}
                      className="object-cover w-[280px] md:w-[330px] lg:w-[400px] h-auto"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
