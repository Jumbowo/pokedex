import prettifyName from "./utils/prettifyName";
import { Pokemon } from "./types/types.ts";
import AbilityMoreInfo from "./AbilityMoreInfo.tsx";

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon}) {
  return (
    <section className="
        flex flex-row justify-normal p-2
        border-slate-900 bg-blue-400 
        border dark:border-slate-600 dark:bg-blue-900
      "
    >
      <div className="flex flex-col min-w-[50%] gap-2">
        <div className="flex flex-col">
          <span className="text-black dark:text-white font-semibold">Height</span>
          <span>{pokemon.heightM + "m"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-black dark:text-white font-semibold">Weight</span>
          <span>{pokemon.weightKG + "kg"}</span>
        </div>
      </div>
      <div className="flex flex-col min-w-[50%] gap-2">
        <div className="flex flex-col">
          <span className="text-black dark:text-white font-semibold">Abilities</span>
          {pokemon.abilities.map((ability) => {
            return (
              <span className="flex flex-row gap-2 relative" key={ability}>
                {prettifyName(ability)}
                <AbilityMoreInfo abilityName={ability} />
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
