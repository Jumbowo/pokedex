import typeIcons from "./assets/types/typeIcons.tsx";

interface TypeInfo {
  name: string,
  icon: string,
  color: string,
}

export default function PokemonTypes({ types }: { types: string[] }) {
  const typeInfoList = typeIcons.filter((type: TypeInfo) => types.includes(type.name));

  return (
    <div className="flex flex-row gap-2 relative" >
      {typeInfoList.map((type) => {
        return (
          <img
            className="p-1 w-7 h-7 translate-y-[3px] z-0 border rounded-full"
            style={{ backgroundColor: `${type.color}` }}
            key={type.name}
            src={type.icon}
            title={type.name.slice(0, 1).toUpperCase() + type.name.slice(1)}
            alt={type.name.slice(0, 1).toUpperCase() + type.name.slice(1) + " type"}
          />
        );
      })}
    </div>
  );
}
