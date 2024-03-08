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

  console.log(pokemonInfo);

  return (
    <div>
    </div>
  );
}
