import MovieImage from "@/components/MovieImage";

type Params = {
  params: {
    imdbID: string;
  };
};

export default async function MovieDetailPage({ params }: Params) {
  const imdbID = params.imdbID;

  const res = await fetch(`http://localhost:3000/api/movies/${imdbID}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div>
        <h1>Detalhes do Filme</h1>
        <p>Filme não encontrado (status: {res.status})</p>
      </div>
    );
  }

  const detail = await res.json();

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
        {detail?.Ratings.map((ratings: { Source: string; Value: string }) => (
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
