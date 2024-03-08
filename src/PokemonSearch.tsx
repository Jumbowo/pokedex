import { useEffect, useState } from "react";
import Fuse from "fuse.js";

import * as nameData from "./assets/pokemonNames.json";

const names = nameData.names;
const fuseOptions = { };
const fuse = new Fuse(names, fuseOptions);

export default function PokemonSearch() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    setResults(fuse.search(input));
  }, [input]);

  console.log(results);

  return (
    <div className="flex flex-col gap-2 items-center">
      <label className="font-bold text-2xl" htmlFor="searchForm">Search Pokemon:</label>
      <input
        className="border bg-slate-800 max-w-96 w-80 p-2"
        id="searchForm"
        type="text"
        onInput={(event) => setInput((event.target as HTMLInputElement).value)}
      />
    </div>
  );
}
