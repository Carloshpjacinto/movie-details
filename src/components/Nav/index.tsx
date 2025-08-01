"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const Navbar = ({ searchQuery = "", onSearchChange }: NavbarProps) => {
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
          className="rounded-lg w-30 h-15 object-cover ml-[2rem] max-sm:w-20 max-sm:ml-[1rem]"
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
              className="rounded-lg w-6 h-6 object-cover mr-[.5rem] max-sm:hidden"
            />
            <input
              className="border border-black rounded-full text-black px-4 py-2 mr-25 max-sm:mr-2"
              placeholder="Pesquisar..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </>
        ) : (
          <button
            className="border border-black rounded-full text-black px-4 py-2 mr-25 cursor-pointer max-sm:mr-4"
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
