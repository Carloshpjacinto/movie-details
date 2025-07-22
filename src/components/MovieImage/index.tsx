"use client";
import Image from "next/image";
import { useState } from "react";

export default function MovieImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <div>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        onError={() => setImgSrc("/moviveNoImage.png")}
      />
    </div>
  );
}
