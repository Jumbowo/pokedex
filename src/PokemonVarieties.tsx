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
        ? varieties.slice(0, 4).map((name, index) => {
          return ( 
            <button
              className={`
                p-2 dark:hover:bg-slate-700 max-w-[20%]
                border-slate-900 hover:bg-slate-600
                border rounded-t-lg border-b-0 dark:border-slate-600
                ${name === selectedVar ? "bg-slate-500 dark:bg-slate-800" : "bg-slate-400 dark:bg-slate-900"}
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
