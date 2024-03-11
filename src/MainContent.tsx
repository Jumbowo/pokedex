import { useState } from "react";
import PokemonInfo from "./PokemonInfo";
import PokemonSearch from "./PokemonSearch";

export default function MainContent() {
  const [name, setName] = useState("");

  return (
    <main className="flex flex-col gap-5 max-w-6xl text-center">
      <PokemonSearch updateSearch={(data) => setName(data)} />
      <PokemonInfo name={name} updateSearch={(data) => setName(data)} />
    </main>
  );
}
