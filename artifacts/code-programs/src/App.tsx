import { programs } from "@programs";
import { ProgramCard } from "./components/ProgramCard";
import { Code2, BookOpen } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-[#080b12] text-slate-100">
      <header className="sticky top-0 z-10 border-b border-[#1e2433] bg-[#080b12]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25">
              <Code2 className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="font-bold text-base text-slate-100 tracking-tight">
              Code Programs
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{programs.length} programs</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">
            Code Programs Library
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            A curated collection of algorithms and data structures. Click{" "}
            <span className="text-slate-300 font-medium">Copy Code</span> to
            copy any program to your clipboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </main>

      <footer className="border-t border-[#1e2433] mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 text-center text-xs text-slate-600">
          {programs.length} programs · React + Tailwind CSS
        </div>
      </footer>
    </div>
  );
}

export default App;
