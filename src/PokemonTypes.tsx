import typeIcons from "./assets/types/typeIcons.tsx";

export default function PokemonTypes({ types }: { types: string[] }) {
  const typeIconsRender = [];
  for (const t of types) {
    typeIconsRender.push(typeIcons[t])
  }

  return (
    <div className="flex flex-row gap-2 relative" >
      {typeIconsRender.map((icon) => <img className="w-5 translate-y-px z-0" key={icon} src={icon} />)}    
    </div>
  );
}
