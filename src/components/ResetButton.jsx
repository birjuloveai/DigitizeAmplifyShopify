export default function ResetButton({ onReset }) {
  return (
    <button
      onClick={onReset}
      className="fixed bottom-5 right-5 z-50 bg-saffron text-indigo-deep px-4 py-2.5 rounded-xl text-sm font-semibold shadow-lg btn-hover flex items-center gap-2"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 105.64-12.36L1 10" />
      </svg>
      Reset Demo
    </button>
  );
}
