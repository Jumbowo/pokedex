import { useEffect, useState } from "react";

const url = "https://pokeapi.co/api/v2/pokemon/";

export default function PokemonInfo({ name }: { name: string }) {
  const [pokemonInfo, setPokemonInfo] = useState("");

  useEffect(() => {
    async function getPokemonInfo() {
      const response = await fetch(url + name);
      const data = await response.json();
      setPokemonInfo(data);
    }
    getPokemonInfo();
  }, [name])  

  return (
    <section
      className="
        flex flex-col
        border border-slate-600 bg-slate-900
      "
    >
      <h1>{pokemonInfo !== "" ? pokemonInfo.name.slice(0, 1).toUpperCase() + pokemonInfo.name.slice(1) : "Loading..."}</h1>
    </section>
  );
}
