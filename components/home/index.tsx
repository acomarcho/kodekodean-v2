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
        <Image src="/images/hero_code.png" alt="" width={481} height={652} className="mx-auto" />
      </div>
    </div>
  );
}
