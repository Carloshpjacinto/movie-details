/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MovieImage from "@/components/MovieImage";

type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type MovieDetail = Record<string, any>;

type Data = {
  search: Movie[];
  movieDetail: MovieDetail[];
};

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((json: Data) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  if (!data) return null;

  const totalItems = data.search.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMovies = data.search.slice(startIndex, endIndex);

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  return (
    <div className="mt-40">
      <ul className="grid grid-flow-col gap-4">
        {currentMovies.map((movie) => (
          <li key={movie.imdbID}>
            <Link
              href={`/movie/${movie.imdbID}`}
              className="flex flex-col items-center mb-15"
            >
              <MovieImage src={movie.Poster} alt={movie.Title} />
              <p className="text-default hover:underline cursor-pointer mt-5">
                {movie.Title}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center items-center gap-4 mt-20">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-default text-black rounded disabled:bg-gray-400"
        >
          {"<"}
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-default text-black rounded disabled:bg-gray-400"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
