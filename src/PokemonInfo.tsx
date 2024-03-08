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
    <section className="border border-slate-600 bg-slate-900">
      <h1>{pokemonInfo !== "" ? pokemonInfo.species.name : "Loading..."}</h1>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut voluptatem sint omnis, consectetur repellat commodi officiis beatae. Et, neque molestiae, magnam veritatis tempore cupiditate aliquid exercitationem eaque est deserunt impedit.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut voluptatem sint omnis, consectetur repellat commodi officiis beatae. Et, neque molestiae, magnam veritatis tempore cupiditate aliquid exercitationem eaque est deserunt impedit.
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut voluptatem sint omnis, consectetur repellat commodi officiis beatae. Et, neque molestiae, magnam veritatis tempore cupiditate aliquid exercitationem eaque est deserunt impedit.
    </section>
  );
}
