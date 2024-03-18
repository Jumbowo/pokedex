import { RefObject } from "react";

export default function PokemonSearchDropdown({ results, submit, searchBoxTabIndex, searchRef }: {
  results: string[],
  submit: (dropdownNum: number) => void,
  searchBoxTabIndex: number,
  searchRef: RefObject<HTMLOListElement>,
}) {
  return (
    <ol
      className="max-w-96 w-80 absolute top-20 text-left z-20 flex flex-col gap-0"
      ref={searchRef}
    >
      {results[0] !== ""
        ? results.map((name, index) => {
          return ( 
            <li
              className="
                p-2 bg-slate-500 hover:bg-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 
                border border-t-0 border-slate-900 dark:border-slate-600
                first:border-t first:-mt-px 
                focus:outline-0 focus:border-slate-700 dark:focus:border-slate-400 focus:border-t focus:-mt-px
              "
              key={name}
              value={index}
              onClick={() => submit(index)}
              onKeyUp={(event) => {
                if (event.code === "Enter") submit(index);
              }}
              tabIndex={searchBoxTabIndex + index + 1}
            >
              {name}
            </li>
          )
        })
        : null
      }
    </ol>
  );
}
