"use client";
import Image from "next/image";
import { useState } from "react";

export default function MovieImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={300}
      height={450}
      onError={() => setImgSrc("/moviveNoImage.png")}
    />
  );
}
