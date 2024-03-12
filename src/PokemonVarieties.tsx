import prettifyName from "./prettifyName";

export default function PokemonVarieties({ nonSelectedVarieties, submit, baseTabIndex }: {
  nonSelectedVarieties: string[],
  submit: (varietyName: string) => void,
  baseTabIndex: number,
}) {
  if (nonSelectedVarieties.length === 0) return <></>;
  return (
    <ol className="text-left flex flex-row gap-2 justify-start self-stretch">
      {nonSelectedVarieties[0] !== ""
        ? nonSelectedVarieties.map((name, index) => {
          return ( 
            <button
              className="
                p-2 bg-slate-900 hover:bg-slate-800 
                border rounded-t-lg border-b-0 border-slate-600
                focus:outline-0 focus:border-slate-400
              "
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
