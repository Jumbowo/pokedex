export interface Pokemon {
  name: string,
  speciesName: string,
  id: number,
  sprite: string,
  flavor: string,
  types: string[],
  varieties: string[],
}

export interface RawFlavorText {
  flavor_text: string,
  language: { name: string, url: string },
  version: { name: string, url: string }
}

export interface RawVariety {
  is_default: string,
  pokemon: { name: string, url: string },
}
