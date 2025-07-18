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

  return (
    <div>
      <h1>Filmes</h1>
      <ul className="grid grid-flow-col grid-rows-10 gap-4">
        {data?.search.map((movie) => (
          <li key={movie.imdbID}>
            <Link href={`/movie/${movie.imdbID}`}>
              <span className="text-blue-600 hover:underline cursor-pointer">
                {movie.Title} ({movie.Year})
              </span>
              <MovieImage src={movie.Poster} alt={movie.Title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
