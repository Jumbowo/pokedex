export default function PokemonSearchDropdown({ results }: { results: string[] }) {
  return (
    <ul
      className="
        max-w-96 w-80 absolute top-20
        text-left 
        flex flex-col gap-0
      "
    >
      {results[0] !== ""
        ? results.map((name) => {
          return ( 
            <li
              className="bg-slate-800 border border-b-0 last:border-b border-slate-600 hover:bg-slate-700 p-2"
              key={name}
            >
              {name}
            </li>
          )
        })
        : null
      }
    </ul>
  );
}
