import { useCallback, useEffect, useMemo, useState } from "react";
import PokemonInfoBox from "./PokemonInfoBox.tsx";
import { Pokemon, defaultPokemon } from "./types/types.ts";
import getPokemonInfo from "./utils/getPokemonInfo.ts";
import PokemonNextAndPrev from "./PokemonNextAndPrev.tsx";

export default function PokemonInfo({ name, updateSearch }: { name: string, updateSearch: (name: string) => void }) {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);
  const [selectedVar, setSelectedVar] = useState("");

  const selectVariety = useCallback(async (varietyName: string) => {
    if (varietyName === selectedVar) return;
    const newPokemon = await getPokemonInfo(name, varietyName);
    setSelectedVar(varietyName);
    setPokemon(newPokemon);
  }, [name, selectedVar]);

  const infoBoxMemo = useMemo(() => {
    return (
      <PokemonInfoBox
        pokemon={pokemon}
        selectVariety={selectVariety}
        selectedVar={selectedVar}
        updateSearch={updateSearch}
      />
    );
  }, [pokemon, selectVariety, selectedVar, updateSearch]);

  const nextPrevMemo = useMemo(() => {
    return <PokemonNextAndPrev pokemon={pokemon} updateSearch={updateSearch} />
  }, [pokemon, updateSearch]);

  useEffect(() => {
    async function getVarietyInfo() {
      const newPokemon = await getPokemonInfo(name);
      setSelectedVar(newPokemon.varieties[0]);
      setPokemon(newPokemon);
    }
    if (name !== "") getVarietyInfo();
  }, [name])  

  if (pokemon.name === "") return <></>;
  return (
    <div className="flex flex-col gap-8 pt-0">
      {nextPrevMemo}
      {infoBoxMemo}
    </div>
  );
}
