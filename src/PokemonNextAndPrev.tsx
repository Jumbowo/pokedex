import arrowIcon from "./assets/arrowIcon.svg";
import { Pokemon } from "./types";

export default function PokemonNextAndPrev({ pokemon, updateSearch }: {
  pokemon: Pokemon,
  updateSearch: (name: string) => void,
}) {
  return (
    <nav className="flex flex-row justify-center">
      {pokemon.prevName !== ""
        ? <button
            className="
              p-1 bg-slate-900 border border-r-0 border-b-0 border-slate-600
              w-[50%] text-left flex flex-row gap-4
              hover:bg-slate-800 
            "
            onClick={() => updateSearch(pokemon.prevName.toLowerCase())}
          >
            <img
              className="w-10 invert-[90%] rotate-180 translate-y-px"
              src={arrowIcon}
            />
            <h4 className="font-semibold self-center">{pokemon.prevName}</h4>
          </button>
        : <></>
      }
      {pokemon.nextName !== ""
        ? <button
            className="
              p-1 bg-slate-900 border border-b-0 border-slate-600
              w-[50%] text-right flex flex-row gap-4 justify-end
              hover:bg-slate-800
            "
            onClick={() => updateSearch(pokemon.nextName.toLowerCase())}
          >
            <h4 className="font-semibold self-center">{pokemon.nextName}</h4>
            <img
              className="w-10 invert-[90%]"
              src={arrowIcon}
            />
          </button>
        : <></>
      }
    </nav>
  );
}
