import PokemonInfo from "./PokemonInfo";
import PokemonSearch from "./PokemonSearch";

export default function MainContent() {
  return (
    <div className="flex flex-col gap-5 max-w-5xl p-4 text-center">
      <PokemonSearch />
      <PokemonInfo name="pikachu" />
    </div>
  );
}
