import prettifyName from "./utils/prettifyName";
import { Pokemon } from "./types/types.ts";

export default function PokemonStats({ pokemon }: { pokemon: Pokemon}) {
  return (
    <section
      className="
        flex flex-row justify-normal p-2
        border-slate-900 bg-purple-400
        border dark:border-slate-600 dark:bg-purple-900
      "
    >
      <div className="min-w-[50%]">
        {pokemon.stats.slice(0, 3).map((stat) => {
          return (
            <div key={stat.name}>
              <span className="text-black dark:text-white font-semibold">{prettifyName(stat.name)}: </span>
              <span>{stat.baseValue}</span>
            </div>
          );
        })}
      </div>
      <div className="min-w-[50%]">
        {pokemon.stats.slice(3).map((stat) => {
          return (
            <div key={stat.name}>
              <span className="text-black dark:text-white font-semibold">{prettifyName(stat.name)}: </span>
              <span>{stat.baseValue}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
