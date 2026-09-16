import { useState } from "react";

const tabs = [
  { label: "Digitize", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { label: "Amplify", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
  { label: "Shopify", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
  { label: "Survey", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" },
];

export default function Nav({ activeSection }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (label) => {
    const el = document.getElementById(label.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-indigo-deep/95 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
        <div className="font-bold text-lg tracking-tight">
          <span className="text-saffron">D</span>igitize{" "}
          <span className="text-saffron">A</span>mplify{" "}
          <span className="text-saffron">S</span>hopify
        </div>

        {/* Desktop tabs */}
        <div className="hidden sm:flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleClick(tab.label)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === tab.label.toLowerCase()
                  ? "bg-saffron text-indigo-deep shadow-md"
                  : "hover:bg-white/10"
              }`}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="sm:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-indigo-deep border-t border-white/10 px-4 pb-3 fade-in">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => handleClick(tab.label)}
              className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all mt-1 ${
                activeSection === tab.label.toLowerCase()
                  ? "bg-saffron text-indigo-deep"
                  : "text-white/80 hover:bg-white/10"
              }`}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
