export default function PokemonSearchDropdown({ results, submit }: {
  results: string[],
  submit: (dropdownNum: number) => void
}) {
  return (
    <ol
      className="
        max-w-96 w-80 absolute top-20
        text-left 
        flex flex-col gap-0
      "
    >
      {results[0] !== ""
        ? results.map((name, index) => {
          return ( 
            <li
              className="bg-slate-800 border border-b-0 last:border-b border-slate-600 hover:bg-slate-700 p-2"
              key={name}
              value={index}
              onClick={(event) => submit((event.target as HTMLLIElement).value)}
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
