"use client";
import Image from "next/image";
import { useState } from "react";

export default function MovieImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div>
      <Image
        src={imgSrc}
        alt={alt}
        width={250}
        height={250}
        onError={() => setImgSrc("/moviveNoImage.png")}
      />
    </div>
  );
}
