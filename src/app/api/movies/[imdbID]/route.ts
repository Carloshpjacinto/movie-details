/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { Script } from "vm";

type Params = {
  params: {
    imdbID: string;
  };
};

export async function GET(req: NextRequest, { params }: Params) {
  const { imdbID } = params;

  try {
    const response = await fetch(
      "https://arquivos.workdoc.com.br/estagio/movieData.js",
    );
    const rawCode = await response.text();

    const cleanedCode = rawCode
      .replace(/export const search/, "const search")
      .replace(/export const movieDetail/, "const movieDetail");

    const contextScript: Record<string, any> = {};
    const script = new Script(
      cleanedCode +
        "\ncontext.search = search;\ncontext.movieDetail = movieDetail;",
    );
    script.runInNewContext({ context: contextScript });

    const movieDetail = contextScript.movieDetail;

    const movie = movieDetail.find(
      (m: any) => m.imdbID?.trim() === imdbID.trim(),
    );

    if (!movie) {
      return NextResponse.json(
        { error: `Filme com imdbID "${imdbID}" não encontrado.` },
        { status: 404 },
      );
    }

    return NextResponse.json(movie);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao buscar detalhes: " + error.message },
      { status: 500 },
    );
  }
}
