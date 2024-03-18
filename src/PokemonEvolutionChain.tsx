import EvoCard from "./EvoCard";
import prettifyName from "./utils/prettifyName";
import { Pokemon } from "./types/types.ts";
import bigArrowIcon from "./assets/bigArrowIcon.svg";

export default function PokemonEvolutionChain({ pokemon, updateSearch }: {
  pokemon: Pokemon,
  updateSearch: (name: string) => void,
}) {
  function getRenderNodes() {
    return pokemon.evolutionChain!.evolvesTo.map((entry) => {
      if (entry.evolvesTo.length !== 0) {
        return (
          entry.evolvesTo.map((entry2) => {
            return (
              <div 
                className="flex flex-row justify-evenly gap-10" 
                key={pokemon.evolutionChain!.name + entry.name + entry2.name}
              >
                <EvoCard name={pokemon.evolutionChain!.name} updateSearch={updateSearch} />
                <img className="invert-[10%] dark:invert-[90%] w-10" src={bigArrowIcon} alt="Right pointing arrow" />
                <EvoCard name={entry.name} updateSearch={updateSearch} />
                <img className="invert-[10%] dark:invert-[90%] w-10" src={bigArrowIcon} alt="Right pointing arrow" />
                <EvoCard name={entry2.name} updateSearch={updateSearch} />
              </div>
            );
          })
        );
      } else {
        return (
          <div 
            className="flex flex-row justify-evenly gap-10"
            key={pokemon.evolutionChain!.name + entry.name}
          >
            <EvoCard name={pokemon.evolutionChain!.name} updateSearch={updateSearch} />
            <img className="invert-[10%] dark:invert-[90%] w-10" src={bigArrowIcon} alt="Right pointing arrow" />
            <EvoCard name={entry.name} updateSearch={updateSearch} />
          </div>
        );
      }
    })
  }

  if (pokemon.evolutionChain!.evolvesTo.length === 0) {
    return (
      <section
        className="
          p-4 text-center max-w-3xl flex flex-col gap-4
          border-slate-900 bg-slate-400
          border-4 border-t-0 dark:border-slate-600 dark:bg-slate-900
        "
      >
        <span>{prettifyName(pokemon.name)} has no evolution chain.</span>
      </section>
    );
  }
  return (
    <section
      className="
        p-4 text-left max-w-3xl flex flex-col gap-4
        border-slate-900 bg-slate-400
        border-4 border-t-0 dark:border-slate-600 dark:bg-slate-900
      "
    >
      <h2>Evolution Paths</h2>
      {getRenderNodes().map((entry) => entry)}
    </section>
  );
}
