import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNavHeight(navRef.current?.getBoundingClientRect().height || 0);
  }, [navRef]);

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
        </div>
      </nav>
      <div style={{ marginTop: navHeight }} />
    </>
  );
}
