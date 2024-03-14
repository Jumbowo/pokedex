import Footer from "./Footer";
import MainContent from "./MainContent";

export default function App() {
  return (
    <div
      className="
        min-w-screen min-h-screen flex flex-col bg-slate-950
        p-0 pt-20 sm:p-2 sm:pt-20 sm:pb-0 justify-between
      "
    >
      <MainContent />
      <Footer />
    </div>
  )
}
