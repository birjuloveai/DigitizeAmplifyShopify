import { useEffect } from "react";

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto lightbox-backdrop"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/70" />

      {/* Fixed close button — always visible */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[110] w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      {/* Scrollable image container */}
      <div className="relative min-h-full flex items-center justify-center p-6">
        <img
          src={src}
          alt={alt || ""}
          className="relative max-w-[92vw] max-h-none object-contain rounded-2xl shadow-2xl lightbox-img"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
