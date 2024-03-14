import EvoCard from "./EvoCard";
import prettifyName from "./prettifyName";
import { Pokemon } from "./types";
import bigArrowIcon from "./assets/bigArrowIcon.svg";

export default function PokemonEvolutionChain({ pokemon }: { pokemon: Pokemon }) {

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
                <EvoCard name={pokemon.evolutionChain!.name} />
                <img className="invert-[90%] w-10" src={bigArrowIcon} />
                <EvoCard name={entry.name} />
                <img className="invert-[90%] w-10" src={bigArrowIcon} />
                <EvoCard name={entry2.name} />
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
            <EvoCard name={pokemon.evolutionChain!.name} />
            <img className="invert-[90%] w-10" src={bigArrowIcon} />
            <EvoCard name={entry.name} />
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
          border border-t-0 border-slate-600 bg-slate-900
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
        border border-t-0 border-slate-600 bg-slate-900
      "
    >
      <h2>Evolution Path</h2>
      {getRenderNodes().map((entry) => entry)}
    </section>
  );
}
