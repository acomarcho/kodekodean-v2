import Link from "next/link";
import Image from "next/image";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState, useRef } from "react";
import { Slide } from "react-awesome-reveal";

export default function Home() {
  const { height, width } = useViewportSize();

  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFooterHeight(footerRef.current?.getBoundingClientRect().height || 0);
  }, [height, width]);

  return (
    <div className="wrapper relative">
      <Slide>
        <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center">
          <div>
            <h1 className="heading text-white">
              Belajar pemrograman langsung menggunakan{" "}
              <span className="text-cyan">kurikulum dari ITB</span>, dengan
              materi yang disusun oleh lulusan{" "}
              <span className="text-green">Teknik Informatika ITB</span>.
            </h1>
            <p className="paragraph text-lightgray mt-[1rem]">
              Di <span className="font-bold text-white">kodekodean.id</span>,
              Anda akan diajari pemrograman dari tingkat fundamental sampai Anda
              bisa cukup percaya diri. Anda akan diajarkan cara berpikir
              komputasional yang baik untuk memecahkan masalah-masalah yang ada
              di dunia nyata.
            </p>
            <p className="paragraph text-lightgray mt-[1rem]">
              Persoalan-persoalan yang kami berikan dalam kelas ini diambil dan
              dimodifikasi dari persoalan-persoalan yang diberikan kepada
              mahasiswa ITB pada mata kuliah Pengenalan Komputasi. Jadi,
              materinya dijamin menarik dan bermanfaat!
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
              Terinspirasi dari kelas-kelas perkuliahan yang lama dan
              membosankan, kami berusaha menyediakan intisari dari ilmu
              pemrograman yang kami dapatkan di ITB secara ringkas tanpa
              memotong pemahaman. Kelas-kelas yang kami bawa{" "}
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
        <div className="flex flex-col gap-[1rem] lg:flex-row lg:items-center mt-[2rem]">
          <div>
            <h1 className="heading text-white">
              <span className="text-cyan">Harga yang sangat cocok</span> untuk{" "}
              <span className="text-purple">kalangan mahasiswa</span>. Tidak
              perlu mengeluarkan banyak uang!
            </h1>
            <p className="paragraph text-lightgray mt-[1rem]">
              Kami memiliki keyakinan bahwa edukasi yang baik layak dimiliki
              oleh setiap kalangan masyarakat. Oleh karena itu, kami berusaha
              untuk menyediakan konten pembelajaran secara{" "}
              <span className="font-bold">gratis</span>.
            </p>
          </div>
          <Image
            src="/images/hero_wallet.png"
            alt=""
            width={316}
            height={315}
            className="mx-auto"
          />
        </div>
      </Slide>
      <div style={{ marginTop: `${footerHeight}px` }} />
      <div className="fixed left-0 bottom-0 w-full bg-darkgray" ref={footerRef}>
        <div className="max-w-[1160px] mx-auto p-[2rem]">
          <h1 className="heading text-white text-center">
            Yuk, belajar sekarang di kodekodean.id!
          </h1>
          <div className="mt-[1rem]">
            <Link href="/" className="button-primary block">
              Mulai belajar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
