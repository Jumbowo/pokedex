import { useEffect, useState } from "react";
import PokemonTypes from "./PokemonTypes";

const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/";
const speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";

interface Pokemon {
  name: string,
  id: number,
  sprite: string,
  flavor: string,
  types: string[],
}

interface FlavorText {
  flavor_text: string,
  language: { name: string, url: string },
  version: { name: string, url: string }
}

const defaultPokemon: Pokemon = {
  name: "",
  id: -1,
  sprite: "",
  flavor: "",
  types: [],
}

export default function PokemonInfo({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);

  useEffect(() => {
    async function getPokemonInfo() {
      const pokemonRes = await fetch(pokemonUrl + name.replace(/[ .]+/gm, "-").replace(/[']+/gm, ""));
      const pokemonData = await pokemonRes.json();

      const speciesRes = await fetch(speciesUrl + pokemonData.species.name);
      const speciesData = await speciesRes.json();

      const newPokemon = {
        name: pokemonData.name.slice(0, 1).toUpperCase() + pokemonData.name.slice(1),
        id: pokemonData.id,
        sprite: pokemonData.sprites.other["official-artwork"].front_default,
        flavor: speciesData.flavor_text_entries
          .toReversed()
          .find((entry: FlavorText) => entry.language.name === "en")
          .flavor_text,
        types: pokemonData.types.map((entry: { slot: number, type: { name: string, url: string } }) => entry.type.name),
      };

      setPokemon(newPokemon);
    }

    if (name !== "") getPokemonInfo();
  }, [name])  

  if (pokemon.name !== "") {
    return (
      <section
        className="
          p-4 text-left max-w-3xl flex flex-col
          border border-slate-600 bg-slate-900
          animate-[slideIn_0.5s_ease-in-out_1]
        "
        key={pokemon.name}
      >
        <div className="flex flex-row justify-between text-2xl">
          <div className="flex flex-row">
            <h1 className="pr-3">{pokemon.name}</h1>
            <PokemonTypes types={pokemon.types} />
          </div>
          <h2>{"#" + pokemon.id}</h2>
        </div>
        <div className="flex flex-row justify-between pt-2">
          <div className="pt-4">{pokemon.flavor}</div>
          <img className="max-w-[40%]" src={pokemon.sprite} alt={pokemon.name} title={pokemon.name}/>
        </div>
      </section>
    );
  } else return <></>;
}
