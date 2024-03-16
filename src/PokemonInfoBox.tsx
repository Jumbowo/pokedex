import { useMemo } from "react";
import PokemonDetails from "./PokemonDetails.tsx";
import PokemonEvolutionChain from "./PokemonEvolutionChain.tsx";
import PokemonStats from "./PokemonStats.tsx";
import PokemonTypes from "./PokemonTypes";
import PokemonVarieties from "./PokemonVarieties.tsx";

import { Pokemon } from "./types/types.ts";

export default function PokemonInfoBox({ pokemon, selectVariety, selectedVar, updateSearch }: {
  pokemon: Pokemon,
  selectVariety: (variety: string) => void,
  selectedVar: string,
  updateSearch: (name: string) => void,
}) {

  const evoChainMemo = useMemo(() => {
    return <PokemonEvolutionChain pokemon={pokemon} updateSearch={updateSearch} />
  }, [pokemon, updateSearch]);
  
  const mainInfoCardMemo = useMemo(() => {
    return (
      <>
        <section
          className="
            p-4 text-left max-w-3xl flex flex-col
            border-4 border-b border-slate-600 bg-slate-900
          "
        >
          <div className="flex flex-row justify-between text-2xl">
            <div className="flex flex-row">
              <h1 className="pr-3">{pokemon.varieties.length === 1 ? pokemon.speciesName : pokemon.name}</h1>
              <PokemonTypes types={pokemon.types} />
            </div>
            <h2>{"#" + pokemon.id}</h2>
          </div>
          <div className="flex flex-row justify-between pt-2 gap-4">
            <div className="flex flex-col gap-4">
              <span className="pt-4">{pokemon.flavor}</span>
              <img
                className="min-w-[80%] w-[80%] self-center block sm:hidden"
                src={pokemon.sprite}
                alt={pokemon.name}
                title={pokemon.name}
              />
              <PokemonDetails pokemon={pokemon} />
              <PokemonStats pokemon={pokemon} />
            </div>
            <img
              className="min-w-[40%] w-[40%] self-center sm:block hidden"
              src={pokemon.sprite}
              alt={pokemon.name}
              title={pokemon.name}
            />
          </div>
        </section>
      </>
    );
  }, [pokemon]);

  return (
    <section
      className="
        flex flex-col relative
        animate-[fadeIn_0.5s_ease-in-out_1]
      "
      key={pokemon.name}
    >
      <PokemonVarieties
        varieties={pokemon.varieties}
        selectedVar={selectedVar}
        submit={selectVariety}
        baseTabIndex={4}
      />
      {mainInfoCardMemo}
      {evoChainMemo}
    </section>
  );
}
