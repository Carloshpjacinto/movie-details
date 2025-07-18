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
        <strong>Ano:</strong> {detail.Year}
      </p>
      <p>
        <strong>Tipo:</strong> {detail.Type}
      </p>
      <p>
        <strong>Descrição:</strong> {detail.Plot || "Sem sinopse."}
      </p>
      <img src={detail.Poster} alt={detail.Title} width={200} />
    </div>
  );
}
