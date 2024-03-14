export interface Pokemon {
  name: string,
  speciesName: string,
  id: number,
  prevName: string,
  nextName: string,
  sprite: string,
  flavor: string,
  types: string[],
  varieties: string[],
  weightKG: number,
  heightM: number,
  abilities: string[],
  stats: { name: string, baseValue: number }[],
  evolutionChain: {
    name: string,
    evolvesTo: Array<{ name: string, evolvesTo: Array<{ name: string, evolvesTo: [] }> }>
  } | null,
}

export const defaultPokemon: Pokemon = {
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
  stats: [],
  evolutionChain: null,
}

export interface RawFlavorText {
  flavor_text: string,
  language: { name: string, url: string },
  version: { name: string, url: string }
}

export interface RawVariety {
  is_default: boolean,
  pokemon: { name: string, url: string },
}

export interface RawAbility {
  ability: { name: string, url: string },
  is_hidden: boolean,
  slot: number,
}

export interface RawStat {
  base_stat: number,
  effort: number,
  stat: { name: string, url: string },
}

export interface RawAbilityEffect {
  effect: string,
  language: { name: string, url: string }, 
  short_effect: string,
}

export interface RawAbilityFlavor {
  flavor_text: string,
  language: { name: string, url: string }, 
  version_group: { name: string, url: string },
}
