import typeIcons from "./assets/types/typeIcons.tsx";

interface TypeInfo {
  name: string,
  icon: string,
}

export default function PokemonTypes({ types }: { types: string[] }) {
  const typeInfoList = new Array<TypeInfo>();
  for (const t of types) typeInfoList.push({ name: t, icon: typeIcons[t as keyof typeof typeIcons] });

  return (
    <div className="flex flex-row gap-2 relative" >
      {typeInfoList.map((icon) => {
        return (
          <img
            className="w-5 translate-y-px z-0"
            key={icon.name}
            src={icon.icon}
            title={icon.name.slice(0, 1).toUpperCase() + icon.name.slice(1)}
            alt={icon.name.slice(0, 1).toUpperCase() + icon.name.slice(1) + " type"}
          />
        );
      })}
    </div>
  );
}
