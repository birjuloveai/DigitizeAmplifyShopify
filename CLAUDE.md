# CLAUDE.md — Digitize · Amplify · Shopify Demo Site

## Project Overview

A single-page static demo website for pitching a retail digitisation product to
tier-2 city apparel retailers in India. No backend, no datastore. Everything runs
in memory and resets on refresh. Must work on phone, tablet, and laptop. Must work
offline (open as a local file). Used by a salesperson demoing to a shop owner
in-store or over a video call.

---

## Tech Stack

- **Framework:** React (single JSX file or Vite + React)
- **Styling:** Tailwind CSS (CDN or bundled)
- **State:** React useState / useReducer — no Redux, no localStorage except survey
- **Data:** Hardcoded JSON array of 12–15 sample SKUs (see below)
- **Images:** Pre-generated WebP assets in `/assets/` — no live API calls
- **Survey storage:** localStorage → CSV export button
- **Hosting target:** Vercel / GitHub Pages / local file open — all must work

---

## Visual Design Brief

**Audience:** Tier-2 city apparel retailer — practical, numbers-driven, not tech-savvy.
**Tone:** Confident, direct, warm. Not startup-flashy, not enterprise-cold.
**Primary colour:** Deep indigo `#1E1B4B` (trust, premium)
**Accent:** Saffron `#F59E0B` (Indian retail festive energy, attention)
**Surface:** Off-white `#FAFAF7`
**Text:** Near-black `#18181B`
**Danger/alert:** `#EF4444`
**Success:** `#10B981`
**Font:** Inter for UI labels; Hind (Google Fonts) for Hindi text — both loaded via CDN
**Border radius:** 12px cards, 8px buttons — approachable but not bubbly
**Motion:** One orchestrated page-load fade only. All other motion is response to user action.
**DO NOT use:** cream+terracotta palette, ALL CAPS labels, card grids with identical shadows,
numbered 01/02/03 markers, `→` appended to every button

---

## Sample SKU Data (hardcode this)

Images are real AI-generated PNGs provided by the client. Place them in `/public/images/`.
Filenames must match exactly (including spaces) — use `encodeURIComponent` when referencing in `<img src>`.

```json
[
  {
    "id": "LN-SH-M",
    "name": "Linen Shirt",
    "category": "Men",
    "size": "M",
    "mrp": 1199,
    "cost": 490,
    "stock": 16,
    "bin": "A-02",
    "daysOld": 9,
    "status": "active",
    "image": "Linen Shirt.png"
  },
  {
    "id": "NJ-BLK-40",
    "name": "Nehru Jacket",
    "category": "Men",
    "size": "40",
    "mrp": 1899,
    "cost": 820,
    "stock": 7,
    "bin": "A-05",
    "daysOld": 38,
    "status": "active",
    "image": "Nehru Jacket.png"
  },
  {
    "id": "CH-TR-32",
    "name": "Chino Trousers",
    "category": "Men",
    "size": "32",
    "mrp": 1099,
    "cost": 460,
    "stock": 11,
    "bin": "A-08",
    "daysOld": 72,
    "status": "slow",
    "image": "Chino Trousers.png"
  },
  {
    "id": "CT-KU-L",
    "name": "Cotton Kurta",
    "category": "Men",
    "size": "L",
    "mrp": 999,
    "cost": 400,
    "stock": 3,
    "bin": "A-11",
    "daysOld": 105,
    "status": "dead",
    "image": "cotton kurta.png"
  },
  {
    "id": "SS-F",
    "name": "Silk Saree",
    "category": "Women",
    "size": "Free",
    "mrp": 4999,
    "cost": 2600,
    "stock": 5,
    "bin": "B-02",
    "daysOld": 14,
    "status": "active",
    "image": "Silk Saree.png"
  },
  {
    "id": "CK-KU-XL",
    "name": "Chikankari Kurti",
    "category": "Women",
    "size": "XL",
    "mrp": 1399,
    "cost": 580,
    "stock": 8,
    "bin": "B-06",
    "daysOld": 51,
    "status": "slow",
    "image": "Chikankari Kurti.png"
  },
  {
    "id": "PL-SET-F",
    "name": "Palazzo Set",
    "category": "Women",
    "size": "Free",
    "mrp": 1699,
    "cost": 720,
    "stock": 6,
    "bin": "B-09",
    "daysOld": 66,
    "status": "slow",
    "image": "Palazzo Set.png"
  },
  {
    "id": "AN-SU-38",
    "name": "Anarkali Suit",
    "category": "Women",
    "size": "38",
    "mrp": 3299,
    "cost": 1600,
    "stock": 2,
    "bin": "B-12",
    "daysOld": 118,
    "status": "dead",
    "image": "Anarkali Suit.png"
  },
  {
    "id": "BF-4Y",
    "name": "Baby Frock",
    "category": "Kids",
    "size": "4Y",
    "mrp": 599,
    "cost": 240,
    "stock": 9,
    "bin": "D-01",
    "daysOld": 21,
    "status": "active",
    "image": "Baby Frock.png"
  },
  {
    "id": "BK-PJ-6Y",
    "name": "Boys Kurta Pyjama",
    "category": "Kids",
    "size": "6Y",
    "mrp": 849,
    "cost": 340,
    "stock": 6,
    "bin": "D-04",
    "daysOld": 57,
    "status": "slow",
    "image": "Boys Kurta Pyjama.png"
  },
  {
    "id": "GL-SET-8Y",
    "name": "Girls Lehenga Set",
    "category": "Kids",
    "size": "8Y",
    "mrp": 1299,
    "cost": 530,
    "stock": 4,
    "bin": "D-07",
    "daysOld": 92,
    "status": "dead",
    "image": "Girls Lehenga Set.png"
  },
  {
    "id": "KD-JK-10Y",
    "name": "Kids Denim Jacket",
    "category": "Kids",
    "size": "10Y",
    "mrp": 1099,
    "cost": 450,
    "stock": 5,
    "bin": "D-10",
    "daysOld": 44,
    "status": "active",
    "image": "Kids Denim Jacket.png"
  }
]
```

Dead stock = daysOld ≥ 90. Slow = daysOld 45–89. Active = < 45.

### Image usage rules
- All images live in `/public/images/` (Vite serves this as root `/images/`)
- Reference in JSX as: `<img src={`/images/${encodeURIComponent(sku.image)}`} alt={sku.name} />`
- For D2 (AI On-Model Shots): show the **same image 6 times** in a 2×3 grid with overlay labels
  "Front View", "Side View", "Back View", "Detail", "Full Length", "Lifestyle" — this simulates
  multi-angle AI generation without needing 6 separate assets per garment.
- Lazy-load all images: `loading="lazy"` on every `<img>` tag.
- Aspect ratio: render all garment images at `aspect-ratio: 3/4` with `object-fit: cover`.

---

## Site Structure

```
/
├── Nav (logo + 4 tabs: Digitize | Amplify | Shopify | Survey)
├── Hero (one-liner value prop, no carousel)
├── Section: DIGITIZE
│   ├── D1 — Scan to Catalog
│   ├── D2 — AI On-Model Shots
│   ├── D3 — Live Stock Board
│   └── D4 — Dead Stock Alert + Liquidation Price
├── Section: AMPLIFY
│   ├── A1 — WhatsApp New-Arrival Blast
│   ├── A2 — Festive Offer Builder
│   ├── A3 — Lucky Coupon Drop
│   ├── A4 — Win-Back Repeat Customers
│   └── A5 — Footfall-to-Bill Conversion Tracker
├── Section: SHOPIFY
│   ├── S1 — Two-Way Inventory Sync
│   ├── S2 — Revenue Per SKU (Online vs In-store)
│   ├── S3 — Reach Beyond 5 km — Area-wise Order Map
│   └── S4 — Orders & Returns Desk
└── Section: SURVEY
    └── 10-question bilingual form
```

Nav tabs scroll to section on click. Active section highlights in nav.
A floating "Reset Demo" button clears all simulated state.

---

## Feature Specs

### D1 — Scan to Catalog
- Show a barcode icon + "Scan Item" button
- On click: 1.2s loading shimmer, then a SKU card appears with: ID, name, category, size, MRP, cost, bin location, status badge
- Cycle through 3–4 SKUs on repeated clicks (loop the array)
- Show metric: **"Avg cataloguing time: 8 sec per item vs 4 min manual"**

### D2 — AI On-Model Shots
- Pick a SKU from a dropdown (pre-populated from the array — show garment name + thumbnail)
- "Generate Model Views" button → 1.8s shimmer → 6 image tiles appear in a 2×3 grid
- Each tile is the SKU's real PNG image with an overlay label: "Front View", "Side View",
  "Back View", "Detail", "Full Length", "Lifestyle" — simulates multi-angle AI output
- Show metric: **"₹0 photography cost · 6 angles in 2 sec"**

### D3 — Live Stock Board
- Table/grid of all SKUs: Name | Category | Size | Stock | Bin | Status badge
- Status badges: green=Active, amber=Slow, red=Dead
- Filter buttons: All | Men | Women | Kids
- Show summary bar: Total SKUs · Total Stock Value (sum of stock × mrp) · Dead Stock Count
- Show metric: **"Know your entire ₹X stock in one view"** — compute X from data

### D4 — Dead Stock Alert + Liquidation Price
- List only dead-stock SKUs (daysOld ≥ 90)
- For each: name, days sitting, capital locked (stock × cost), suggested liquidation price (cost × 1.1, rounded)
- Total capital locked badge at top (sum of dead stock × cost)
- "Send Liquidation Offer on WhatsApp" button → toast: "Offer sent to 38 customers"
- Show metric: **"₹X locked in dead stock — recover in 7 days"**

### A1 — WhatsApp New-Arrival Blast
- Pick 2–3 SKUs from a checkbox list (active items only)
- Preview pane shows a WhatsApp message bubble: shop name, item names, MRP, "Reply WANT to reserve"
- "Send Blast" button → 1s delay → "Sent to 142 customers ✓"
- Show metric: **"142 pings · avg 18 walk-ins · ₹22,000 same-day billing"**

### A2 — Festive Offer Builder
- Occasion selector: Diwali | Eid | Navratri | New Year | Custom
- Discount type: Flat ₹ off | % off | Buy 2 Get 1
- Preview of styled offer card (festive colours, shop name, offer text, expiry)
- "Activate Offer" button → confirms offer is live
- Show metric: **"Festive offers drive 2.4× avg basket size"**

### A3 — Lucky Coupon Drop
- "Run Lucky Drop" button
- Config: Winners = 10, Discount = ₹250, Expiry = 48 hours, Applies to: dead/slow stock only
- On click: 1.5s animation (spinning wheel or counter), then 10 coupon codes generated (format: LUCK-XXXX)
- Show one example coupon card: code, item name, ₹250 off, expiry timestamp
- WhatsApp preview: "🎉 You're a lucky winner! Use LUCK-K7X2 to save ₹250 on [item]. Valid till [date]. Show this at billing."
- Show metric: **"10 coupons · 7 avg redemptions · ₹18,000 dead stock cleared"**

### A4 — Win-Back Repeat Customers
- Show a list of 5 "lapsed" mock customers: name, last visit (60–120 days ago), total past spend
- "Send Win-Back Message" button per customer → individual WhatsApp preview appears
- Message: personalised with their name, days since last visit, a ₹100 loyalty credit
- Show metric: **"Win-back rate: 34% · avg recovered spend ₹1,400 per customer"**

### A5 — Footfall-to-Bill Conversion Tracker
- Bar chart (use a simple SVG or inline Chart.js):
  - X axis: last 7 days
  - Two bars per day: Footfall count vs Bills raised
  - A visible spike on the day "WhatsApp blast was sent" (day 3 or 4)
- Conversion % shown as a number: e.g. "Today: 68% · Weekly avg: 41%"
- Toggle: "With Amplify" vs "Without Amplify" — swap two data sets
- Show metric: **"Amplify days convert 1.6× better than non-Amplify days"**

### S1 — Two-Way Inventory Sync
- Split panel: In-store stock | Online store stock
- Simulate a sale: "Customer bought 1 Linen Shirt (M) online" → both panels update simultaneously
- Stock count ticks down on both sides with a subtle flash
- Show metric: **"Zero overselling · sync in < 2 sec"**

### S2 — Revenue Per SKU (Online vs In-store)
- Bar chart: each SKU as a grouped bar — in-store revenue (indigo) vs online revenue (saffron)
- 6–8 SKUs shown; some show higher online, some higher in-store
- Insight callout: "Anarkali Suit sells 3× better online — dead in-store, live online"
- Show metric: **"Online adds 28% revenue on top of in-store — not a substitute"**

### S3 — Reach Beyond 5 km — Area-wise Order Map
- Static SVG map of a generic Indian district with 8–10 pinned order locations
- Orders clustered: 3 within 2 km (walk-in area), rest scattered 5–25 km out
- Pin tooltip on hover/tap: "Rampur Nagar — 3 orders — ₹6,200"
- Show metric: **"Your orders now come from 18 km away · 6 new towns this month"**

### S4 — Orders & Returns Desk
- Table: 6 mock orders — Order ID, item, customer name, status (Delivered/Pending/Return)
- "Approve Return" button on one row → status changes to "Refund Initiated"
- New order notification badge that ticks up once every 8 seconds (simulated)
- Show metric: **"Return rate: 4.2% · Industry avg: 11%"**

---

## Survey Page

### Behaviour
- Standalone section reachable from nav
- All answers stored in localStorage as a JSON array keyed `demoSurveyResponses`
- "Export CSV" button at bottom converts stored responses to CSV and triggers download
- Progress indicator: dots (not numbers) at top, one per question
- No Back button needed
- Final screen: "Thank you / धन्यवाद 🙏" with shop name field and WhatsApp number field (optional)
- "Submit / जमा करें" button appends to localStorage and shows thank-you screen

### 10 Questions (bilingual — English line, Hindi line below in smaller grey Hind font)

**Q1** What do you sell? / आप क्या बेचते हैं?
Options: Men's · Women's · Kids · All categories
→ पुरुष · महिला · बच्चे · सभी

**Q2** Monthly sales / महीने की बिक्री
Options: Under ₹5L · ₹5–20L · ₹20–50L · Above ₹50L
→ ₹5 लाख से कम · ₹5–20 लाख · ₹20–50 लाख · ₹50 लाख से ज़्यादा

**Q3** How do you keep stock records today? / आज स्टॉक का हिसाब कैसे रखते हैं?
Options: Register/Copy · Excel · Billing software · From memory
→ रजिस्टर/कॉपी · एक्सेल · बिलिंग सॉफ़्टवेयर · बस याद से

**Q4** Biggest daily problem (pick up to 2) / रोज़ की सबसे बड़ी परेशानी (2 तक चुनें)
Options (multi-select):
- Unfolding too many pieces per customer → एक ग्राहक के लिए बहुत कपड़े खोलना
- Don't know what's in stock → कौन सा माल है, पता नहीं
- Old stock not selling → पुराना माल नहीं बिकता
- Customers don't come back → ग्राहक दोबारा नहीं आते
- Handling online orders → ऑनलाइन ऑर्डर संभालना मुश्किल

**Q5** Do you sell online today? / क्या आप ऑनलाइन बेचते हैं?
Options: No · WhatsApp/Instagram only · Marketplace · Own website
→ नहीं · सिर्फ़ WhatsApp/Instagram · मार्केटप्लेस · अपनी वेबसाइट

**Q6** Which part was most useful? / कौन सा हिस्सा सबसे काम का लगा?
Options: Digitize · Amplify · Shopify
→ डिजिटाइज़ · एम्प्लिफ़ाई · शॉपिफ़ाई

**Q7** Which one feature would you start using tomorrow? / कौन सी एक सुविधा कल से इस्तेमाल करेंगे?
Options: AI Model Photos · Scan to Catalog · Live Stock Board · WhatsApp Blast · Lucky Coupon Drop · Online Store
→ AI मॉडल फ़ोटो · स्कैन से कैटलॉग · लाइव स्टॉक · WhatsApp ब्लास्ट · लकी कूपन · ऑनलाइन दुकान

**Q8** Comfortable monthly cost to avail such features? / इन सुविधाओं के लिए महीने का कितना खर्च ठीक लगेगा?
Options: ₹7,000–10,000 · ₹10,000–15,000 · ₹15,000–20,000 · Above ₹20,000 · Too expensive for me
→ ₹7,000–10,000 · ₹10,000–15,000 · ₹15,000–20,000 · ₹20,000 से ज़्यादा · मेरे लिए बहुत महंगा है

*Note: the "Too expensive for me" option is required. Without it, every respondent is forced
into a band ≥₹7,000 and the data will falsely suggest the price point is accepted. Track the
share picking this option as the primary pricing signal.*

**Q9** Who will operate it in the shop? / दुकान में इसे कौन चलाएगा?
Options: Myself · Staff · Family member · Not sure
→ मैं खुद · स्टाफ़ · परिवार का कोई सदस्य · पता नहीं

**Q10** Name & WhatsApp number (optional) / नाम और WhatsApp नंबर (वैकल्पिक)
- Text input: Your name / आपका नाम
- Text input: WhatsApp number / WhatsApp नंबर
- Checkbox: "Can we contact you for a free trial? / क्या हम मुफ़्त ट्रायल के लिए संपर्क कर सकते हैं?"

---

## Global UI Rules

- **Reset Demo button:** fixed bottom-right, small, saffron background. Clears all simulated state
  (scanned items, generated images, sent messages, coupon codes) without clearing survey data.
- **Simulated loading:** all "AI" or "Send" actions must have a 1–2s shimmer/spinner. Instant = fake.
- **Metric callouts:** every feature ends with a highlighted stat box (indigo left border, light background).
  Format: bold number, plain description. E.g. "**₹1,84,000** locked in dead stock"
- **Mobile first:** all layouts must work at 375px width. Tables become stacked cards on mobile.
- **Offline first:** zero external API calls in the demo flow. Google Fonts may be embedded via base64
  or loaded with `display=swap` and a system-font fallback.
- **No real data ever:** all names, numbers, and orders are fictional. Add a small footer note:
  "Demo data only — all figures are illustrative / यह केवल प्रदर्शन के लिए है"

---

## File Structure

```
/
├── index.html          # entry point
├── src/
│   ├── App.jsx
│   ├── data/skus.js    # hardcoded SKU array
│   ├── sections/
│   │   ├── Digitize.jsx
│   │   ├── Amplify.jsx
│   │   ├── Shopify.jsx
│   │   └── Survey.jsx
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── MetricBox.jsx
│   │   ├── SkuCard.jsx
│   │   ├── WhatsAppBubble.jsx
│   │   ├── CouponCard.jsx
│   │   ├── StatusBadge.jsx
│   │   └── ResetButton.jsx
│   └── utils/
│       ├── surveyStorage.js   # localStorage read/write/export
│       └── couponGen.js       # random code generator LUCK-XXXX
├── public/
│   └── images/                # 12 real PNG garment images — copy from client's folder
│       ├── Linen Shirt.png
│       ├── Nehru Jacket.png
│       ├── Chino Trousers.png
│       ├── cotton kurta.png
│       ├── Silk Saree.png
│       ├── Chikankari Kurti.png
│       ├── Palazzo Set.png
│       ├── Anarkali Suit.png
│       ├── Baby Frock.png
│       ├── Boys Kurta Pyjama.png
│       ├── Girls Lehenga Set.png
│       └── Kids Denim Jacket.png
└── CLAUDE.md                  # this file
```

---

## Build & Run

```bash
npm create vite@latest digitize-amplify-shop -- --template react
cd digitize-amplify-shop
npm install
npm run dev        # local dev
npm run build      # produces /dist — deploy to Vercel or GitHub Pages
```

For fully offline demo: open `/dist/index.html` directly in Chrome.
No server needed.

---

## Done Criteria

- [ ] All 13 features render and are interactive
- [ ] Survey saves to localStorage and CSV export works
- [ ] Works at 375px (mobile), 768px (tablet), 1280px (laptop)
- [ ] Works with no internet connection (after first load)
- [ ] Reset Demo button clears demo state, not survey data
- [ ] Hindi text renders correctly (Hind font or system fallback)
- [ ] No console errors on load
- [ ] Footer disclaimer present on every page
