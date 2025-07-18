/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { Script } from "vm";

export async function GET() {
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

    const search = contextScript.search;
    const movieDetail = contextScript.movieDetail;

    return NextResponse.json({ search, movieDetail });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao processar movieData.js: " + error.message },
      { status: 500 },
    );
  }
}
