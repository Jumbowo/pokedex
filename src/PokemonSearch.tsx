import { useRef, useState } from "react";
import PokemonSearchDropdown from "./PokemonSearchDropdown";
import Fuse from "fuse.js";
import * as nameData from "./assets/pokemonNames.json";
import submitButton from "./assets/submitButton.svg";

const names = nameData.names;
const fuseOptions = { };
const fuse = new Fuse(names, fuseOptions);

export default function PokemonSearch({ updateSearch }: { updateSearch: React.Dispatch<string>}) {
  const [results, setResults] = useState([""]);

  const searchFormRef = useRef(null);

  function updateResults(input: string) {
    setResults(fuse.search(input).slice(0, 5).map((x) => x.item));
  }

  function submitSearch(dropdownNum: number = 0) {
    (searchFormRef.current as HTMLInputElement | null)!.value = "";
    console.log("Submitting form");
    updateSearch(results[dropdownNum].toLowerCase());
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
        ref={searchFormRef}
        type="text"
        onInput={(event) => updateResults((event.target as HTMLInputElement).value)}
        onKeyUp={(event) => {
          if (event.code === "Enter") submitSearch();
        }}
      />
      <input
        className="absolute top-11 right-1 z-10 w-8 invert-[40%]"
        id="searchSubmit"
        type="image"
        src={submitButton}
        onClick={() => submitSearch()}
      />
      <PokemonSearchDropdown results={results} submit={submitSearch} />
    </section>
  );
}
