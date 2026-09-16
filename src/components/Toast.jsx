export default function Toast({ message, type = "success" }) {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
    warning: "bg-amber-50 border-amber-200 text-amber-700",
  };

  const icons = {
    success: (
      <svg className="w-4 h-4 check-anim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    ),
    info: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
      </svg>
    ),
    warning: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 9v2m0 4h.01M10.29 3.86l-8.6 14.86A2 2 0 003.44 21h17.12a2 2 0 001.74-2.98l-8.6-14.86a2 2 0 00-3.42 0z" />
      </svg>
    ),
  };

  return (
    <div className={`toast-in flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium ${styles[type]}`}>
      {icons[type]}
      {message}
    </div>
  );
}
