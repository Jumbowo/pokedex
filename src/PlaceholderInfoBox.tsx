export default function PlaceholderInfoBox() {
  return (
    <section
      className="
        flex flex-col relative
        animate-[fadeIn_0.5s_ease-in-out_1]
      "
    >
      <section
        className="
          p-4 text-left max-w-3xl flex flex-col
          border border-slate-600 bg-slate-900
        "
      >
        <div className="flex flex-row justify-between text-2xl">
          <div className="flex flex-row">
            <h1 className="pr-3 w-40 rounded bg-slate-700 animate-pulse" >&nbsp;</h1>
          </div>
          <h2 className="w-10 rounded bg-slate-700 animate-pulse" />
        </div>
        <div className="flex flex-row justify-between pt-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="pt-4 rounded bg-slate-700 animate-pulse min-w-40 h-6">&nbsp;</div>
          </div>
          <div className="min-w-[40%] min-h-48 rounded bg-slate-700 animate-pulse">&nbsp;</div>
        </div>
      </section>
    </section>
  );
}
