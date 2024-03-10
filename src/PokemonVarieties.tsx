export default function PokemonVarieties({ nonSelectedVarieties, submit, baseTabIndex }: {
  nonSelectedVarieties: string[],
  submit: (varietyName: string) => void,
  baseTabIndex: number,
}) {
  if (nonSelectedVarieties.length === 0) return <></>;
  return (
    <div className="flex flex-col">
      <ol className="max-w-96 w-80 top-20 text-left z-10 flex flex-col gap-0 self-center">
        {nonSelectedVarieties[0] !== ""
          ? nonSelectedVarieties.map((name, index) => {
            return ( 
              <li
                className="
                  p-2 bg-slate-800 hover:bg-slate-700 
                  border border-t-0 border-slate-600
                  first:border-t first:-mt-px 
                  focus:outline-0 focus:border-slate-400 focus:border-t focus:-mt-px
                "
                key={name}
                value={index}
                onClick={() => submit(name)}
                onKeyUp={(event) => {
                  if (event.code === "Enter") submit(name);
                }}
                tabIndex={baseTabIndex + index + 1}
              >
                {name}
              </li>
            )
          })
          : null
        }
      </ol>
    </div>
  );
}
