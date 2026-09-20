import { useState, useEffect } from "react";

function AnimatedCounter({ end, suffix = "", prefix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame;
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end]);
  return <span>{prefix}{val.toLocaleString("en-IN")}{suffix}</span>;
}

export default function Hero() {
  const stats = [
    { value: 12, suffix: " SKUs", label: "Catalogued in 96 sec", prefix: "" },
    { value: 142, suffix: "", label: "Customers reached instantly", prefix: "" },
    { value: 18, suffix: " km", label: "Delivery radius unlocked", prefix: "" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-deep via-[#2D2A6E] to-[#1a1745]">
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-saffron blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: copy */}
          <div className="text-white fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Your shop, digitised.
              <br />
              <span className="text-saffron">Your reach, amplified.</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg max-w-lg">
              One platform to catalog stock, bring back customers, and sell online — built for Indian retail.
            </p>
            <p className="mt-2 text-sm text-white/40 font-hind">
              {"ನಿಮ್ಮ ಅಂಗಡಿ, ಡಿಜಿಟಲ್. ನಿಮ್ಮ ತಲುಪು, ಅಸೀಮಿತ."}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => document.getElementById("digitize")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-saffron text-indigo-deep px-6 py-3 rounded-xl text-sm font-bold btn-hover"
              >
                See the Demo
              </button>
              <button
                onClick={() => document.getElementById("survey")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white/10 text-white px-6 py-3 rounded-xl text-sm font-medium border border-white/20 btn-hover"
              >
                Take Survey
              </button>
            </div>
          </div>

          {/* Right: stat counters */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur rounded-2xl p-5 text-center border border-white/10 count-fade"
                style={{ animationDelay: `${i * 0.2}s`, animationFillMode: "both" }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white">
                  <AnimatedCounter end={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div className="text-xs text-white/50 mt-2 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
