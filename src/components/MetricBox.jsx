const themes = {
  indigo: "border-indigo-deep bg-indigo-50 text-indigo-deep",
  saffron: "border-saffron bg-amber-50 text-amber-900",
  teal: "border-teal bg-teal-light text-teal-800",
};

export default function MetricBox({ children, variant = "indigo" }) {
  return (
    <div className={`mt-5 border-l-4 rounded-r-lg p-4 text-sm ${themes[variant]}`}>
      {children}
    </div>
  );
}
