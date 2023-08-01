import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center">
        <div>
          <h1 className="heading text-white">
            Belajar pemrograman langsung menggunakan{" "}
            <span className="text-cyan">kurikulum dari ITB</span>, dengan materi
            yang disusun oleh lulusan{" "}
            <span className="text-green">Teknik Informatika ITB</span>.
          </h1>
          <p className="paragraph text-lightgray mt-[1rem]">
            Di <span className="font-bold text-white">kodekodean.id</span>, Anda
            akan diajari pemrograman dari tingkat fundamental sampai Anda bisa
            cukup percaya diri. Anda akan diajarkan cara berpikir komputasional
            yang baik untuk memecahkan masalah-masalah yang ada di dunia nyata.
          </p>
          <p className="paragraph text-lightgray mt-[1rem]">
            Persoalan-persoalan yang kami berikan dalam kelas ini diambil dan
            dimodifikasi dari persoalan-persoalan yang diberikan kepada
            mahasiswa ITB pada mata kuliah Pengenalan Komputasi. Jadi, materinya
            dijamin menarik dan bermanfaat!
          </p>
          <div className="flex flex-col gap-[1rem] mt-[1rem]">
            <Link href="/" className="button-primary">
              Mulai belajar
            </Link>
            <Link href="/" className="button-secondary">
              Lihat contoh materi
            </Link>
          </div>
        </div>
        <Image
          src="/images/hero_code.png"
          alt=""
          width={481}
          height={652}
          className="mx-auto"
        />
      </div>
      <div className="flex flex-col gap-[1rem] lg:flex-row-reverse lg:items-center mt-[2rem]">
        <div>
          <h1 className="heading text-white">
            Materi yang <span className="text-cyan">terstruktur</span>.{" "}
            <span className="text-red">Tidak bertele-tele</span> dengan
            penjelasan yang tidak penting.{" "}
            <span className="text-yellow italic">
              We value your time, attention, and energy
            </span>
            .
          </h1>
          <p className="paragraph text-lightgray mt-[1rem]">
            Terinspirasi dari kelas-kelas perkuliahan yang lama dan membosankan,
            kami berusaha menyediakan intisari dari ilmu pemrograman yang kami
            dapatkan di ITB secara ringkas tanpa memotong pemahaman. Kelas-kelas
            yang kami bawa{" "}
            <span className="font-bold text-white">
              berorientasi problem solving: terfokus pada latihan-latihan
              praktikal
            </span>
            .
          </p>
          <p className="paragraph text-lightgray mt-[1rem]">
            Materi kami sajikan dalam bentuk{" "}
            <span className="font-bold text-white">teks</span>,{" "}
            <span className="font-bold text-white">video</span>, dan{" "}
            <span className="font-bold text-white">soal-soal latihan</span>{" "}
            untuk Anda melakukan uji pemahaman.
          </p>
        </div>
        <Image
          src="/images/hero_read.png"
          alt=""
          width={316}
          height={392}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
