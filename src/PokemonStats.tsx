import prettifyName from "./prettifyName";
import { Pokemon } from "./types";

export default function PokemonStats({ pokemon }: { pokemon: Pokemon}) {
  return (
    <section className="flex flex-row justify-normal border border-slate-600 bg-purple-950 p-2">
      <div className="min-w-[50%]">
        {pokemon.stats.slice(0, 3).map((stat) => {
          return (
            <div key={stat.name}>
              <span className="text-white font-semibold">{prettifyName(stat.name)}: </span>
              <span>{stat.baseValue}</span>
            </div>
          );
        })}
      </div>
      <div className="min-w-[50%]">
        {pokemon.stats.slice(3).map((stat) => {
          return (
            <div key={stat.name}>
              <span className="text-white font-semibold">{prettifyName(stat.name)}: </span>
              <span>{stat.baseValue}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
