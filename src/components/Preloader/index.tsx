"use client";
import MovieImage from "../MovieImage";

export default function Preloader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <MovieImage
        src="/SnakeLoader.gif"
        alt="preloader"
        width={50}
        height={25}
      />
    </div>
  );
}
