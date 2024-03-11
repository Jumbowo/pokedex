import PokemonDetails from "./PokemonDetails.tsx";
import PokemonTypes from "./PokemonTypes";

import { Pokemon } from "./types.ts";

export default function PokemonInfoBox({ pokemon, updateSearch }: {
  pokemon: Pokemon,
  updateSearch: React.Dispatch<string>,
}) {
  return (
    <section
      className="
        flex flex-row gap-4 relative
        animate-[slideIn_0.5s_ease-in-out_1]
      "
      key={pokemon.name}
    >
      {pokemon.prevName !== ""
        ? <button
            className="
              p-2 bg-slate-900 border border-slate-600
              w-24 h-full absolute -left-28 text-center overflow-visible
              hover:bg-slate-800 hover:border-slate-400
            "
            onClick={() => updateSearch(pokemon.prevName.toLowerCase())}
          >
            {pokemon.prevName}
          </button>
        : <></>
      }
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
      {pokemon.nextName !== ""
        ? <button
            className="
              p-2 bg-slate-900 border border-slate-600
              w-24 h-full absolute -right-28 text-center overflow-visible
              hover:bg-slate-800 hover:border-slate-400
            "
            onClick={() => updateSearch(pokemon.nextName.toLowerCase())}
          >
            {pokemon.nextName}
          </button>
        : <></>
      }
    </section>
  );
}
