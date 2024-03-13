import EvoCard from "./EvoCard";
import { Pokemon } from "./types";

export default function PokemonEvolutionChain({ pokemon }: { pokemon: Pokemon }) {

  return (
    <section
      className="
        p-4 text-left max-w-3xl flex flex-col
        border border-t-0 border-slate-600 bg-slate-900
      "
    >
      <h2>Evolutions:</h2>
      <div className="flex flex-row justify-evenly items-center gap-10">
        <div className="max-w-[20%]">
          <EvoCard name={pokemon.evolutionChain!.name} />
        </div>
        <div className="max-w-[20%]">
          {pokemon.evolutionChain!.evolvesTo.map((entry) => {
            return (
              <EvoCard name={entry.name} key={entry.name} />
            );
          })}
        </div>
        <div className="max-w-[20%]">
          {pokemon.evolutionChain!.evolvesTo.map((entry) => {
            return (
              <div key={entry.name}>
                {entry.evolvesTo.length !== 0
                  ? entry.evolvesTo.map((entry) => <EvoCard name={entry.name} key={entry.name} />) 
                  : <></>
                }
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
