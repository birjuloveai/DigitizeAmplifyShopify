import { useState } from "react";
import StatusBadge from "./StatusBadge";
import Lightbox from "./Lightbox";

export default function SkuCard({ sku }) {
  const [showLightbox, setShowLightbox] = useState(false);
  const imgSrc = `${import.meta.env.BASE_URL}images/${encodeURIComponent(sku.image)}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 fade-in card-hover">
      <div className="flex gap-4">
        <img
          src={imgSrc}
          alt={sku.name}
          loading="lazy"
          className="w-24 h-32 object-cover rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          style={{ aspectRatio: "3/4" }}
          onClick={() => setShowLightbox(true)}
        />
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-text-main">{sku.name}</h4>
            <StatusBadge status={sku.status} />
          </div>
          <div className="text-xs text-gray-500 space-y-0.5">
            <p>ID: <span className="font-mono text-gray-400">{sku.id}</span></p>
            <p>Category: {sku.category} &middot; Size: {sku.size}</p>
            <p>MRP: <span className="font-semibold text-text-main">{"\u20B9"}{sku.mrp}</span> &middot; Cost: {"\u20B9"}{sku.cost}</p>
            <p>Bin: <span className="font-mono">{sku.bin}</span> &middot; Stock: <span className="font-semibold">{sku.stock}</span></p>
          </div>
        </div>
      </div>
      {showLightbox && <Lightbox src={imgSrc} alt={sku.name} onClose={() => setShowLightbox(false)} />}
    </div>
  );
}
