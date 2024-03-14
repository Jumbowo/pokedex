import { useEffect, useMemo, useState } from "react";
import moreInfoQuestionMark from "./assets/questionMark.svg";
import { RawAbilityEffect, RawAbilityFlavor } from "./types/types";

const abilityUrl = "https://pokeapi.co/api/v2/ability/";

export default function AbilityMoreInfo({ abilityName }: { abilityName: string }) {
  const [visible, setVisible] = useState(false);
  const [abilityInfo, setAbilityInfo] = useState({ effect: "" });

  const questionMarkIconMemo = useMemo(() => {
    return (
      <input
        className="w-3 invert-[90%] translate-y-px"
        type="image"
        src={moreInfoQuestionMark}
        alt="More info question mark"
        onClick={() => setVisible(true)}
        onMouseOver={() => setVisible(true)}
      />
    );
  }, []);

  useEffect(() => {
    async function getAbilityInfo() {
      const res = await fetch(abilityUrl + abilityName.toLowerCase());
      const data = await res.json();

      const effectEntry = data.effect_entries.find((entry: RawAbilityEffect) => entry.language.name === "en");
      const flavorEntry = data.flavor_text_entries.find((entry: RawAbilityFlavor) => entry.language.name === "en");

      const info = {
        effect: effectEntry !== undefined ? effectEntry.effect : flavorEntry.flavor_text,
      };

      setAbilityInfo(info);
    }
    getAbilityInfo();
  }, [abilityName]);

  return (
    <div
      onMouseLeave={() => setVisible(false)}
    >
      {questionMarkIconMemo}
      <article
        className={`
          absolute top-6 right-0 z-30 p-2 min-w-80
          bg-slate-900 border border-slate-600
          animate-[fadeIn_0.2s_ease-in-out_1] 
          ${visible ? "" : "hidden"}
        `}
      >
        {abilityInfo.effect}
      </article>
    </div>
  );
}
