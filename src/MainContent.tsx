import { useCallback, useState } from "react";
import PokemonInfo from "./PokemonInfo";
import PokemonSearch from "./PokemonSearch";

export default function MainContent() {
  const [name, setName] = useState("");

  const updateSearch = useCallback((name: string) => setName(name), []);

  return (
    <main className="flex flex-col gap-5 max-w-6xl text-center self-center">
      <PokemonSearch updateSearch={updateSearch} />
      <PokemonInfo name={name} updateSearch={updateSearch} />
    </main>
  );
}
