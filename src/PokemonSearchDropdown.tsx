export default function PokemonSearchDropdown({ results, submit, searchBoxTabIndex }: {
  results: string[],
  submit: (dropdownNum: number) => void,
  searchBoxTabIndex: number,
}) {
  return (
    <ol className="max-w-96 w-80 absolute top-20 text-left flex flex-col gap-0 z-10">
      {results[0] !== ""
        ? results.map((name, index) => {
          return ( 
            <li
              className="bg-slate-800 border border-b-0 last:border-b border-slate-600 hover:bg-slate-700 p-2"
              key={name}
              value={index}
              onClick={() => submit(index)}
              onKeyUp={(event) => {
                if (event.code === "Enter") submit(index);
              }}
              tabIndex={searchBoxTabIndex + index}
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
