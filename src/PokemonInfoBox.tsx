import PokemonDetails from "./PokemonDetails.tsx";
import PokemonEvolutionChain from "./PokemonEvolutionChain.tsx";
import PokemonNextAndPrev from "./PokemonNextAndPrev.tsx";
import PokemonStats from "./PokemonStats.tsx";
import PokemonTypes from "./PokemonTypes";

import { Pokemon } from "./types.ts";

export default function PokemonInfoBox({ pokemon, updateSearch }: {
  pokemon: Pokemon,
  updateSearch: (name: string) => void,
}) {
  return (
    <section
      className="
        flex flex-col relative
        animate-[fadeIn_0.5s_ease-in-out_1]
      "
      key={pokemon.name}
    >
      <PokemonNextAndPrev pokemon={pokemon} updateSearch={updateSearch} />
      <section
        className="
          p-4 text-left max-w-3xl flex flex-col
          border border-slate-600 bg-slate-900
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
            <div className="pt-4">{pokemon.flavor}</div>
            <PokemonDetails pokemon={pokemon} />
            <PokemonStats pokemon={pokemon} />
          </div>
          <div className="min-w-[40%]">
            <img src={pokemon.sprite} alt={pokemon.name} title={pokemon.name} />
          </div>
        </div>
      </section>
      <PokemonEvolutionChain pokemon={pokemon} />
    </section>
  );
}
