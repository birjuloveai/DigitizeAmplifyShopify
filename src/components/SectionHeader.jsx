const themes = {
  indigo: {
    gradient: "from-indigo-deep to-[#2D2A6E]",
    line: "bg-indigo-deep",
    subtext: "text-indigo-200",
  },
  saffron: {
    gradient: "from-amber-600 to-saffron",
    line: "bg-saffron",
    subtext: "text-amber-200",
  },
  teal: {
    gradient: "from-teal to-teal-600",
    line: "bg-teal",
    subtext: "text-teal-200",
  },
};

export default function SectionHeader({ title, subtitle, hindi, variant = "indigo", features = [] }) {
  const theme = themes[variant];
  return (
    <div className={`bg-gradient-to-r ${theme.gradient} rounded-2xl p-6 md:p-8 mb-8 text-white`}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className={`section-line ${theme.line} mb-3 opacity-60`} />
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className={`mt-1 text-sm ${theme.subtext}`}>{subtitle}</p>
          {hindi && <p className="text-xs text-white/40 font-hind mt-1">{hindi}</p>}
        </div>
        {features.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {features.map((f) => (
              <button
                key={f.id}
                onClick={() => document.getElementById(f.id)?.scrollIntoView({ behavior: "smooth", block: "center" })}
                className="bg-white/15 hover:bg-white/25 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
