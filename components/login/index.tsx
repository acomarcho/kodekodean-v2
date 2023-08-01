import Link from "next/link";
import Image from "next/image";

export default function Login() {
  return (
    <div className="wrapper">
      <div className="flex items-center">
        <div className="lg:w-[50%]">
          <h1 className="heading text-white">
            <span className="text-yellow">Masuk</span> ke akunmu
          </h1>
          <p className="paragraph text-lightgray mt-[0.5rem]">
            Yuk, masuk ke akunmu di{" "}
            <span className="text-green">kodekodean.id</span> untuk kembali
            belajar!
          </p>
          <p className="paragraph text-lightgray mt-[0.5rem]">
            Belum punya akun?{" "}
            <Link href="/register" className="text-cyan underline">
              Buat akun baru
            </Link>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-[1rem] mt-[1rem]"
          >
            <div className="flex flex-col gap-[0.25rem">
              <label htmlFor="email" className="paragraph font-bold text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white px-[1rem] py-[0.5rem] paragraph text-black"
                placeholder="john@doe.com"
              />
            </div>
            <div className="flex flex-col gap-[0.25rem">
              <label
                htmlFor="password"
                className="paragraph font-bold text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-white px-[1rem] py-[0.5rem] paragraph text-black"
              />
            </div>
            <button type="submit" className="button-primary">
              Masuk
            </button>
          </form>
        </div>
        <Image
          src="/images/login.png"
          width={316}
          height={424}
          alt=""
          className="mx-auto hidden lg:block"
        />
      </div>
    </div>
  );
}