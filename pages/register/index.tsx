import Register from "@/components/register";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Buat akun Anda di kodekodean.id!" />
      </Head>
      <Navbar />
      <Register />
    </>
  );
}
