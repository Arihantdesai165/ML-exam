import { useState, useCallback } from "react";
import { Check, Copy, Code2 } from "lucide-react";

interface Program {
  id: number;
  name: string;
  language: string;
  code: string;
}

interface ProgramCardProps {
  program: Program;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  C: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "C++": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Java: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  JavaScript: "text-green-400 bg-green-400/10 border-green-400/20",
};

export function ProgramCard({ program }: ProgramCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(program.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = program.code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [program.code]);

  const langColor =
    LANGUAGE_COLORS[program.language] ??
    "text-slate-400 bg-slate-400/10 border-slate-400/20";

  return (
    <div className="group relative bg-[#0f1117] border border-[#1e2433] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#2d3a52] hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-[#1a2035] border border-[#2d3a52] text-xs font-bold text-slate-400 font-mono">
              {program.id}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-100 leading-snug truncate">
                {program.name}
              </h3>
              <span
                className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${langColor}`}
              >
                <Code2 className="w-2.5 h-2.5" />
                {program.language}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
              copied
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : "bg-[#1a2035] border-[#2d3a52] text-slate-400 hover:bg-[#232d47] hover:text-slate-200 hover:border-[#3d4f6e]"
            }`}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-4 relative">
          <pre className="overflow-x-auto rounded-lg bg-[#070a10] border border-[#1a2035] p-4 text-xs leading-relaxed text-slate-300 font-mono max-h-52 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2d3a52]">
            <code>{program.code}</code>
          </pre>
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#070a10] to-transparent rounded-b-lg pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
