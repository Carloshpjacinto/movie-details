/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { Script } from "vm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("title")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "Parâmetro de busca 'q' é obrigatório." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      "https://arquivos.workdoc.com.br/estagio/movieData.js"
    );
    const rawCode = await response.text();

    const cleanedCode = rawCode
      .replace(/export const search/, "const search")
      .replace(/export const movieDetail/, "const movieDetail");

    const contextScript: Record<string, any> = {};
    const script = new Script(cleanedCode + "\ncontext.search = search;");
    script.runInNewContext({ context: contextScript });

    const search = contextScript.search;

    const movies = search.filter((m: any) => m.Title?.toLowerCase().includes(query.toLowerCase()));

    if (!movies || movies.length === 0) {
      return NextResponse.json(
        { error: `Nenhum filme encontrado para "${query}".` },
        { status: 404 }
      );
    }

    return NextResponse.json(movies);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Erro ao buscar filmes: " + error.message },
      { status: 500 }
    );
  }
}
