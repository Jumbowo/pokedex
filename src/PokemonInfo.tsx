import { useCallback, useEffect, useMemo, useState } from "react";
import PokemonInfoBox from "./PokemonInfoBox.tsx";
import { Pokemon, defaultPokemon } from "./types.ts";
import getPokemonInfo from "./getPokemonInfo.ts";
import PokemonNextAndPrev from "./PokemonNextAndPrev.tsx";

export default function PokemonInfo({ name, updateSearch }: { name: string, updateSearch: (name: string) => void }) {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);

  const selectVariety = useCallback(async (varietyName: string) => {
    const newPokemon = await getPokemonInfo(name, varietyName);
    setPokemon(newPokemon);
  }, [name]);

  const infoBoxMemo = useMemo(() => {
    return <PokemonInfoBox pokemon={pokemon} selectVariety={selectVariety} />
  }, [pokemon, selectVariety]);

  useEffect(() => {
    async function getVarietyInfo() {
      const newPokemon = await getPokemonInfo(name);
      setPokemon(newPokemon);
    }
    if (name !== "") getVarietyInfo();
  }, [name])  

  if (pokemon.name === "") return <></>;
  return (
    <div className="flex flex-col gap-8 pt-0">
      <PokemonNextAndPrev pokemon={pokemon} updateSearch={updateSearch} />
      <div className="flex flex-col gap-0">
        {infoBoxMemo}
      </div>
    </div>
  );
}
