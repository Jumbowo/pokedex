import { useEffect, useState } from "react";
import getPokemonInfo from "./utils/getPokemonInfo";
import prettifyName from "./utils/prettifyName";
import { defaultPokemon } from "./types/types.ts";

export default function EvoCard({ name, updateSearch }: {
  name: string,
  updateSearch: (name: string) => void,
}) {
  const [pokemon, setPokemon] = useState(defaultPokemon);
  
  useEffect(() => {
    (async function getPokemon() {
      const newPokemon = await getPokemonInfo(name);
      setPokemon(newPokemon);
    })();
  }, [name])

  return (
    <article
      className="flex flex-col justify-center text-center max-w-[15%] hover:text-white"
    >
      <button onClick={() => updateSearch(name)}>
        <img src={pokemon.sprite} />
        <span>{prettifyName(name)}</span>
      </button>
    </article>
  );
}
