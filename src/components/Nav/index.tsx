"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <nav className="flex items-center text-[1rem] font-bold bg-default text-black justify-between py-[1rem]">
      <Link href="/">
        <Image
          src="/logoMovieDetail.png"
          alt="Logo_movieDetail"
          width={500}
          height={500}
          quality={90}
          priority
          className="rounded-lg w-30 h-15 object-cover ml-[2rem]"
        />
      </Link>
      <div className="flex flex-row items-center">
        {isHome ? (
          <>
            <Image
              src="/lupa.png"
              alt="Lupa"
              width={500}
              height={500}
              quality={90}
              className="rounded-lg w-6 h-6 object-cover mr-[.5rem]"
            />
            <input
              className="border border-black rounded-full text-black px-4 py-2 mr-25"
              placeholder="Pesquisar..."
            />
          </>
        ) : (
          <button
            className="border border-black rounded-full text-black px-4 py-2 mr-25 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Voltar
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
