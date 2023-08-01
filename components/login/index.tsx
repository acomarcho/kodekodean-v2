import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import axios from "axios";
import { showSuccess, showError } from "@/lib/notifications";
import { LoadingOverlay } from "@mantine/core";
import { useRouter } from "next/router";
import { LoginResponse } from "@/lib/constants/responses";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { captchaKey } from "@/lib/constants/hcaptcha";

type LoginForm = {
  email: string;
  password: string;
  token: string;
};

export default function Login() {
  const [form, setForm] = useState<LoginForm>({
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

              if (isLoading) {
                return;
              }

              const handleSubmit = async () => {
                try {
                  setIsLoading(true);
                  const { data } = await axios.post<LoginResponse>(
                    "/api/login",
                    {
                      email: form.email,
                      password: form.password,
                      token: form.token,
                    }
                  );
                  showSuccess(
                    "Berhasil masuk ke dalam akun. Selamat datang di kodekodean.id!"
                  );
                  localStorage.setItem("token", data.token);
                  router.push("/");
                } catch (error) {
                  if (axios.isAxiosError(error)) {
                    showError(
                      error.response?.data.message ||
                        "Terjadi kesalahan pada server."
                    );
                  }
                } finally {
                  setIsLoading(false);
                }
              };

              handleSubmit();
            }}
            className="flex flex-col gap-[1rem] mt-[1rem]"
          >
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
                !form.email || !form.password || !form.token || isLoading
              }
            >
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
