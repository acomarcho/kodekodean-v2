import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";
import { showSuccess, showError } from "@/lib/notifications";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { captchaKey } from "@/lib/constants/hcaptcha";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  token: string;
};

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    token: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadingFlag = isLoading;

  const router = useRouter();

  const captchaRef = useRef<HCaptcha>(null);

  return (
    <div className="wrapper">
      <LoadingOverlay visible={loadingFlag} overlayBlur={2} />
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

              if (isLoading) {
                return;
              }

              const handleSubmit = async () => {
                try {
                  setIsLoading(true);
                  await axios.post("/api/register", {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                  });
                  showSuccess(
                    "Berhasil mendaftarkan akun! Silakan masuk ke akun Anda!"
                  );
                  router.push("/login");
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    showError(
                      error.response?.data.message ||
                        "Terjadi kesalahan pada server."
                    );
                  }
                } finally {
                  setIsLoading(false);
                  captchaRef.current?.resetCaptcha();
                }
              };

              handleSubmit();
            }}
            className="flex flex-col gap-[1rem] mt-[1rem]"
          >
            <div className="flex flex-col gap-[0.25rem">
              <label htmlFor="name" className="paragraph font-bold text-white">
                Nama <span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="bg-white px-[1rem] py-[0.5rem] paragraph text-black"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.currentTarget.value })
                }
              />
            </div>
            <div className="flex flex-col gap-[0.25rem">
              <label htmlFor="email" className="paragraph font-bold text-white">
                Email <span className="text-red">*</span>
              </label>
              <input
                type="email"
                id="email"
                className="bg-white px-[1rem] py-[0.5rem] paragraph text-black"
                placeholder="john@doe.com"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.currentTarget.value })
                }
              />
            </div>
            <div className="flex flex-col gap-[0.25rem">
              <label
                htmlFor="password"
                className="paragraph font-bold text-white"
              >
                Password <span className="text-red">*</span>
              </label>
              <input
                type="password"
                id="password"
                className="bg-white px-[1rem] py-[0.5rem] paragraph text-black"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.currentTarget.value })
                }
              />
            </div>
            <div className="flex flex-col gap-[0.25rem">
              <label
                htmlFor="captcha"
                className="paragraph font-bold text-white"
              >
                Captcha <span className="text-red">*</span>
              </label>
              <HCaptcha
                sitekey={captchaKey}
                onVerify={(v) => {
                  setForm({ ...form, token: v });
                }}
                ref={captchaRef}
              />
            </div>
            <button
              type="submit"
              className="button-primary"
              disabled={
                !form.name ||
                !form.email ||
                !form.password ||
                !form.token ||
                isLoading
              }
            >
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
