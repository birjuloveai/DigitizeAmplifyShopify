import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] overflow-y-auto lightbox-backdrop"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/80" />

      {/* Fixed close button — always visible top-right */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="fixed top-4 right-4 z-[10000] w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors"
        aria-label="Close"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      {/* Scrollable image container */}
      <div
        className="relative min-h-full flex items-center justify-center p-8 pt-16"
        onClick={onClose}
      >
        <img
          src={src}
          alt={alt || ""}
          className="relative max-w-[90vw] object-contain rounded-2xl shadow-2xl lightbox-img cursor-default"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>,
    document.body
  );
}
