import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="wrapper">
      <h1 className="heading text-white">
        Maaf, Anda tidak memiliki akses untuk melihat halaman ini.
      </h1>
      <Link href="/login" className="button-primary mt-[1rem] inline-block">
        Masuk ke akun Anda
      </Link>
    </div>
  );
}
