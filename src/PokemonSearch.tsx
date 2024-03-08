import { useState } from "react";
import PokemonSearchDropdown from "./PokemonSearchDropdown";
import Fuse from "fuse.js";
import * as nameData from "./assets/pokemonNames.json";

const names = nameData.names;
const fuseOptions = { };
const fuse = new Fuse(names, fuseOptions);

export default function PokemonSearch({ updateSearch }) {
  const [results, setResults] = useState([""]);

  function updateResults(input: string) {
    setResults(fuse.search(input).slice(0, 5).map((x) => x.item));
  }

  function submitSearch() {
    console.log("Submitting form!");
    updateSearch(results[0].toLowerCase());
    setResults([""]);
  }

  return (
    <section className="flex flex-col gap-2 items-center relative">
      <label className="font-bold text-2xl" htmlFor="searchForm">Search Pokemon:</label>
      <input
        className="
          border border-slate-600 bg-slate-900 max-w-96 w-80 p-2
          focus:outline-0 focus:border-white z-10
        "
        id="searchForm"
        type="text"
        onInput={(event) => updateResults((event.target as HTMLInputElement).value)}
        onKeyUp={(event) => {
          if (event.code === "Enter") {
            (event.target as HTMLInputElement).value = "";
            submitSearch();
          }
        }}
      />
      <input className="" type="submit" />
      <PokemonSearchDropdown results={results} />
    </section>
  );
}
