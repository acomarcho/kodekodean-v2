import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useContext } from "react";
import { UserContext } from "@/lib/contexts/user/context";
import { showSuccess } from "@/lib/notifications";
import { useRouter } from "next/router";
import { useViewportSize } from "@mantine/hooks";

export default function Navbar() {
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const user = useContext(UserContext);
  const router = useRouter();

  const { height, width } = useViewportSize();

  useEffect(() => {
    setNavHeight(navRef.current?.getBoundingClientRect().height || 0);
  }, [navRef, height, width]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full bg-black drop-shadow-lg z-[100]"
        ref={navRef}
      >
        <div className="max-w-[1160px] mx-auto px-[2rem] py-[1rem] flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={172}
              height={30}
              alt="kodekodean.id"
            />
          </Link>
          {user.id !== -1 && (
            <button
              className="button-primary"
              onClick={() => {
                localStorage.removeItem("token");
                showSuccess("Sampai jumpa lagi di lain kesempatan!");
                router.push("/login");
              }}
            >
              Keluar
            </button>
          )}
        </div>
      </nav>
      <div style={{ marginTop: navHeight }} />
    </>
  );
}
