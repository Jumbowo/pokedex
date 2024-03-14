import { useCallback, useMemo, useRef, useState } from "react";
import PokemonSearchDropdown from "./PokemonSearchDropdown";
import Fuse from "fuse.js";
import * as nameIdData from "./assets/pokemonNameId.json";
import arrowIcon from "./assets/arrowIcon.svg";
import randomSearchIcon from "./assets/randomSearchIcon.svg";
import { useExternalClickHandler } from "./hooks/useExternalClickHandler";

const names = nameIdData.pokemon;
const fuseOptions = { useExtendedSearch: true, keys: ["name"] };
const fuse = new Fuse(names, fuseOptions);

const searchBoxTabIndex = 1;
  
export default function PokemonSearch({ updateSearch }: { updateSearch: (name: string) => void }) {
  const [results, setResults] = useState([""]);
  const [dropdownVisible, setDropdownVisible] = useState(true);

  const searchFormRef = useRef(null);
  const randomSearchRef = useRef(null);
  const pokemonSearchDropdownRef = useRef(null);

  useExternalClickHandler(pokemonSearchDropdownRef, () => setDropdownVisible(false));

  function updateResults(input: string) {
    setResults(fuse.search(input).slice(0, 8).map((x) => x.item.name));
  }

  const submitSearch = useCallback((dropdownNum: number = 0) => {
    (searchFormRef.current as HTMLInputElement | null)!.value = "";
    (searchFormRef.current as HTMLInputElement | null)!.placeholder = results[dropdownNum];
    updateSearch(results[dropdownNum].toLowerCase());
    setResults([""]);
  }, [results, updateSearch]);

  const searchRandom = useCallback(() => {
    (randomSearchRef.current as HTMLInputElement | null)!.disabled = true; 
    setTimeout(() => (randomSearchRef.current as HTMLInputElement | null)!.disabled = false, 1000); 
    const randomPokemon = names[Math.floor(Math.random() * 1023)].name.toLowerCase();
    updateSearch(randomPokemon);
    setResults([""]);
  }, [updateSearch]);

  const childrenMemo = useMemo(() => {
    return (
      <>
        <label className="font-bold text-2xl relative" htmlFor="searchForm">
          Search Pokemon:
          <input
            className="absolute top-11 -right-14 z-20 w-8 invert-[50%] hover:invert-[90%]"
            id="searchSubmit"
            type="image"
            src={arrowIcon}
            onClick={() => submitSearch()}
            tabIndex={-1}
          />
          <input
            className="
            absolute top-[39px] -right-28 z-20 w-10 outline-0 invert-[50%]
            focus:invert-[90%] hover:invert-[90%]
            "
            id="searchSubmit"
            ref={randomSearchRef}
            type="image"
            src={randomSearchIcon}
            onClick={searchRandom}
            tabIndex={searchBoxTabIndex + 1}
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
          onClick={() => setDropdownVisible(true)}
          onInput={(event) => updateResults((event.target as HTMLInputElement).value)}
          onKeyUp={(event) => {
            if (event.code === "Enter") submitSearch();
          }}
          tabIndex={searchBoxTabIndex}
          autoFocus
        />
      </>
    );
  }, [searchRandom, submitSearch])

  return (
    <section className="flex flex-col gap-2 items-center relative">
      {childrenMemo}
      {dropdownVisible
        ? <PokemonSearchDropdown 
            results={results} 
            submit={submitSearch} 
            searchBoxTabIndex={searchBoxTabIndex} 
            searchRef={pokemonSearchDropdownRef}
          />
        : <></>
      }
    </section>
  );
}
