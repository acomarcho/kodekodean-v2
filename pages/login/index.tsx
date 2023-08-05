import Login from "@/components/login";
import Navbar from "@/components/navbar";
import Head from "next/head";

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Mulai belajar di kodekodean.id!" />
      </Head>
      <Navbar />
      <Login />
    </>
  );
}
