import PokemonTypes from "./PokemonTypes";

import { Pokemon } from "./types.ts";

export default function PokemonInfoBox({ pokemon }: { pokemon: Pokemon }) {
  return (
    <section
      className="
        p-4 text-left max-w-3xl flex flex-col
        border border-slate-600 bg-slate-900
        animate-[slideIn_0.5s_ease-in-out_1]
      "
      key={pokemon.name}
    >
      <div className="flex flex-row justify-between text-2xl">
        <div className="flex flex-row">
          <h1 className="pr-3">{pokemon.name}</h1>
          <PokemonTypes types={pokemon.types} />
        </div>
        <h2>{"#" + pokemon.id}</h2>
      </div>
      <div className="flex flex-row justify-between pt-2">
        <div className="pt-4">{pokemon.flavor}</div>
        <img className="max-w-[40%]" src={pokemon.sprite} alt={pokemon.name} title={pokemon.name}/>
      </div>
    </section>
  );
}
