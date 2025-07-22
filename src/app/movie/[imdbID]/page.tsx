"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieImage from "@/components/MovieImage";
import Navbar from "@/components/Nav";
import ErrorDetail from "@/components/ErrorDetail";

type MovieDetail = {
  Title: string;
  Released: string;
  Runtime: string;
  Plot: string;
  Ratings: { Source: string; Value: string }[];
  Actors: string;
  Genre: string;
  Director: string;
  Writer: string;
  Poster: string;
};

export default function MovieDetailPage() {
  const params = useParams();
  const imdbID = params.imdbID;

  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imdbID) return;

    fetch(`/api/movies/${imdbID}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro: status ${res.status}`);
        return res.json();
      })
      .then((json: MovieDetail) => {
        setDetail(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [imdbID]);

  if (loading)
    return (
      <p className="text-center text-[2rem] text-default py-8">Carregando...</p>
    );
  if (error || !detail) return <ErrorDetail />;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 rounded-lg font-sans text-default mt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">{detail.Title}</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="mr-5 mt-10">
            <MovieImage
              src={detail.Poster}
              alt={detail.Title}
              width={250}
              height={250}
            />
          </div>

          <div className="flex-1 space-y-4">
            <p>
              <strong className="font-semibold">Data de lançamento:</strong>{" "}
              {detail.Released}
            </p>
            <p>
              <strong className="font-semibold">Duração:</strong>{" "}
              {detail.Runtime}
            </p>
            <p>
              <strong className="font-semibold">Descrição:</strong>{" "}
              {detail.Plot || "Sem sinopse."}
            </p>

            <div>
              <strong className="font-semibold">Avaliações:</strong>
              <ul className="list-none mt-2 space-y-1">
                {detail.Ratings.map((rating) => (
                  <li key={rating.Source}>
                    <span className="text-dourado">{rating.Source}</span> (
                    {rating.Value})
                  </li>
                ))}
              </ul>
            </div>

            <p>
              <strong className="font-semibold">Atores:</strong> {detail.Actors}
            </p>
            <p>
              <strong className="font-semibold">Genêro:</strong> {detail.Genre}
            </p>
            <p>
              <strong className="font-semibold">Diretor:</strong>{" "}
              {detail.Director}
            </p>
            <p>
              <strong className="font-semibold">Roteirista:</strong>{" "}
              {detail.Writer}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
