import githubLogo from "./assets/githubLogo.svg";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center p-4 pt-8">
      <a
        className="border-2 border-slate-900 dark:border-slate-300 rounded-3xl p-1"
        href="https://github.com/jumbowo"
        target="blank"
      >
        <img className="w-6 invert-[20%] dark:invert-[90%]" src={githubLogo} alt="Github logo" />
      </a>
    </footer>
  );
}
