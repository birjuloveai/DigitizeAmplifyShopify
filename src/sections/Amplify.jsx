import { useState, useEffect } from "react";
import skus from "../data/skus";
import WhatsAppBubble from "../components/WhatsAppBubble";
import CouponCard from "../components/CouponCard";
import MetricBox from "../components/MetricBox";
import SectionHeader from "../components/SectionHeader";
import Toast from "../components/Toast";
import { generateCouponCode } from "../utils/couponGen";

function WhatsAppBlast() {
  const activeSkus = skus.filter((s) => s.status === "active");
  const [selected, setSelected] = useState([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
    setSent(false);
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1000);
  };

  const selectedItems = activeSkus.filter((s) => selected.includes(s.id));

  return (
    <div id="a1" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#92400E"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">WhatsApp New-Arrival Blast</h3>
      </div>

      <p className="text-xs text-gray-400 mb-3">Pick 2-3 active items:</p>

      <div className="space-y-1.5 mb-4 max-h-44 overflow-y-auto pr-1">
        {activeSkus.map((sku) => (
          <label
            key={sku.id}
            className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all text-sm ${
              selected.includes(sku.id)
                ? "bg-amber-50 border border-saffron"
                : "hover:bg-gray-50 border border-transparent"
            }`}
          >
            <input type="checkbox" checked={selected.includes(sku.id)} onChange={() => toggle(sku.id)} className="accent-saffron w-4 h-4" />
            <img src={`/images/${encodeURIComponent(sku.image)}`} alt={sku.name} loading="lazy" className="w-8 h-10 object-cover rounded" style={{ aspectRatio: "3/4" }} />
            <span className="truncate">{sku.name} — {"\u20B9"}{sku.mrp}</span>
          </label>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="mb-4 fade-in">
          <p className="text-xs text-gray-400 mb-2">Preview:</p>
          <WhatsAppBubble>
            <strong>Sharma Garments</strong><br />
            New arrivals just in!<br /><br />
            {selectedItems.map((s) => <span key={s.id}>{s.name} — {"\u20B9"}{s.mrp}<br /></span>)}
            <br />Reply WANT to reserve your size.
          </WhatsAppBubble>
        </div>
      )}

      <button
        onClick={handleSend}
        disabled={selected.length === 0 || sending}
        className="w-full bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-medium btn-hover disabled:opacity-40 flex items-center justify-center gap-2"
      >
        {sending ? "Sending..." : "Send Blast"}
      </button>

      {sent && <div className="mt-3"><Toast message="Sent to 142 customers" type="success" /></div>}

      <MetricBox variant="saffron">
        <strong>142 pings</strong> &middot; avg 18 walk-ins &middot; {"\u20B9"}22,000 same-day billing
      </MetricBox>
    </div>
  );
}

function FestiveOfferBuilder() {
  const occasions = ["Diwali", "Eid", "Navratri", "New Year", "Custom"];
  const discountTypes = ["Flat \u20B9 off", "% off", "Buy 2 Get 1"];
  const [occasion, setOccasion] = useState("Diwali");
  const [discountType, setDiscountType] = useState("Flat \u20B9 off");
  const [activated, setActivated] = useState(false);

  const festiveColors = {
    Diwali: "from-orange-500 to-yellow-400",
    Eid: "from-emerald-500 to-teal-400",
    Navratri: "from-pink-500 to-red-400",
    "New Year": "from-blue-600 to-purple-500",
    Custom: "from-indigo-600 to-saffron",
  };

  const offerText = discountType === "Flat \u20B9 off" ? "Flat \u20B9500 off" : discountType === "% off" ? "20% off on all items" : "Buy 2 Get 1 Free";

  return (
    <div id="a2" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#92400E" strokeWidth="2"><path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">Festive Offer Builder</h3>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Occasion</label>
          <select value={occasion} onChange={(e) => { setOccasion(e.target.value); setActivated(false); }} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-saffron outline-none transition-colors">
            {occasions.map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Discount</label>
          <select value={discountType} onChange={(e) => { setDiscountType(e.target.value); setActivated(false); }} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 focus:bg-white focus:border-saffron outline-none transition-colors">
            {discountTypes.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${festiveColors[occasion]} rounded-2xl p-5 text-white mb-4 shadow-lg`}>
        <div className="text-[10px] uppercase tracking-widest opacity-70">{occasion} Special</div>
        <div className="text-xl sm:text-2xl font-bold mt-1">{offerText}</div>
        <div className="mt-2 text-sm opacity-80">Sharma Garments</div>
        <div className="text-[10px] mt-3 opacity-50">Valid till 30 Sep 2026</div>
      </div>

      <button
        onClick={() => setActivated(true)}
        disabled={activated}
        className={`w-full px-5 py-3 rounded-xl text-sm font-medium btn-hover ${
          activated
            ? "bg-green-100 text-green-700 border border-green-200"
            : "bg-saffron text-indigo-deep"
        }`}
      >
        {activated ? "Offer Live!" : "Activate Offer"}
      </button>

      <MetricBox variant="saffron">
        <strong>Festive offers drive 2.4x avg basket size</strong>
      </MetricBox>
    </div>
  );
}

function LuckyCouponDrop() {
  const [coupons, setCoupons] = useState(null);
  const [spinning, setSpinning] = useState(false);

  const deadSlowSkus = skus.filter((s) => s.status === "dead" || s.status === "slow");

  const handleDrop = () => {
    setSpinning(true);
    setCoupons(null);
    setTimeout(() => {
      const generated = Array.from({ length: 10 }, () => ({
        code: generateCouponCode(),
        item: deadSlowSkus[Math.floor(Math.random() * deadSlowSkus.length)],
      }));
      setCoupons(generated);
      setSpinning(false);
    }, 1500);
  };

  const expiry = new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div id="a3" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#92400E" strokeWidth="2"><path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">Lucky Coupon Drop</h3>
      </div>

      <div className="bg-amber-50 rounded-xl p-3 mb-4 text-xs text-amber-800 flex items-center gap-4 flex-wrap">
        <span>Winners: <strong>10</strong></span>
        <span>Discount: <strong>{"\u20B9"}250</strong></span>
        <span>Expiry: <strong>48h</strong></span>
        <span>For: <strong>Dead/slow stock</strong></span>
      </div>

      <button
        onClick={handleDrop}
        disabled={spinning}
        className="w-full bg-saffron text-indigo-deep px-5 py-3 rounded-xl text-sm font-bold btn-hover disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {spinning ? (
          <>
            <div className="w-4 h-4 border-2 border-indigo-deep border-t-transparent rounded-full animate-spin" />
            Drawing winners...
          </>
        ) : "Run Lucky Drop"}
      </button>

      {coupons && !spinning && (
        <div className="mt-4 space-y-4 fade-in">
          <CouponCard code={coupons[0].code} itemName={coupons[0].item.name} discount={"\u20B9250"} expiry={expiry} />
          <div className="text-xs text-gray-400 text-center">+ {coupons.length - 1} more coupons generated</div>
          <WhatsAppBubble>
            You're a lucky winner! Use <strong>{coupons[0].code}</strong> to save {"\u20B9"}250 on {coupons[0].item.name}. Valid till {expiry}. Show this at billing.
          </WhatsAppBubble>
        </div>
      )}

      <MetricBox variant="saffron">
        <strong>10 coupons</strong> &middot; 7 avg redemptions &middot; {"\u20B9"}18,000 dead stock cleared
      </MetricBox>
    </div>
  );
}

function WinBackCustomers() {
  const lapsedCustomers = [
    { name: "Rajesh Kumar", lastVisit: 78, totalSpend: 12400 },
    { name: "Priya Sharma", lastVisit: 95, totalSpend: 8700 },
    { name: "Amit Verma", lastVisit: 62, totalSpend: 15200 },
    { name: "Sunita Devi", lastVisit: 110, totalSpend: 6800 },
    { name: "Vikram Singh", lastVisit: 85, totalSpend: 22500 },
  ];

  const [sentMessages, setSentMessages] = useState({});
  const handleSend = (name) => setSentMessages((prev) => ({ ...prev, [name]: true }));

  return (
    <div id="a4" className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm card-hover">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#92400E" strokeWidth="2"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <h3 className="text-base font-semibold text-indigo-deep">Win-Back Repeat Customers</h3>
      </div>

      <div className="space-y-2.5">
        {lapsedCustomers.map((c) => (
          <div key={c.name} className={`rounded-xl p-3 transition-all ${sentMessages[c.name] ? "bg-green-50 border border-green-100" : "bg-gray-50 border border-gray-100"}`}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <div className="font-medium text-sm">{c.name}</div>
                <div className="text-xs text-gray-400">{c.lastVisit} days ago &middot; {"\u20B9"}{c.totalSpend.toLocaleString("en-IN")} spent</div>
              </div>
              <button
                onClick={() => handleSend(c.name)}
                disabled={sentMessages[c.name]}
                className={`text-xs px-3 py-1.5 rounded-lg shrink-0 btn-hover ${
                  sentMessages[c.name]
                    ? "bg-green-200 text-green-800"
                    : "bg-green-600 text-white"
                }`}
              >
                {sentMessages[c.name] ? "Sent" : "Win-Back"}
              </button>
            </div>
            {sentMessages[c.name] && (
              <div className="mt-2 fade-in">
                <WhatsAppBubble>
                  Hi {c.name}! We miss you at Sharma Garments. It's been {c.lastVisit} days. Here's {"\u20B9"}100 loyalty credit — valid this week only!
                </WhatsAppBubble>
              </div>
            )}
          </div>
        ))}
      </div>

      <MetricBox variant="saffron">
        <strong>Win-back rate: 34%</strong> &middot; avg recovered spend {"\u20B9"}1,400 per customer
      </MetricBox>
    </div>
  );
}

function FootfallTracker() {
  const [withAmplify, setWithAmplify] = useState(true);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dataWith = { footfall: [32, 28, 35, 58, 52, 64, 48], bills: [12, 10, 14, 42, 35, 44, 32] };
  const dataWithout = { footfall: [30, 25, 28, 26, 30, 35, 22], bills: [11, 9, 10, 10, 12, 14, 8] };

  const data = withAmplify ? dataWith : dataWithout;
  const maxVal = Math.max(...data.footfall);

  const todayConv = Math.round((data.bills[6] / data.footfall[6]) * 100);
  const weeklyConv = Math.round((data.bills.reduce((a, b) => a + b, 0) / data.footfall.reduce((a, b) => a + b, 0)) * 100);

  return (
    <div id="a5" className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-saffron px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <h3 className="text-base font-semibold text-white flex items-center gap-2">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Footfall-to-Bill Conversion
        </h3>
        <div className="flex bg-white/20 rounded-lg p-0.5">
          <button
            onClick={() => setWithAmplify(true)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${withAmplify ? "bg-white text-amber-700 shadow-sm" : "text-white"}`}
          >
            With Amplify
          </button>
          <button
            onClick={() => setWithAmplify(false)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${!withAmplify ? "bg-white text-amber-700 shadow-sm" : "text-white"}`}
          >
            Without
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Conversion stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-700">{todayConv}%</div>
            <div className="text-xs text-amber-600 mt-1">Today's conversion</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-gray-600">{weeklyConv}%</div>
            <div className="text-xs text-gray-400 mt-1">Weekly avg</div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex items-end gap-2 h-52 mb-3">
          {days.map((day, i) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1">
              <div className="flex items-end gap-1 h-44 w-full">
                <div className="flex-1 flex flex-col justify-end items-center">
                  <span className="text-[9px] text-gray-400 mb-1">{data.footfall[i]}</span>
                  <div
                    className="w-full bg-indigo-deep/80 rounded-t-md transition-all duration-500"
                    style={{ height: `${(data.footfall[i] / maxVal) * 100}%` }}
                  />
                </div>
                <div className="flex-1 flex flex-col justify-end items-center">
                  <span className="text-[9px] text-gray-400 mb-1">{data.bills[i]}</span>
                  <div
                    className="w-full bg-saffron rounded-t-md transition-all duration-500"
                    style={{ height: `${(data.bills[i] / maxVal) * 100}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-gray-400">{day}</span>
              {withAmplify && i === 3 && (
                <span className="text-[8px] text-saffron font-medium">BLAST</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-indigo-deep/80 rounded" />Footfall</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-saffron rounded" />Bills</span>
        </div>

        <MetricBox variant="saffron">
          <strong>Amplify days convert 1.6x better</strong> than non-Amplify days
        </MetricBox>
      </div>
    </div>
  );
}

export default function Amplify({ resetKey }) {
  return (
    <section id="amplify" className="py-10 px-4 sm:px-6 bg-amber-50/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Amplify"
          subtitle="Bring customers back and fill your store every day"
          hindi="ग्राहकों को वापस लाएं, दुकान हर दिन भरें"
          variant="saffron"
          features={[
            { id: "a1", label: "WhatsApp" },
            { id: "a2", label: "Festive Offers" },
            { id: "a3", label: "Coupons" },
            { id: "a4", label: "Win-Back" },
            { id: "a5", label: "Footfall" },
          ]}
        />

        {/* A1 + A2: side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <WhatsAppBlast key={`blast-${resetKey}`} />
          <FestiveOfferBuilder key={`festive-${resetKey}`} />
        </div>

        {/* A3 + A4: side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <LuckyCouponDrop key={`coupon-${resetKey}`} />
          <WinBackCustomers key={`winback-${resetKey}`} />
        </div>

        {/* A5: full width */}
        <FootfallTracker />
      </div>
    </section>
  );
}
