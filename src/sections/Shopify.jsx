import { useState, useEffect, useRef } from "react";
import skus from "../data/skus";
import MetricBox from "../components/MetricBox";
import SectionHeader from "../components/SectionHeader";
import Toast from "../components/Toast";

function InventorySync({ resetKey }) {
  const initialStock = Object.fromEntries(skus.map((s) => [s.id, s.stock]));
  const [stock, setStock] = useState(initialStock);
  const [flash, setFlash] = useState(null);
  const [syncing, setSyncing] = useState(false);
  const [saleMessage, setSaleMessage] = useState(null);

  const handleSale = () => {
    const sku = skus.find((s) => s.id === "LN-SH-M");
    if (stock["LN-SH-M"] <= 0) return;
    setSyncing(true);
    setSaleMessage(`Customer bought 1 ${sku.name} (${sku.size}) online`);
    setTimeout(() => {
      setStock((prev) => ({ ...prev, "LN-SH-M": prev["LN-SH-M"] - 1 }));
      setFlash("LN-SH-M");
      setSyncing(false);
      setTimeout(() => setFlash(null), 600);
    }, 800);
  };

  const displaySkus = skus.slice(0, 5);

  return (
    <div id="s1" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#0D9488" strokeWidth="2"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">Two-Way Inventory Sync</h3>
      </div>

      <button
        onClick={handleSale}
        disabled={syncing || stock["LN-SH-M"] <= 0}
        className="w-full bg-teal text-white px-5 py-3 rounded-xl text-sm font-medium btn-hover disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
      >
        {syncing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Syncing...
          </>
        ) : "Simulate Online Sale"}
      </button>

      {saleMessage && <div className="mb-3"><Toast message={saleMessage} type="info" /></div>}

      <div className="grid grid-cols-2 gap-3">
        {["In-Store", "Online"].map((label) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{label}</h4>
            <div className="space-y-1.5">
              {displaySkus.map((sku) => (
                <div key={sku.id} className={`flex justify-between text-xs p-1.5 rounded-lg ${flash === sku.id ? "flash bg-amber-50" : ""}`}>
                  <span className="truncate pr-2">{sku.name}</span>
                  <span className="font-bold tabular-nums">{stock[sku.id]}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <MetricBox variant="teal">
        <strong>Zero overselling</strong> &middot; sync in &lt; 2 sec
      </MetricBox>
    </div>
  );
}

function RevenueSKU() {
  const revenueData = [
    { name: "Linen Shirt", inStore: 18500, online: 8200 },
    { name: "Nehru Jacket", inStore: 12600, online: 5800 },
    { name: "Silk Saree", inStore: 22000, online: 14500 },
    { name: "Chikankari Kurti", inStore: 6800, online: 9200 },
    { name: "Anarkali Suit", inStore: 3200, online: 9800 },
    { name: "Baby Frock", inStore: 4500, online: 2800 },
    { name: "Kids Denim Jacket", inStore: 5500, online: 3200 },
    { name: "Palazzo Set", inStore: 8200, online: 6400 },
  ];

  const maxVal = Math.max(...revenueData.flatMap((d) => [d.inStore + d.online]));
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div id="s2" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#0D9488" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">Revenue Per SKU</h3>
      </div>

      <div className="flex gap-4 text-xs text-gray-400 mb-4">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-deep/80 rounded" />In-store</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-teal rounded" />Online</span>
      </div>

      <div className="space-y-2">
        {revenueData.map((d, i) => {
          const total = d.inStore + d.online;
          return (
            <div
              key={d.name}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs w-24 sm:w-32 truncate text-gray-600">{d.name}</span>
                <div className="flex-1 flex h-6 rounded-lg overflow-hidden bg-gray-100">
                  <div
                    className="bg-indigo-deep/80 transition-all duration-300"
                    style={{ width: `${(d.inStore / maxVal) * 100}%` }}
                  />
                  <div
                    className="bg-teal transition-all duration-300"
                    style={{ width: `${(d.online / maxVal) * 100}%` }}
                  />
                </div>
              </div>
              {hoveredIdx === i && (
                <div className="text-[10px] text-gray-400 ml-26 sm:ml-34 mt-0.5 fade-in">
                  In-store: {"\u20B9"}{d.inStore.toLocaleString("en-IN")} &middot; Online: {"\u20B9"}{d.online.toLocaleString("en-IN")}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 bg-teal-50 border border-teal-200 rounded-xl px-4 py-3 text-sm">
        <strong className="text-teal-800">Anarkali Suit sells 3x better online</strong>
        <span className="text-teal-600"> — dead in-store, live online</span>
      </div>

      <MetricBox variant="teal">
        <strong>Online adds 28% revenue on top of in-store</strong> — not a substitute
      </MetricBox>
    </div>
  );
}

function OrderMap() {
  const pins = [
    { name: "Main Market", orders: 5, value: 12400, x: 48, y: 45, dist: "0.5 km", local: true },
    { name: "Civil Lines", orders: 3, value: 6200, x: 52, y: 38, dist: "1.2 km", local: true },
    { name: "Station Road", orders: 4, value: 8100, x: 44, y: 52, dist: "1.8 km", local: true },
    { name: "Rampur Nagar", orders: 3, value: 6200, x: 28, y: 30, dist: "8 km", local: false },
    { name: "Sultanpur", orders: 2, value: 4800, x: 72, y: 25, dist: "12 km", local: false },
    { name: "Azamgarh", orders: 2, value: 5600, x: 18, y: 65, dist: "15 km", local: false },
    { name: "Mau Town", orders: 1, value: 3200, x: 78, y: 68, dist: "18 km", local: false },
    { name: "Ballia", orders: 1, value: 2900, x: 85, y: 40, dist: "22 km", local: false },
    { name: "Ghazipur", orders: 1, value: 1800, x: 12, y: 20, dist: "25 km", local: false },
  ];

  const [activePin, setActivePin] = useState(null);

  return (
    <div id="s3" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-teal to-teal-600 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Reach Beyond 5 km — Area-wise Order Map
        </h3>
        <div className="flex gap-3 text-xs text-white/80">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-indigo-deep rounded-full border border-white/50" />Walk-in</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-saffron rounded-full border border-white/50" />Online</span>
        </div>
      </div>

      <div className="p-6">
        <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl overflow-hidden" style={{ aspectRatio: "16/10" }}>
          <svg viewBox="0 0 100 80" className="w-full h-full absolute inset-0">
            <defs>
              <radialGradient id="glow" cx="48%" cy="56%" r="15%">
                <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path d="M10,10 Q20,5 40,8 Q60,4 80,10 Q90,15 88,30 Q92,50 85,65 Q75,75 55,72 Q35,78 20,70 Q8,60 12,40 Q6,25 10,10 Z" fill="#E5E7EB" stroke="#D1D5DB" strokeWidth="0.4" />
            <circle cx="48" cy="45" r="15" fill="url(#glow)" />
            <circle cx="48" cy="45" r="12" fill="none" stroke="#1E1B4B" strokeWidth="0.3" strokeDasharray="2,1" opacity="0.3" />
            <text x="61" y="36" fontSize="2.2" fill="#9CA3AF">5 km</text>
            <circle cx="48" cy="45" r="2.5" fill="#1E1B4B" stroke="white" strokeWidth="0.8" />
            <text x="48" y="42" textAnchor="middle" fontSize="2" fill="#1E1B4B" fontWeight="bold">Shop</text>
          </svg>

          {pins.map((pin, i) => (
            <div
              key={pin.name}
              className="absolute cursor-pointer"
              style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: "translate(-50%, -100%)" }}
              onClick={() => setActivePin(activePin === i ? null : i)}
            >
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md transition-transform hover:scale-125 ${pin.local ? "bg-indigo-deep" : "bg-saffron"}`} />
              {activePin === i && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl p-3 text-xs whitespace-nowrap z-10 fade-in border border-gray-100">
                  <div className="font-semibold text-text-main">{pin.name}</div>
                  <div className="text-gray-500 mt-0.5">{pin.orders} orders &middot; {"\u20B9"}{pin.value.toLocaleString("en-IN")}</div>
                  <div className="text-gray-400">{pin.dist} from shop</div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-b border-r border-gray-100 rotate-45" />
                </div>
              )}
            </div>
          ))}
        </div>

        <MetricBox variant="teal">
          <strong>Your orders now come from 18 km away</strong> &middot; 6 new towns this month
        </MetricBox>
      </div>
    </div>
  );
}

function OrdersReturns({ resetKey }) {
  const initialOrders = [
    { id: "ORD-1041", item: "Silk Saree", customer: "Meena Kumari", status: "Delivered" },
    { id: "ORD-1042", item: "Nehru Jacket", customer: "Rohit Gupta", status: "Pending" },
    { id: "ORD-1043", item: "Baby Frock", customer: "Anita Singh", status: "Delivered" },
    { id: "ORD-1044", item: "Chikankari Kurti", customer: "Pooja Verma", status: "Return" },
    { id: "ORD-1045", item: "Kids Denim Jacket", customer: "Sanjay Patel", status: "Delivered" },
    { id: "ORD-1046", item: "Palazzo Set", customer: "Neha Sharma", status: "Pending" },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => setNewOrderCount((c) => c + 1), 8000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleReturn = (id) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Refund Initiated" } : o)));
  };

  const statusStyle = {
    Delivered: "bg-emerald-100 text-emerald-700",
    Pending: "bg-amber-100 text-amber-700",
    Return: "bg-red-100 text-red-700",
    "Refund Initiated": "bg-blue-100 text-blue-700",
  };

  return (
    <div id="s4" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100">
        <h3 className="text-base font-semibold text-indigo-deep flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#0D9488" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          </div>
          Orders & Returns Desk
        </h3>
        {newOrderCount > 0 && (
          <span className="bg-danger text-white text-xs px-3 py-1 rounded-full font-bold pulse-badge">
            {newOrderCount} new
          </span>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-400 uppercase text-xs border-b border-gray-100 bg-gray-50/50">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Item</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} className={`border-b border-gray-50 hover:bg-teal-50/30 transition-colors ${i % 2 === 0 ? "bg-gray-50/20" : ""}`}>
                <td className="px-6 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                <td className="px-6 py-3 font-medium">{o.item}</td>
                <td className="px-6 py-3 text-gray-500">{o.customer}</td>
                <td className="px-6 py-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  {o.status === "Return" && (
                    <button onClick={() => handleReturn(o.id)} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg btn-hover">
                      Approve Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden p-4 space-y-2">
        {orders.map((o) => (
          <div key={o.id} className="bg-gray-50 rounded-xl p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] text-gray-400">{o.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusStyle[o.status]}`}>{o.status}</span>
            </div>
            <div className="text-sm font-medium">{o.item}</div>
            <div className="text-xs text-gray-400">{o.customer}</div>
            {o.status === "Return" && (
              <button onClick={() => handleReturn(o.id)} className="mt-2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg btn-hover">
                Approve Return
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="px-6 pb-5">
        <MetricBox variant="teal">
          <strong>Return rate: 4.2%</strong> &middot; Industry avg: 11%
        </MetricBox>
      </div>
    </div>
  );
}

export default function Shopify({ resetKey }) {
  return (
    <section id="shopify" className="py-10 px-4 sm:px-6 bg-teal-50/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Shopify"
          subtitle="Sell online with zero tech hassle — sync, ship, grow"
          hindi="ಆನ್‌ಲೈನ್ ಮಾರಾಟ, ತಾಂತ್ರಿಕ ತೊಂದರೆಯಿಲ್ಲ — ಸಿಂಕ್, ಶಿಪ್, ಬೆಳೆಯಿರಿ"
          variant="teal"
          features={[
            { id: "s1", label: "Sync" },
            { id: "s2", label: "Revenue" },
            { id: "s3", label: "Map" },
            { id: "s4", label: "Orders" },
          ]}
        />

        {/* S1 + S2: side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <InventorySync key={`sync-${resetKey}`} />
          <RevenueSKU />
        </div>

        {/* S3: full width */}
        <div className="mb-6">
          <OrderMap />
        </div>

        {/* S4: full width */}
        <OrdersReturns key={`orders-${resetKey}`} />
      </div>
    </section>
  );
}
