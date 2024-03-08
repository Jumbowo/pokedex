import { useEffect, useState } from "react";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
const speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";

interface Pokemon {
  name: string,
  id: number,
  sprite: string,
  flavor: string,
}

export default function PokemonInfo({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: "Pikachu",
    id: 25,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    flavor: "When several of these Pokemon gather, their electricity could build and cause lightning storms.",
  });

  useEffect(() => {
    (async function getPokemonInfo() {
      const pokemonRes = await fetch(pokemonUrl + name);
      const pokemonData = await pokemonRes.json();

      const speciesRes = await fetch(speciesUrl + pokemonData.species.name);
      const speciesData = await speciesRes.json();

      const newPokemon = {
        name: pokemonData.name.slice(0, 1).toUpperCase() + pokemonData.name.slice(1),
        id: pokemonData.id,
        sprite: pokemonData.sprites.other["official-artwork"].front_default,
        flavor: speciesData.flavor_text_entries.toReversed().find((text) => text.language.name === "en").flavor_text,
      };

      setPokemon(newPokemon);
    })();
  }, [name])  



  return (
    <section
      className="
        p-4 text-left max-w-3xl
        flex flex-col
        border border-slate-600 bg-slate-900
      "
    >
      <div className="flex flex-row justify-between text-2xl">
        <h1>
          {pokemon.name}
        </h1>
        <h2>{"#" + pokemon.id}</h2>
      </div>
      <div className="flex flex-row justify-between pt-2">
        <div className="pt-4">{pokemon.flavor}</div>
        <img className="max-w-[40%]" src={pokemon.sprite} />
      </div>
    </section>
  );
}
