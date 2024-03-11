import { Pokemon } from "./types";

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon}) {
  return (
    <section className="flex flex-row justify-normal border border-slate-600 bg-slate-800 p-2">
      <div className="flex flex-col min-w-[50%]">
        <p>Height: {pokemon.heightM + "m"}</p>
        <p>Weight: {pokemon.weightKG + "kg"}</p>
      </div>
      <div className="flex flex-col min-w-[50%]">
        <p>Abilities: 100</p>
        <p>Weight: 100</p>
      </div>
    </section>
  );
}
