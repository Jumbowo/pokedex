import { useCallback, useEffect, useMemo, useState } from "react";
import PokemonVarieties from "./PokemonVarieties.tsx";
import PokemonInfoBox from "./PokemonInfoBox.tsx";
import { Pokemon } from "./types.ts";
import getPokemonInfo from "./getPokemonInfo.ts";
import PokemonNextAndPrev from "./PokemonNextAndPrev.tsx";

const defaultPokemon: Pokemon = {
  name: "",
  speciesName: "",
  id: -1,
  prevName: "",
  nextName: "",
  sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
  flavor: "",
  types: [],
  varieties: [],
  weightKG: 0,
  heightM: 0,
  abilities: [],
  stats: [],
  evolutionUrl: "",
}

export default function PokemonInfo({ name, updateSearch }: { name: string, updateSearch: (name: string) => void }) {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);

  const selectVariety = useCallback(async (varietyName: string) => {
    const newPokemon = await getPokemonInfo(name, varietyName);
    setPokemon(newPokemon);
  }, [name]);

  const infoBoxMemo = useMemo(() => {
    return <PokemonInfoBox pokemon={pokemon} updateSearch={(data) => updateSearch(data)} selectVariety={selectVariety} />
  }, [pokemon, updateSearch, selectVariety]);

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
