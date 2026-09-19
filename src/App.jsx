import { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ResetButton from "./components/ResetButton";
import Digitize from "./sections/Digitize";
import Amplify from "./sections/Amplify";
import Shopify from "./sections/Shopify";
import Survey from "./sections/Survey";

function App() {
  const [activeSection, setActiveSection] = useState("digitize");
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const sections = ["digitize", "amplify", "shopify", "survey"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleReset = () => setResetKey((k) => k + 1);

  return (
    <div className="min-h-screen bg-surface">
      <Nav activeSection={activeSection} />
      <Hero />
      <Digitize resetKey={resetKey} />
      <Amplify resetKey={resetKey} />
      <Shopify resetKey={resetKey} />
      <Survey />

      <footer className="bg-indigo-deep text-white/40 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-saffron font-semibold">D</span>igitize{" "}
            <span className="text-saffron font-semibold">A</span>mplify{" "}
            <span className="text-saffron font-semibold">S</span>hopify
          </div>
          <div className="text-center">Demo data only — all figures are illustrative</div>
          <div className="font-hind text-white/25">{"இது விளக்கத்திற்காக மட்டுமே"}</div>
        </div>
      </footer>

      <ResetButton onReset={handleReset} />
    </div>
  );
}

export default App;
