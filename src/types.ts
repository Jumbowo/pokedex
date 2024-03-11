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
