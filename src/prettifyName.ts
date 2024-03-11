export default function prettifyName(pokemonName: string): string {
  return pokemonName
    .replace(/((?<=[- ]).)|^./gm, (match: string) => match.toUpperCase()) // Capitalize words in name
    .replace(/[-]/gm, " ");
}
