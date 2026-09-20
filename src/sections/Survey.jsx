import { useState } from "react";
import { saveSurveyResponse, exportCSV, getSurveyResponses } from "../utils/surveyStorage";
import { persistToSheet } from "../utils/sheetsPersist";

const questions = [
  {
    key: "q1_sells",
    en: "What do you sell?",
    hi: "\u0906\u092A \u0915\u094D\u092F\u093E \u092C\u0947\u091A\u0924\u0947 \u0939\u0948\u0902?",
    type: "single",
    options: [
      { en: "Men's", hi: "\u092A\u0941\u0930\u0941\u0937" },
      { en: "Women's", hi: "\u092E\u0939\u093F\u0932\u093E" },
      { en: "Kids", hi: "\u092C\u091A\u094D\u091A\u0947" },
      { en: "All categories", hi: "\u0938\u092D\u0940" },
    ],
  },
  {
    key: "q2_monthly_sales",
    en: "Monthly sales",
    hi: "\u092E\u0939\u0940\u0928\u0947 \u0915\u0940 \u092C\u093F\u0915\u094D\u0930\u0940",
    type: "single",
    options: [
      { en: "Under \u20B95L", hi: "\u20B95 \u0932\u093E\u0916 \u0938\u0947 \u0915\u092E" },
      { en: "\u20B95\u201320L", hi: "\u20B95\u201320 \u0932\u093E\u0916" },
      { en: "\u20B920\u201350L", hi: "\u20B920\u201350 \u0932\u093E\u0916" },
      { en: "Above \u20B950L", hi: "\u20B950 \u0932\u093E\u0916 \u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E" },
    ],
  },
  {
    key: "q3_stock_records",
    en: "How do you keep stock records today?",
    hi: "\u0906\u091C \u0938\u094D\u091F\u0949\u0915 \u0915\u093E \u0939\u093F\u0938\u093E\u092C \u0915\u0948\u0938\u0947 \u0930\u0916\u0924\u0947 \u0939\u0948\u0902?",
    type: "single",
    options: [
      { en: "Register/Copy", hi: "\u0930\u091C\u093F\u0938\u094D\u091F\u0930/\u0915\u0949\u092A\u0940" },
      { en: "Excel", hi: "\u090F\u0915\u094D\u0938\u0947\u0932" },
      { en: "Billing software", hi: "\u092C\u093F\u0932\u093F\u0902\u0917 \u0938\u0949\u092B\u093C\u094D\u091F\u0935\u0947\u092F\u0930" },
      { en: "From memory", hi: "\u092C\u0938 \u092F\u093E\u0926 \u0938\u0947" },
    ],
  },
  {
    key: "q4_problems",
    en: "Biggest daily problem (pick up to 2)",
    hi: "\u0930\u094B\u091C\u093C \u0915\u0940 \u0938\u092C\u0938\u0947 \u092C\u0921\u093C\u0940 \u092A\u0930\u0947\u0936\u093E\u0928\u0940 (2 \u0924\u0915 \u091A\u0941\u0928\u0947\u0902)",
    type: "multi",
    max: 2,
    options: [
      { en: "Unfolding too many pieces per customer", hi: "\u090F\u0915 \u0917\u094D\u0930\u093E\u0939\u0915 \u0915\u0947 \u0932\u093F\u090F \u092C\u0939\u0941\u0924 \u0915\u092A\u0921\u093C\u0947 \u0916\u094B\u0932\u0928\u093E" },
      { en: "Don't know what's in stock", hi: "\u0915\u094C\u0928 \u0938\u093E \u092E\u093E\u0932 \u0939\u0948, \u092A\u0924\u093E \u0928\u0939\u0940\u0902" },
      { en: "Old stock not selling", hi: "\u092A\u0941\u0930\u093E\u0928\u093E \u092E\u093E\u0932 \u0928\u0939\u0940\u0902 \u092C\u093F\u0915\u0924\u093E" },
      { en: "Customers don't come back", hi: "\u0917\u094D\u0930\u093E\u0939\u0915 \u0926\u094B\u092C\u093E\u0930\u093E \u0928\u0939\u0940\u0902 \u0906\u0924\u0947" },
      { en: "Handling online orders", hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u0911\u0930\u094D\u0921\u0930 \u0938\u0902\u092D\u093E\u0932\u0928\u093E \u092E\u0941\u0936\u094D\u0915\u093F\u0932" },
    ],
  },
  {
    key: "q5_online",
    en: "Do you sell online today?",
    hi: "\u0915\u094D\u092F\u093E \u0906\u092A \u0911\u0928\u0932\u093E\u0907\u0928 \u092C\u0947\u091A\u0924\u0947 \u0939\u0948\u0902?",
    type: "single",
    options: [
      { en: "No", hi: "\u0928\u0939\u0940\u0902" },
      { en: "WhatsApp/Instagram only", hi: "\u0938\u093F\u0930\u094D\u092B\u093C WhatsApp/Instagram" },
      { en: "Marketplace", hi: "\u092E\u093E\u0930\u094D\u0915\u0947\u091F\u092A\u094D\u0932\u0947\u0938" },
      { en: "Own website", hi: "\u0905\u092A\u0928\u0940 \u0935\u0947\u092C\u0938\u093E\u0907\u091F" },
    ],
  },
  {
    key: "q6_useful",
    en: "Which part was most useful?",
    hi: "\u0915\u094C\u0928 \u0938\u093E \u0939\u093F\u0938\u094D\u0938\u093E \u0938\u092C\u0938\u0947 \u0915\u093E\u092E \u0915\u093E \u0932\u0917\u093E?",
    type: "single",
    options: [
      { en: "Digitize", hi: "\u0921\u093F\u091C\u093F\u091F\u093E\u0907\u091C\u093C" },
      { en: "Amplify", hi: "\u090F\u092E\u094D\u092A\u094D\u0932\u093F\u092B\u093C\u093E\u0908" },
      { en: "Shopify", hi: "\u0936\u0949\u092A\u093F\u092B\u093C\u093E\u0908" },
    ],
  },
  {
    key: "q7_feature",
    en: "Which one feature would you start using tomorrow?",
    hi: "\u0915\u094C\u0928 \u0938\u0940 \u090F\u0915 \u0938\u0941\u0935\u093F\u0927\u093E \u0915\u0932 \u0938\u0947 \u0907\u0938\u094D\u0924\u0947\u092E\u093E\u0932 \u0915\u0930\u0947\u0902\u0917\u0947?",
    type: "single",
    options: [
      { en: "AI Model Photos", hi: "AI \u092E\u0949\u0921\u0932 \u092B\u093C\u094B\u091F\u094B" },
      { en: "Scan to Catalog", hi: "\u0938\u094D\u0915\u0948\u0928 \u0938\u0947 \u0915\u0948\u091F\u0932\u0949\u0917" },
      { en: "Live Stock Board", hi: "\u0932\u093E\u0907\u0935 \u0938\u094D\u091F\u0949\u0915" },
      { en: "WhatsApp Blast", hi: "WhatsApp \u092C\u094D\u0932\u093E\u0938\u094D\u091F" },
      { en: "Lucky Coupon Drop", hi: "\u0932\u0915\u0940 \u0915\u0942\u092A\u0928" },
      { en: "Online Store", hi: "\u0911\u0928\u0932\u093E\u0907\u0928 \u0926\u0941\u0915\u093E\u0928" },
    ],
  },
  {
    key: "q8_cost",
    en: "Comfortable monthly cost to avail such features?",
    hi: "\u0907\u0928 \u0938\u0941\u0935\u093F\u0927\u093E\u0913\u0902 \u0915\u0947 \u0932\u093F\u090F \u092E\u0939\u0940\u0928\u0947 \u0915\u093E \u0915\u093F\u0924\u0928\u093E \u0916\u0930\u094D\u091A \u0920\u0940\u0915 \u0932\u0917\u0947\u0917\u093E?",
    type: "single",
    options: [
      { en: "\u20B97,000\u201310,000", hi: "\u20B97,000\u201310,000" },
      { en: "\u20B910,000\u201315,000", hi: "\u20B910,000\u201315,000" },
      { en: "\u20B915,000\u201320,000", hi: "\u20B915,000\u201320,000" },
      { en: "Above \u20B920,000", hi: "\u20B920,000 \u0938\u0947 \u091C\u093C\u094D\u092F\u093E\u0926\u093E" },
      { en: "Too expensive for me", hi: "\u092E\u0947\u0930\u0947 \u0932\u093F\u090F \u092C\u0939\u0941\u0924 \u092E\u0939\u0902\u0917\u093E \u0939\u0948" },
    ],
  },
  {
    key: "q9_operator",
    en: "Who will operate it in the shop?",
    hi: "\u0926\u0941\u0915\u093E\u0928 \u092E\u0947\u0902 \u0907\u0938\u0947 \u0915\u094C\u0928 \u091A\u0932\u093E\u090F\u0917\u093E?",
    type: "single",
    options: [
      { en: "Myself", hi: "\u092E\u0948\u0902 \u0916\u0941\u0926" },
      { en: "Staff", hi: "\u0938\u094D\u091F\u093E\u092B\u093C" },
      { en: "Family member", hi: "\u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u093E \u0915\u094B\u0908 \u0938\u0926\u0938\u094D\u092F" },
      { en: "Not sure", hi: "\u092A\u0924\u093E \u0928\u0939\u0940\u0902" },
    ],
  },
  {
    key: "q10_contact",
    en: "Name & WhatsApp number (optional)",
    hi: "\u0928\u093E\u092E \u0914\u0930 WhatsApp \u0928\u0902\u092C\u0930 (\u0935\u0948\u0915\u0932\u094D\u092A\u093F\u0915)",
    type: "contact",
  },
];

export default function Survey() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const q = questions[step];

  const setAnswer = (key, val) => setAnswers((prev) => ({ ...prev, [key]: val }));

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      saveSurveyResponse(answers);
      persistToSheet(answers);
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
          <h2 className="text-2xl font-bold text-indigo-deep">{"Thank you / धन्यवाद"}</h2>
          <p className="text-gray-500 mt-2 text-sm">Your response has been saved.</p>
          <p className="text-gray-400 mt-1 text-xs font-hind">{"आपका जवाब सुरक्षित हो गया है।"}</p>
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
              <p className="text-white/40 text-xs font-hind mb-8">{"अपनी ज़रूरतें बताएं। सिर्फ 2 मिनट।"}</p>

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
              <p className="text-sm text-gray-400 font-hind mb-6">{q.hi}</p>

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
                        <span className="block text-xs text-gray-400 font-hind">{opt.hi}</span>
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
                          <span className="block text-xs text-gray-400 font-hind">{opt.hi}</span>
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
                    <label className="text-sm text-gray-500 block mb-1.5">{"Your name / आपका नाम"}</label>
                    <input
                      type="text"
                      value={answers.name || ""}
                      onChange={(e) => setAnswer("name", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:border-indigo-deep outline-none transition-colors"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">{"WhatsApp number / WhatsApp नंबर"}</label>
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
                      <span className="block text-xs text-gray-400 font-hind">{"क्या हम मुफ़्त ट्रायल के लिए संपर्क कर सकते हैं?"}</span>
                    </div>
                  </label>
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="mt-6 w-full bg-indigo-deep text-white py-3.5 rounded-xl text-sm font-medium btn-hover disabled:opacity-30 transition-all"
              >
                {step === questions.length - 1 ? "Submit / \u091C\u092E\u093E \u0915\u0930\u0947\u0902" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
