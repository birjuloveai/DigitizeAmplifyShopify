import { useState } from "react";
import skus from "../data/skus";
import SkuCard from "../components/SkuCard";
import StatusBadge from "../components/StatusBadge";
import MetricBox from "../components/MetricBox";
import SectionHeader from "../components/SectionHeader";
import Toast from "../components/Toast";

function ScanToCatalog() {
  const [scanIndex, setScanIndex] = useState(0);
  const [scanned, setScanned] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);
    setScanned(null);
    setTimeout(() => {
      setScanned(skus[scanIndex % skus.length]);
      setScanIndex((i) => i + 1);
      setLoading(false);
    }, 1200);
  };

  return (
    <div id="d1" className="bg-white rounded-2xl border border-gray-200 p-6 card-hover shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#1E1B4B" strokeWidth="2">
            <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 8h10M7 12h10M7 16h10" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">Scan to Catalog</h3>
      </div>

      <button
        onClick={handleScan}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-indigo-deep text-white px-5 py-3 rounded-xl text-sm font-medium btn-hover disabled:opacity-50"
      >
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
        </svg>
        {loading ? "Scanning..." : "Scan Item"}
      </button>

      {loading && (
        <div className="mt-4 space-y-3">
          <div className="shimmer h-8 rounded-lg w-3/4" />
          <div className="shimmer h-6 rounded-lg w-1/2" />
          <div className="shimmer h-6 rounded-lg w-2/3" />
        </div>
      )}

      {scanned && !loading && <div className="mt-4"><SkuCard sku={scanned} /></div>}

      <MetricBox variant="indigo">
        <strong>Avg cataloguing time: 8 sec per item</strong> vs 4 min manual
      </MetricBox>
    </div>
  );
}

function AIModelShots() {
  const [selectedId, setSelectedId] = useState(skus[0].id);
  const [views, setViews] = useState(null);
  const [loading, setLoading] = useState(false);

  const labels = ["Front View", "Side View", "Back View", "Detail", "Full Length", "Lifestyle"];
  const selected = skus.find((s) => s.id === selectedId);

  const handleGenerate = () => {
    setLoading(true);
    setViews(null);
    setTimeout(() => {
      setViews(labels);
      setLoading(false);
    }, 1800);
  };

  return (
    <div id="d2" className="bg-white rounded-2xl border border-gray-200 p-6 card-hover shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#1E1B4B" strokeWidth="2">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">AI On-Model Shots</h3>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select
          value={selectedId}
          onChange={(e) => { setSelectedId(e.target.value); setViews(null); }}
          className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm flex-1 bg-gray-50 focus:bg-white focus:border-indigo-deep outline-none transition-colors"
        >
          {skus.map((s) => (
            <option key={s.id} value={s.id}>{s.name} ({s.size})</option>
          ))}
        </select>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-deep text-white px-5 py-2.5 rounded-xl text-sm font-medium btn-hover disabled:opacity-50 shrink-0"
        >
          {loading ? "Generating..." : "Generate Views"}
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="shimmer rounded-xl" style={{ aspectRatio: "3/4" }} />
          ))}
        </div>
      )}

      {views && !loading && selected && (
        <div className="grid grid-cols-3 gap-2 fade-in">
          {views.map((label) => (
            <div key={label} className="relative rounded-xl overflow-hidden group" style={{ aspectRatio: "3/4" }}>
              <img
                src={`/images/${encodeURIComponent(selected.image)}`}
                alt={`${selected.name} - ${label}`}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 text-white text-[10px] sm:text-xs font-medium">{label}</span>
            </div>
          ))}
        </div>
      )}

      <MetricBox variant="indigo">
        <strong>{"\u20B9"}0 photography cost</strong> &middot; 6 angles in 2 sec
      </MetricBox>
    </div>
  );
}

function LiveStockBoard() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Men", "Women", "Kids"];
  const filtered = filter === "All" ? skus : skus.filter((s) => s.category === filter);

  const totalStockValue = skus.reduce((sum, s) => sum + s.stock * s.mrp, 0);
  const deadCount = skus.filter((s) => s.status === "dead").length;
  const totalUnits = skus.reduce((sum, s) => sum + s.stock, 0);

  return (
    <div id="d3" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header bar */}
      <div className="bg-gradient-to-r from-indigo-deep to-[#2D2A6E] px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Live Stock Board
          </h3>
          <div className="flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === cat
                    ? "bg-saffron text-indigo-deep"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-indigo-deep">{skus.length}</div>
          <div className="text-xs text-gray-400 mt-0.5">Total SKUs</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-indigo-deep">{"\u20B9"}{(totalStockValue / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-400 mt-0.5">Stock Value</div>
        </div>
        <div className="p-4 text-center">
          <div className="text-2xl font-bold text-danger">{deadCount}</div>
          <div className="text-xs text-gray-400 mt-0.5">Dead Stock</div>
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto px-2 pb-2">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 uppercase text-xs border-b border-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Size</th>
              <th className="p-3 text-right">Stock</th>
              <th className="p-3">Bin</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sku, i) => (
              <tr key={sku.id} className={`border-b border-gray-50 hover:bg-indigo-50/50 transition-colors ${i % 2 === 0 ? "bg-gray-50/30" : ""}`}>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <img src={`/images/${encodeURIComponent(sku.image)}`} alt="" className="w-8 h-8 rounded object-cover" loading="lazy" />
                    <span className="font-medium">{sku.name}</span>
                  </div>
                </td>
                <td className="p-3 text-gray-500">{sku.category}</td>
                <td className="p-3">{sku.size}</td>
                <td className="p-3 text-right font-medium">{sku.stock}</td>
                <td className="p-3 font-mono text-gray-400 text-xs">{sku.bin}</td>
                <td className="p-3"><StatusBadge status={sku.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden p-4 space-y-2">
        {filtered.map((sku) => (
          <div key={sku.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/50 border border-gray-100">
            <img src={`/images/${encodeURIComponent(sku.image)}`} alt="" className="w-10 h-12 rounded-lg object-cover" loading="lazy" style={{ aspectRatio: "3/4" }} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm truncate">{sku.name}</span>
                <StatusBadge status={sku.status} />
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {sku.category} &middot; {sku.size} &middot; Stock: {sku.stock} &middot; {sku.bin}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-5">
        <MetricBox variant="indigo">
          <strong>Know your entire {"\u20B9"}{totalStockValue.toLocaleString("en-IN")} stock</strong> in one view
        </MetricBox>
      </div>
    </div>
  );
}

function DeadStockAlert() {
  const [toastVisible, setToastVisible] = useState(false);
  const deadItems = skus.filter((s) => s.status === "dead");
  const totalLocked = deadItems.reduce((sum, s) => sum + s.stock * s.cost, 0);

  const handleSend = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000);
  };

  return (
    <div id="d4" className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-200/60 shadow-sm overflow-hidden">
      {/* Alert header */}
      <div className="bg-danger/10 border-b border-red-200/60 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-semibold text-red-800 flex items-center gap-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01M10.29 3.86l-8.6 14.86A2 2 0 003.44 21h17.12a2 2 0 001.74-2.98l-8.6-14.86a2 2 0 00-3.42 0z" /></svg>
          Dead Stock Alert
        </h3>
        <div className="bg-red-600 text-white text-sm px-4 py-1.5 rounded-full font-bold">
          {"\u20B9"}{totalLocked.toLocaleString("en-IN")} locked
        </div>
      </div>

      <div className="p-6 space-y-3">
        {deadItems.map((sku) => (
          <div key={sku.id} className="bg-white rounded-xl p-4 border border-red-100 card-hover">
            <div className="flex gap-3">
              <img src={`/images/${encodeURIComponent(sku.image)}`} alt={sku.name} loading="lazy" className="w-14 h-18 rounded-lg object-cover" style={{ aspectRatio: "3/4" }} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-sm">{sku.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{sku.daysOld} days sitting &middot; {sku.stock} units</div>
                  </div>
                  <StatusBadge status="dead" />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-red-600 font-medium">{"\u20B9"}{(sku.stock * sku.cost).toLocaleString("en-IN")} locked</span>
                  <span className="text-success font-medium">Liquidate @ {"\u20B9"}{Math.round(sku.cost * 1.1)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleSend}
          className="w-full bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-medium btn-hover flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
          Send Liquidation Offer on WhatsApp
        </button>

        {toastVisible && (
          <div className="mt-2">
            <Toast message="Offer sent to 38 customers" type="success" />
          </div>
        )}

        <MetricBox variant="indigo">
          <strong>{"\u20B9"}{totalLocked.toLocaleString("en-IN")} locked in dead stock</strong> — recover in 7 days
        </MetricBox>
      </div>
    </div>
  );
}

export default function Digitize({ resetKey }) {
  return (
    <section id="digitize" className="py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Digitize"
          subtitle="Turn your physical store into a digital catalog in minutes"
          hindi="अपनी दुकान को मिनटों में डिजिटल बनाएं"
          variant="indigo"
          features={[
            { id: "d1", label: "Scan" },
            { id: "d2", label: "AI Shots" },
            { id: "d3", label: "Stock Board" },
            { id: "d4", label: "Dead Stock" },
          ]}
        />

        {/* D1 + D2: side by side on desktop */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ScanToCatalog key={`scan-${resetKey}`} />
          <AIModelShots key={`ai-${resetKey}`} />
        </div>

        {/* D3: full width */}
        <div className="mb-6">
          <LiveStockBoard />
        </div>

        {/* D4: full width */}
        <DeadStockAlert key={`dead-${resetKey}`} />
      </div>
    </section>
  );
}
