import { useState } from "react";
import { saveSurveyResponse, exportCSV, getSurveyResponses } from "../utils/surveyStorage";
import { persistToSheet } from "../utils/sheetsPersist";

const questions = [
  {
    key: "q1_sells",
    en: "What do you sell?",
    ta: "நீங்கள் என்ன விற்கிறீர்கள்?",
    type: "single",
    options: [
      { en: "Men's", ta: "ஆண்கள்" },
      { en: "Women's", ta: "பெண்கள்" },
      { en: "Kids", ta: "குழந்தைகள்" },
      { en: "All categories", ta: "அனைத்தும்" },
    ],
  },
  {
    key: "q2_monthly_sales",
    en: "Monthly sales",
    ta: "மாத விற்பனை",
    type: "single",
    options: [
      { en: "Under \u20B95L", ta: "\u20B95 லட்சத்திற்கு கீழ்" },
      { en: "\u20B95\u201320L", ta: "\u20B95\u201320 லட்சம்" },
      { en: "\u20B920\u201350L", ta: "\u20B920\u201350 லட்சம்" },
      { en: "Above \u20B950L", ta: "\u20B950 லட்சத்திற்கு மேல்" },
    ],
  },
  {
    key: "q3_stock_records",
    en: "How do you keep stock records today?",
    ta: "இன்று ஸ்டாக் பதிவுகளை எப்படி வைத்திருக்கிறீர்கள்?",
    type: "single",
    options: [
      { en: "Register/Copy", ta: "பதிவேடு/நகல்" },
      { en: "Excel", ta: "எக்செல்" },
      { en: "Billing software", ta: "பில்லிங் மென்பொருள்" },
      { en: "From memory", ta: "நினைவிலிருந்து" },
    ],
  },
  {
    key: "q4_problems",
    en: "Biggest daily problem (pick up to 2)",
    ta: "தினசரி மிகப்பெரிய பிரச்சனை (2 வரை தேர்ந்தெடுக்கவும்)",
    type: "multi",
    max: 2,
    options: [
      { en: "Unfolding too many pieces per customer", ta: "ஒரு வாடிக்கையாளருக்கு அதிக துணிகள் விரிப்பது" },
      { en: "Don't know what's in stock", ta: "என்ன ஸ்டாக் இருக்கிறது என்று தெரியாது" },
      { en: "Old stock not selling", ta: "பழைய ஸ்டாக் விற்கவில்லை" },
      { en: "Customers don't come back", ta: "வாடிக்கையாளர்கள் திரும்பி வருவதில்லை" },
      { en: "Handling online orders", ta: "ஆன்லைன் ஆர்டர்களை நிர்வகிப்பது கடினம்" },
    ],
  },
  {
    key: "q5_online",
    en: "Do you sell online today?",
    ta: "இன்று நீங்கள் ஆன்லைனில் விற்கிறீர்களா?",
    type: "single",
    options: [
      { en: "No", ta: "இல்லை" },
      { en: "WhatsApp/Instagram only", ta: "WhatsApp/Instagram மட்டும்" },
      { en: "Marketplace", ta: "மார்க்கெட்பிளேஸ்" },
      { en: "Own website", ta: "சொந்த வெப்சைட்" },
    ],
  },
  {
    key: "q6_useful",
    en: "Which part was most useful?",
    ta: "எந்த பகுதி மிகவும் பயனுள்ளதாக இருந்தது?",
    type: "single",
    options: [
      { en: "Digitize", ta: "டிஜிடைஸ்" },
      { en: "Amplify", ta: "ஆம்ப்ளிஃபை" },
      { en: "Shopify", ta: "ஷாப்பிஃபை" },
    ],
  },
  {
    key: "q7_feature",
    en: "Which one feature would you start using tomorrow?",
    ta: "எந்த ஒரு வசதியை நாளை முதல் பயன்படுத்துவீர்கள்?",
    type: "single",
    options: [
      { en: "AI Model Photos", ta: "AI மாடல் போட்டோ" },
      { en: "Scan to Catalog", ta: "ஸ்கேன் செய்து கேட்டலாக்" },
      { en: "Live Stock Board", ta: "லைவ் ஸ்டாக்" },
      { en: "WhatsApp Blast", ta: "WhatsApp பிளாஸ்ட்" },
      { en: "Lucky Coupon Drop", ta: "லக்கி கூப்பன்" },
      { en: "Online Store", ta: "ஆன்லைன் கடை" },
    ],
  },
  {
    key: "q8_cost",
    en: "Comfortable monthly cost to avail such features?",
    ta: "இந்த வசதிகளுக்கு மாதம் எவ்வளவு செலவு சரியாக இருக்கும்?",
    type: "single",
    options: [
      { en: "\u20B97,000\u201310,000", ta: "\u20B97,000\u201310,000" },
      { en: "\u20B910,000\u201315,000", ta: "\u20B910,000\u201315,000" },
      { en: "\u20B915,000\u201320,000", ta: "\u20B915,000\u201320,000" },
      { en: "Above \u20B920,000", ta: "\u20B920,000-க்கு மேல்" },
      { en: "Too expensive for me", ta: "எனக்கு மிகவும் விலை அதிகம்" },
    ],
  },
  {
    key: "q9_operator",
    en: "Who will operate it in the shop?",
    ta: "கடையில் இதை யார் இயக்குவார்கள்?",
    type: "single",
    options: [
      { en: "Myself", ta: "நானே" },
      { en: "Staff", ta: "ஊழியர்" },
      { en: "Family member", ta: "குடும்பத்தினர்" },
      { en: "Not sure", ta: "தெரியாது" },
    ],
  },
  {
    key: "q10_contact",
    en: "Name & WhatsApp number (optional)",
    ta: "பெயர் மற்றும் WhatsApp எண் (விருப்பம்)",
    type: "contact",
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const q = questions[step];

  const setAnswer = (key, val) => setAnswers((prev) => ({ ...prev, [key]: val }));

  const handleNext = async () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      setSaving(true);
      saveSurveyResponse(answers);
      await persistToSheet(answers);
      setSaving(false);
      setSubmitted(true);
    }
  };

  const canProceed = () => {
    if (!q) return false;
    if (q.type === "contact") return true;
    const val = answers[q.key];
    if (q.type === "multi") return Array.isArray(val) && val.length > 0;
    return !!val;
  };

  if (submitted) {
    return (
      <section id="survey" className="py-16 px-4 sm:px-6">
        <div className="max-w-lg mx-auto text-center fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600 check-anim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-indigo-deep">{"Thank you / நன்றி"}</h2>
          <p className="text-gray-500 mt-2 text-sm">Your response has been saved.</p>
          <p className="text-gray-400 mt-1 text-xs font-hind">{"உங்கள் பதில் பாதுகாப்பாக சேமிக்கப்பட்டது."}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => { setStep(0); setAnswers({}); setSubmitted(false); }}
              className="bg-indigo-deep text-white px-5 py-2.5 rounded-xl text-sm font-medium btn-hover"
            >
              New Response
            </button>
            <button
              onClick={exportCSV}
              className="bg-saffron text-indigo-deep px-5 py-2.5 rounded-xl text-sm font-bold btn-hover"
            >
              Export CSV
            </button>
          </div>
          <p className="mt-3 text-xs text-gray-400">{getSurveyResponses().length} response(s) saved</p>
        </div>
      </section>
    );
  }

  return (
    <section id="survey" className="py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: context panel (desktop) */}
          <div className="hidden md:block md:col-span-2">
            <div className="sticky top-20 bg-gradient-to-br from-indigo-deep to-[#2D2A6E] rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">Quick Survey</h2>
              <p className="text-white/60 text-sm mb-6">Help us understand your needs. Takes 2 minutes.</p>
              <p className="text-white/40 text-xs font-hind mb-8">{"உங்கள் தேவைகளைச் சொல்லுங்கள். வெறும் 2 நிமிடம்."}</p>

              {/* Progress */}
              <div className="space-y-2">
                {questions.map((q, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 transition-all ${
                      i < step ? "bg-saffron text-indigo-deep"
                        : i === step ? "bg-white text-indigo-deep"
                        : "bg-white/10 text-white/30"
                    }`}>
                      {i < step ? (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    <span className={`text-xs truncate ${i <= step ? "text-white/80" : "text-white/25"}`}>
                      {q.en.length > 30 ? q.en.slice(0, 30) + "..." : q.en}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <button onClick={exportCSV} className="text-xs text-white/40 hover:text-white/60 underline">
                  Export all responses as CSV
                </button>
              </div>
            </div>
          </div>

          {/* Right: question card */}
          <div className="md:col-span-3">
            {/* Mobile progress dots */}
            <div className="flex justify-center gap-1.5 mb-6 md:hidden">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === step ? "bg-indigo-deep w-6" : i < step ? "bg-saffron" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm fade-in" key={step}>
              <div className="text-xs text-gray-400 mb-1">{step + 1} of {questions.length}</div>
              <h3 className="text-lg font-semibold text-text-main mb-1">{q.en}</h3>
              <p className="text-sm text-gray-400 font-hind mb-6">{q.ta}</p>

              {q.type === "single" && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt.en}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        answers[q.key] === opt.en
                          ? "border-indigo-deep bg-indigo-50 shadow-sm"
                          : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                        answers[q.key] === opt.en ? "border-indigo-deep" : "border-gray-300"
                      }`}>
                        {answers[q.key] === opt.en && <div className="w-2.5 h-2.5 rounded-full bg-indigo-deep" />}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{opt.en}</span>
                        <span className="block text-xs text-gray-400 font-hind">{opt.ta}</span>
                      </div>
                      <input type="radio" name={q.key} checked={answers[q.key] === opt.en} onChange={() => setAnswer(q.key, opt.en)} className="sr-only" />
                    </label>
                  ))}
                </div>
              )}

              {q.type === "multi" && (
                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const selected = answers[q.key] || [];
                    const isSelected = selected.includes(opt.en);
                    return (
                      <label
                        key={opt.en}
                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-indigo-deep bg-indigo-50 shadow-sm"
                            : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                          isSelected ? "border-indigo-deep bg-indigo-deep" : "border-gray-300"
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                          )}
                        </div>
                        <div>
                          <span className="text-sm font-medium">{opt.en}</span>
                          <span className="block text-xs text-gray-400 font-hind">{opt.ta}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {
                            let next;
                            if (isSelected) { next = selected.filter((x) => x !== opt.en); }
                            else if (selected.length < q.max) { next = [...selected, opt.en]; }
                            else { return; }
                            setAnswer(q.key, next);
                          }}
                          className="sr-only"
                        />
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === "contact" && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">{"Your name / உங்கள் பெயர்"}</label>
                    <input
                      type="text"
                      value={answers.name || ""}
                      onChange={(e) => setAnswer("name", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:border-indigo-deep outline-none transition-colors"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">{"WhatsApp number / WhatsApp எண்"}</label>
                    <input
                      type="tel"
                      value={answers.whatsapp || ""}
                      onChange={(e) => setAnswer("whatsapp", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:border-indigo-deep outline-none transition-colors"
                      placeholder="9876543210"
                    />
                  </div>
                  <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={answers.canContact || false}
                      onChange={(e) => setAnswer("canContact", e.target.checked)}
                      className="accent-indigo-deep mt-0.5"
                    />
                    <div>
                      <span className="text-sm">Can we contact you for a free trial?</span>
                      <span className="block text-xs text-gray-400 font-hind">{"இலவச சோதனைக்கு நாங்கள் உங்களைத் தொடர்பு கொள்ளலாமா?"}</span>
                    </div>
                  </label>
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed() || saving}
                className="mt-6 w-full bg-indigo-deep text-white py-3.5 rounded-xl text-sm font-medium btn-hover disabled:opacity-30 transition-all"
              >
                {saving ? "Saving..." : step === questions.length - 1 ? "Submit / சமர்ப்பிக்கவும்" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
