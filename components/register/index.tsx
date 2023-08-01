import Link from "next/link";
import Image from "next/image";

export default function Register() {
  return (
    <div className="wrapper">
      <div className="flex items-center">
        <div className="lg:w-[50%]">
          <h1 className="heading text-white">
            <span className="text-yellow">Buat</span> akun baru
          </h1>
          <p className="paragraph text-lightgray mt-[0.5rem]">
            Yuk, buat akun di <span className="text-green">kodekodean.id</span>{" "}
            untuk mulai belajar!
          </p>
          <p className="paragraph text-lightgray mt-[0.5rem]">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-cyan underline">
              Masuk
            </Link>
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col gap-[1rem] mt-[1rem]"
          >
            <div className="flex flex-col gap-[0.25rem">
              <label htmlFor="name" className="paragraph font-bold text-white">
                Nama
              </label>
              <input
                type="text"
                id="name"
                className="bg-white px-[1rem] py-[0.5rem] paragraph text-black"
                placeholder="John Doe"
              />
            </div>
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
              Buat akun
            </button>
          </form>
        </div>
        <Image
          src="/images/register.png"
          width={316}
          height={579}
          alt=""
          className="mx-auto hidden lg:block"
        />
      </div>
    </div>
  );
}
