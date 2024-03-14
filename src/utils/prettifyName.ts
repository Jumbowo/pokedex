export default function prettifyName(pokemonName: string): string {
  return pokemonName
    .replace(/(gmax)/gmi, "Gigantamax")
    .replace(/((?<=[- ]).)|^./gm, (match: string) => match.toUpperCase()) // Capitalize words in name
    .replace(/[-]/gm, " "); // Replace hyphens with spaces
}
