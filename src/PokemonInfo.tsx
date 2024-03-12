import { useEffect, useMemo, useState } from "react";
import PokemonVarieties from "./PokemonVarieties.tsx";
import PokemonInfoBox from "./PokemonInfoBox.tsx";
import { Pokemon } from "./types.ts";
import getPokemonInfo from "./getPokemonInfo.ts";

const defaultPokemon: Pokemon = {
  name: "",
  speciesName: "",
  id: -1,
  prevName: "",
  nextName: "",
  sprite: "",
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

  async function selectVariety(varietyName: string) {
    const newPokemon = await getPokemonInfo(name, varietyName);
    setPokemon(newPokemon);
  }

  const infoBoxMemo = useMemo(() => {
    return <PokemonInfoBox pokemon={pokemon} updateSearch={(data) => updateSearch(data)} />
  }, [pokemon, updateSearch]);

  useEffect(() => {
    async function getVarietyInfo() {
      const newPokemon = await getPokemonInfo(name);
      setPokemon(newPokemon);
    }
    if (name !== "") getVarietyInfo();
  }, [name])  

  if (pokemon.name === "") return <></>;
  return (
    <div className="flex flex-col gap-5 pt-0">
      <PokemonVarieties
        nonSelectedVarieties={pokemon.varieties}
        submit={selectVariety}
        baseTabIndex={2}
      />
      {infoBoxMemo}
    </div>
  );
}
