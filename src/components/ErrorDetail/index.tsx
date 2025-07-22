"use client";
import Navbar from "../Nav";

export default function ErrorDetail() {
  return (
    <div>
      <Navbar />
      <p className="text-center text-lg py-8 text-red-600">
        Não foram encontrados detalhes sobre o filme!
      </p>
    </div>
  );
}
