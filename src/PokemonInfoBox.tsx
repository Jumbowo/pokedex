import PokemonDetails from "./PokemonDetails.tsx";
import PokemonNextAndPrev from "./PokemonNextAndPrev.tsx";
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
        animate-[slideIn_0.5s_ease-in-out_1]
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
            <h1 className="pr-3">{pokemon.name}</h1>
            <PokemonTypes types={pokemon.types} />
          </div>
          <h2>{"#" + pokemon.id}</h2>
        </div>
        <div className="flex flex-row justify-between pt-2">
          <div className="flex flex-col gap-4">
            <div className="pt-4">{pokemon.flavor}</div>
            <PokemonDetails pokemon={pokemon} />
          </div>
          <img className="max-w-[40%]" src={pokemon.sprite} alt={pokemon.name} title={pokemon.name}/>
        </div>
      </section>
    </section>
  );
}
