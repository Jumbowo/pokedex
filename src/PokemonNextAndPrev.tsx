import arrowIcon from "./assets/arrowIcon.svg";
import { Pokemon } from "./types";

export default function PokemonNextAndPrev({ pokemon, updateSearch }: {
  pokemon: Pokemon,
  updateSearch: (name: string) => void,
}) {
  return (
    <nav className="flex flex-row justify-center">
      <button
        className={`
          p-1 bg-slate-900 border border-r-0 border-slate-600
          w-[50%] text-left flex flex-row gap-4 outline-0
          ${pokemon.prevName === "" ? "text-slate-500" : "hover:bg-slate-700 focus:border-slate-400 focus:border-r"}
        `}
        onClick={() => pokemon.prevName !== "" ? updateSearch(pokemon.prevName.toLowerCase()) : ""}
        tabIndex={pokemon.prevName === "" ? -1 : 3}
      >
        <img
          className={`w-10 rotate-180 translate-y-px ${pokemon.prevName !== "" ? "invert-[90%]" : "invert-[40%]"}`}
          src={arrowIcon}
          alt="Left pointing arrow"
        />
        <h4 className="font-semibold self-center">{pokemon.prevName !== "" ? pokemon.prevName : "None"}</h4>
      </button>
      <button
        className={`
          p-1 bg-slate-900 border border-slate-600
          w-[50%] text-right flex flex-row gap-4 justify-end outline-0
          ${pokemon.nextName === "" ? "text-slate-500" : "hover:bg-slate-700 focus:border-slate-400"}
        `}
        onClick={() => pokemon.nextName !== "" ? updateSearch(pokemon.nextName.toLowerCase()) : ""}
        tabIndex={pokemon.prevName === "" ? -1 : 4}
      >
        <h4 className="font-semibold self-center">{pokemon.nextName !== "" ? pokemon.nextName : "None"}</h4>
        <img
          className={`w-10 ${pokemon.nextName !== "" ? "invert-[90%]" : "invert-[50%]"}`}
          src={arrowIcon}
          alt="Right pointing arrow"
        />
      </button>
    </nav>
  );
}
