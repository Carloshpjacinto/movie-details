"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MovieImage from "@/components/MovieImage";

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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!detail) return <p>Filme não encontrado.</p>;

  return (
    <div>
      <h1>{detail.Title}</h1>
      <p>
        <strong>Data de lançamento:</strong> {detail.Released}
      </p>
      <p>
        <strong>Duração:</strong> {detail.Runtime}
      </p>
      <p>
        <strong>Descrição:</strong> {detail.Plot || "Sem sinopse."}
      </p>
      <ul>
        {detail?.Ratings.map((ratings) => (
          <li key={ratings.Source}>
            <span className="text-blue-600 cursor-pointer">
              {ratings.Source} ({ratings.Value})
            </span>
          </li>
        ))}
      </ul>
      <p>
        <strong>Atores:</strong> {detail.Actors}
      </p>
      <p>
        <strong>Genêro:</strong> {detail.Genre}
      </p>
      <p>
        <strong>Diretor:</strong> {detail.Director}
      </p>
      <p>
        <strong>Roteirista:</strong> {detail.Writer}
      </p>
      <MovieImage src={detail.Poster} alt={detail.Title} />
    </div>
  );
}
