import { useEffect, useState } from "react";
import { Pokemon } from "./types";

export default function PokemonEvolutionChain({ pokemon }: { pokemon: Pokemon }) {
  const [evoChain, setEvoChain] = useState([]);

  useEffect(() => {
    async function getEvolutionChain() {
      const chainRes = await fetch(pokemon.evolutionUrl);
      const chainData = await chainRes.json();

      async function chainToArr(chain) {
      }
    }
    getEvolutionChain();
  }, [pokemon]);

  return (
    <section
      className="
        p-4 text-left max-w-3xl flex flex-col
        border border-t-0 border-slate-600 bg-slate-900
      "
    >
      {evoChain}
    </section>
  );
}
