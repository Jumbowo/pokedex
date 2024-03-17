import prettifyName from "./utils/prettifyName.ts";

export default function PokemonVarieties({ varieties, selectedVar, submit, baseTabIndex }: {
  varieties: string[],
  selectedVar: string,
  submit: (varietyName: string) => void,
  baseTabIndex: number,
}) {
  if (varieties.length === 0) return <></>;
  return (
    <ol className="text-left flex flex-row gap-2 justify-start self-stretch">
      {varieties[0] !== ""
        ? varieties.slice(0, 5).map((name, index) => {
          return ( 
            <button
              className={`
                p-2 hover:bg-slate-700 max-w-[18%]
                border rounded-t-lg border-b-0 border-slate-600
                focus:outline-0 focus:border-slate-400
                ${name === selectedVar ? "bg-slate-800" : "bg-slate-900"}
              `}
              key={name}
              value={index}
              onClick={() => submit(name)}
              onKeyUp={(event) => {
                if (event.code === "Enter") submit(name);
              }}
              tabIndex={baseTabIndex + index + 1}
            >
              {prettifyName(name)}
            </button>
          )
        })
        : null
      }
    </ol>
  );
}
