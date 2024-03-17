import prettifyName from "./prettifyName";
import { Pokemon, RawAbility, RawFlavorText, RawStat, RawVariety } from "../types/types.ts";

import pokemonIdsObject from "../assets/pokemonNameId.json";
const pokemonIds = pokemonIdsObject.pokemon;

const speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";

const NUM_OF_POKEMON = 1025

export default async function getPokemonInfo(name: string, variety: string = ""): Promise<Pokemon> {
  name = name.replace(/[ .]+/gm, "-").replace(/[']+/gm, "");
  variety = variety.replace(/[ .]+/gm, "-").replace(/[']+/gm, "");

  const speciesRes = await fetch(speciesUrl + name);
  const speciesData = await speciesRes.json();

  const evoRes = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoRes.json();

  const pokemonRes = await fetch(
    variety === ""
      ? speciesData.varieties[0].pokemon.url
      : speciesData.varieties.find((entry: RawVariety) => entry.pokemon.name === variety).pokemon.url
  );
  const pokemonData = await pokemonRes.json();

  if (variety === "") variety = speciesData.varieties[0].pokemon.name;

  const newPokemon = {
    name: prettifyName(pokemonData.name),
    speciesName: pokemonIds[speciesData.id - 1].name,
    id: pokemonData.id,
    prevName: (speciesData.id - 1) > 0 ? pokemonIds[speciesData.id - 2].name : "",
    nextName: speciesData.id < NUM_OF_POKEMON - 1 ? pokemonIds[speciesData.id].name : "",
    sprite: pokemonData.sprites.other["official-artwork"].front_default,
    flavor: (() => {
      const temp = speciesData.flavor_text_entries
        .toReversed()
        .find((entry: RawFlavorText) => entry.language.name === "en");
      return temp ? temp.flavor_text : "No information found."
    })(),
    types: pokemonData.types
      .map((entry: { slot: number, type: { name: string, url: string } }) => entry.type.name),
    varieties: speciesData.varieties
      .map((entry: RawVariety) => entry.pokemon.name),
    weightKG: pokemonData.weight / 10,
    heightM: pokemonData.height / 10,
    abilities: pokemonData.abilities
      .filter((entry: RawAbility) => !entry.is_hidden)
      .map((entry: RawAbility) => entry.ability.name),
    stats: pokemonData.stats
      .map((entry: RawStat) => {
        return { 
          name: entry.stat.name.slice(0, 1).toUpperCase() + entry.stat.name.slice(1),
          baseValue: entry.base_stat,
        };
      }),
    evolutionChain: {
      name: evoData.chain.species.name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      evolvesTo: evoData.chain.evolves_to.map((entry: any) => {
        return { 
          name: entry.species.name,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          evolvesTo: entry.evolves_to.map((entry: any) => {
            return {
              name: entry.species.name,
              evolvesTo: []
            }
          })
        } 
      }),
    },
  };

  return newPokemon;
}
