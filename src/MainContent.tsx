import { useState } from "react";
import PokemonInfo from "./PokemonInfo";
import PokemonSearch from "./PokemonSearch";

export default function MainContent() {
  const [name, setName] = useState("pikachu");

  return (
    <main className="flex flex-col gap-5 max-w-6xl p-4 text-center">
      <PokemonSearch updateSearch={setName} />
      <PokemonInfo name={name} />
    </main>
  );
}
