import { useEffect, useState } from "react";
import getPokemonInfo from "./getPokemonInfo";
import prettifyName from "./prettifyName";
import { defaultPokemon } from "./types";

export default function EvoCard({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState(defaultPokemon);
  
  useEffect(() => {
    async function getPokemon() {
      const newPokemon = await getPokemonInfo(name);
      setPokemon(newPokemon);
    }
    getPokemon();
  }, [name])
  
  return (
    <div className="flex flex-col text-center">
      <img src={pokemon.sprite} />
      <span>{prettifyName(name)}</span>
    </div>
  );
}
