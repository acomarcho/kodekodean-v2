import Course from "@/components/course";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function CoursesPage() {
  return (
    <>
      <Head>
        <title>Courses</title>
        <meta
          name="description"
          content="Pilih salah satu kursus yang kami sediakan dalam kodekodean.id!"
        />
      </Head>
      <Navbar />
      <Course />
    </>
  );
}
