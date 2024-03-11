import { useRef, useState } from "react";
import PokemonSearchDropdown from "./PokemonSearchDropdown";
import Fuse from "fuse.js";
import * as nameIdData from "./assets/pokemonNameId.json";
import submitButton from "./assets/submitButton.svg";

const names = nameIdData.pokemon;
const fuseOptions = { useExtendedSearch: true, keys: ["name"] };
const fuse = new Fuse(names, fuseOptions);

const searchBoxTabIndex = 1;
  
export default function PokemonSearch({ updateSearch }: { updateSearch: React.Dispatch<string>}) {
  const [results, setResults] = useState([""]);

  const searchFormRef = useRef(null);

  function updateResults(input: string) {
    setResults(fuse.search(input).slice(0, 8).map((x) => x.item.name));
  }

  function submitSearch(dropdownNum: number = 0) {
    (searchFormRef.current as HTMLInputElement | null)!.value = "";
    (searchFormRef.current as HTMLInputElement | null)!.placeholder = results[dropdownNum];
    updateSearch(results[dropdownNum].toLowerCase());
    setResults([""]);
  }

  return (
    <section className="flex flex-col gap-2 items-center relative">
      <label className="font-bold text-2xl relative" htmlFor="searchForm">
        Search Pokemon:
        <input
          className="absolute top-11 -right-14 z-20 w-8 invert-[40%]"
          id="searchSubmit"
          type="image"
          src={submitButton}
          onClick={() => submitSearch()}
          tabIndex={-1}
        />
      </label>
      <input
        className="
          border border-slate-600 bg-slate-900 max-w-96 w-80 p-2
          focus:outline-0 focus:border-slate-400 z-10
        "
        id="searchForm"
        ref={searchFormRef}
        type="text"
        onInput={(event) => updateResults((event.target as HTMLInputElement).value)}
        onKeyUp={(event) => {
          if (event.code === "Enter") submitSearch();
        }}
        tabIndex={searchBoxTabIndex}
        autoFocus
      />
      <PokemonSearchDropdown results={results} submit={submitSearch} searchBoxTabIndex={searchBoxTabIndex} />
    </section>
  );
}
