import { useEffect, useMemo, useState } from "react";
import PokemonVarieties from "./PokemonVarieties.tsx";
import PokemonInfoBox from "./PokemonInfoBox.tsx";

import { Pokemon, RawVariety, RawFlavorText } from "./types.ts";

const speciesUrl = "https://pokeapi.co/api/v2/pokemon-species/";

const defaultPokemon: Pokemon = {
  name: "",
  speciesName: "",
  id: -1,
  sprite: "",
  flavor: "",
  types: [],
  varieties: [],
}

export default function PokemonInfo({ name }: { name: string }) {
  const [pokemon, setPokemon] = useState<Pokemon>(defaultPokemon);
  const [selectedVariety, setSelectedVariety] = useState("");

  function selectVariety(varietyName: string) {
    const match = pokemon.varieties.find((v) => v === varietyName);
    match !== undefined ? setSelectedVariety(match) : console.log("Error");
  }

  const infoBoxMemo = useMemo(() => <PokemonInfoBox pokemon={pokemon} />, [pokemon]);

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

      if (currentIsSelected) {
        setSelectedVariety(speciesData.varieties[0].pokemon.name);
        return;
      }

      const newPokemon = {
        name: pokemonData.name.slice(0, 1).toUpperCase() + pokemonData.name.slice(1),
        speciesName: name,
        id: pokemonData.id,
        sprite: pokemonData.sprites.other["official-artwork"].front_default,
        flavor: speciesData.flavor_text_entries
          .toReversed()
          .find((entry: RawFlavorText) => entry.language.name === "en")
        .flavor_text,
        types: pokemonData.types
          .map((entry: { slot: number, type: { name: string, url: string } }) => entry.type.name),
        varieties: speciesData.varieties
          .map((entry: RawVariety) => entry.pokemon.name),
      };

      setPokemon(newPokemon);
    }

    if (name !== "") getVarietyInfo();
  }, [name, selectedVariety])  

  if (pokemon.name !== "") {
    return (
      <div className="flex flex-col gap-5 pt-0 p-4">
        <PokemonVarieties
          nonSelectedVarieties={pokemon.varieties.filter((v) => v !== selectedVariety)}
          submit={selectVariety}
          baseTabIndex={2}
        />
        {infoBoxMemo}
      </div>
    );
  } else return <></>;
}
