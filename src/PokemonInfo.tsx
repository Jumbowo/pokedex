import { useEffect, useMemo, useState } from "react";
import PokemonVarieties from "./PokemonVarieties.tsx";
import PokemonInfoBox from "./PokemonInfoBox.tsx";

import { Pokemon, RawVariety, RawFlavorText, RawAbility } from "./types.ts";

import * as pokemonIdsObject from "./assets/pokemonNameId.json";
const pokemonIds = pokemonIdsObject.pokemon;

const NUM_OF_POKEMON = 1025;
const speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";

const defaultPokemon: Pokemon = {
  name: "",
  speciesName: "",
  id: -1,
  prevName: "",
  nextName: "",
  sprite: "",
  flavor: "",
  types: [],
  varieties: [],
  weightKG: 0,
  heightM: 0,
  abilities: [],
}

export default function PokemonInfo({ name, updateSearch }: { name: string, updateSearch: (name: string) => void }) {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);
  const [selectedVariety, setSelectedVariety] = useState("");

  function selectVariety(varietyName: string) {
    const match = pokemon.varieties.find((v) => v === varietyName);
    match !== undefined ? setSelectedVariety(match) : console.log("Error");
  }

  const infoBoxMemo = useMemo(() => {
    return <PokemonInfoBox pokemon={pokemon} updateSearch={(data) => updateSearch(data)} />
  }, [pokemon, updateSearch]);

  useEffect(() => {
    async function getVarietyInfo() {
      const speciesRes = await fetch(speciesUrl + name.replace(/[ .]+/gm, "-").replace(/[']+/gm, ""));
      const speciesData = await speciesRes.json();

      const currentIsSelected = 
        speciesData.varieties.find((variety: RawVariety) => variety.pokemon.name === selectedVariety) === undefined;

      const pokemonRes = await fetch(
        currentIsSelected
        ? speciesData.varieties[0].pokemon.url
        : speciesData.varieties.find((variety: RawVariety) => variety.pokemon.name === selectedVariety).pokemon.url
      );
      const pokemonData = await pokemonRes.json();

      if (currentIsSelected) setSelectedVariety(speciesData.varieties[0].pokemon.name);

      const newPokemon = {
        name: pokemonData.name.slice(0, 1).toUpperCase() + pokemonData.name.slice(1),
        speciesName: pokemonIds[speciesData.id - 1].name,
        id: pokemonData.id,
        prevName: (speciesData.id - 1) > 0 ? pokemonIds[speciesData.id - 2].name : "",
        nextName: speciesData.id < NUM_OF_POKEMON - 1 ? pokemonIds[speciesData.id].name : "",
        sprite: pokemonData.sprites.other["official-artwork"].front_default,
        flavor: speciesData.flavor_text_entries
          .toReversed()
          .find((entry: RawFlavorText) => entry.language.name === "en")
        .flavor_text,
        types: pokemonData.types
          .map((entry: { slot: number, type: { name: string, url: string } }) => entry.type.name),
        varieties: speciesData.varieties
          .map((entry: RawVariety) => entry.pokemon.name),
        weightKG: pokemonData.weight / 10,
        heightM: pokemonData.height / 10,
        abilities: pokemonData.abilities
          .filter((entry: RawAbility) => !entry.is_hidden)
          .map((entry: RawAbility) => entry.ability.name),
      };

      setPokemon(newPokemon);
    }

    if (name !== "") getVarietyInfo();
  }, [name, selectedVariety])  

  if (pokemon.name === "") return <></>;
  return (
    <div className="flex flex-col gap-5 pt-0">
      {infoBoxMemo}
      <PokemonVarieties
        nonSelectedVarieties={pokemon.varieties.filter((v) => v !== selectedVariety)}
        submit={selectVariety}
        baseTabIndex={2}
      />
    </div>
  );
}
