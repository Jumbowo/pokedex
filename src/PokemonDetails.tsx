import prettifyName from "./prettifyName";
import { Pokemon } from "./types";

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon}) {
  return (
    <section className="flex flex-row justify-normal border border-slate-600 bg-cyan-900 p-2">
      <div className="flex flex-col min-w-[50%] gap-2">
        <div className="flex flex-col">
          <span className="text-white font-semibold">Height</span>
          <span>{pokemon.heightM + "m"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-white font-semibold">Weight</span>
          <span>{pokemon.weightKG + "kg"}</span>
        </div>
      </div>
      <div className="flex flex-col min-w-[50%] gap-2">
        <div className="flex flex-col">
          <span className="text-white font-semibold">Abilities</span>
          {pokemon.abilities.map((ability) => <span key={ability}>{prettifyName(ability)}</span>)}
        </div>
      </div>
    </section>
  );
}
