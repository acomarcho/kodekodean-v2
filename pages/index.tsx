import Home from "@/components/home";
import Navbar from "@/components/navbar";

import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>kodekodean.id</title>
        <meta name="description" content="kodekodean.id: Belajar pemrograman langsung menggunakan kurikulum dari ITB, dengan materi yang disusun oleh lulusan Teknik Informatika ITB." />
       </Head>
      <Navbar />
      <Home />
    </>
  );
}
