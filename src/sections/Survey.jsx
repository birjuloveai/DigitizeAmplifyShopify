import { useState } from "react";
import { saveSurveyResponse, exportCSV, getSurveyResponses } from "../utils/surveyStorage";
import { persistToSheet } from "../utils/sheetsPersist";

const questions = [
  {
    key: "q1_sells",
    en: "What do you sell?",
    kn: "ನೀವು ಏನು ಮಾರಾಟ ಮಾಡುತ್ತೀರಿ?",
    type: "single",
    options: [
      { en: "Men's", kn: "ಪುರುಷರು" },
      { en: "Women's", kn: "ಮಹಿಳೆಯರು" },
      { en: "Kids", kn: "ಮಕ್ಕಳು" },
      { en: "All categories", kn: "ಎಲ್ಲಾ ವಿಭಾಗಗಳು" },
    ],
  },
  {
    key: "q2_monthly_sales",
    en: "Monthly sales",
    kn: "ತಿಂಗಳ ಮಾರಾಟ",
    type: "single",
    options: [
      { en: "Under \u20B95L", kn: "\u20B95 ಲಕ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ" },
      { en: "\u20B95\u201320L", kn: "\u20B95\u201320 ಲಕ್ಷ" },
      { en: "\u20B920\u201350L", kn: "\u20B920\u201350 ಲಕ್ಷ" },
      { en: "Above \u20B950L", kn: "\u20B950 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚು" },
    ],
  },
  {
    key: "q3_stock_records",
    en: "How do you keep stock records today?",
    kn: "ಇಂದು ಸ್ಟಾಕ್ ದಾಖಲೆಗಳನ್ನು ಹೇಗೆ ಇಡುತ್ತೀರಿ?",
    type: "single",
    options: [
      { en: "Register/Copy", kn: "ರಿಜಿಸ್ಟರ್/ಕಾಪಿ" },
      { en: "Excel", kn: "ಎಕ್ಸೆಲ್" },
      { en: "Billing software", kn: "ಬಿಲ್ಲಿಂಗ್ ಸಾಫ್ಟ್\u200Cವೇರ್" },
      { en: "From memory", kn: "ನೆನಪಿನಿಂದ" },
    ],
  },
  {
    key: "q4_problems",
    en: "Biggest daily problem (pick up to 2)",
    kn: "ದಿನನಿತ್ಯದ ಅತಿದೊಡ್ಡ ಸಮಸ್ಯೆ (2 ಆಯ್ಕೆ ಮಾಡಿ)",
    type: "multi",
    max: 2,
    options: [
      { en: "Unfolding too many pieces per customer", kn: "ಒಬ್ಬ ಗ್ರಾಹಕನಿಗೆ ಹಲವು ಬಟ್ಟೆ ಬಿಡಿಸುವುದು" },
      { en: "Don't know what's in stock", kn: "ಯಾವ ಸ್ಟಾಕ್ ಇದೆ ಎಂದು ಗೊತ್ತಿಲ್ಲ" },
      { en: "Old stock not selling", kn: "ಹಳೆಯ ಸ್ಟಾಕ್ ಮಾರಾಟವಾಗುತ್ತಿಲ್ಲ" },
      { en: "Customers don't come back", kn: "ಗ್ರಾಹಕರು ಮತ್ತೆ ಬರುವುದಿಲ್ಲ" },
      { en: "Handling online orders", kn: "ಆನ್\u200Cಲೈನ್ ಆರ್ಡರ್ ನಿರ್ವಹಣೆ ಕಷ್ಟ" },
    ],
  },
  {
    key: "q5_online",
    en: "Do you sell online today?",
    kn: "ನೀವು ಇಂದು ಆನ್\u200Cಲೈನ್\u200Cನಲ್ಲಿ ಮಾರಾಟ ಮಾಡುತ್ತೀರಾ?",
    type: "single",
    options: [
      { en: "No", kn: "ಇಲ್ಲ" },
      { en: "WhatsApp/Instagram only", kn: "WhatsApp/Instagram ಮಾತ್ರ" },
      { en: "Marketplace", kn: "ಮಾರ್ಕೆಟ್\u200Cಪ್ಲೇಸ್" },
      { en: "Own website", kn: "ಸ್ವಂತ ವೆಬ್\u200Cಸೈಟ್" },
    ],
  },
  {
    key: "q6_useful",
    en: "Which part was most useful?",
    kn: "ಯಾವ ಭಾಗ ಅತ್ಯಂತ ಉಪಯುಕ್ತವಾಗಿತ್ತು?",
    type: "single",
    options: [
      { en: "Digitize", kn: "ಡಿಜಿಟೈಜ್" },
      { en: "Amplify", kn: "ಆಂಪ್ಲಿಫೈ" },
      { en: "Shopify", kn: "ಶಾಪಿಫೈ" },
    ],
  },
  {
    key: "q7_feature",
    en: "Which one feature would you start using tomorrow?",
    kn: "ನಾಳೆಯಿಂದ ಯಾವ ಒಂದು ಸೌಲಭ್ಯವನ್ನು ಬಳಸಲು ಶುರು ಮಾಡುತ್ತೀರಿ?",
    type: "single",
    options: [
      { en: "AI Model Photos", kn: "AI ಮಾಡೆಲ್ ಫೋಟೋ" },
      { en: "Scan to Catalog", kn: "ಸ್ಕ್ಯಾನ್ ಟು ಕ್ಯಾಟಲಾಗ್" },
      { en: "Live Stock Board", kn: "ಲೈವ್ ಸ್ಟಾಕ್" },
      { en: "WhatsApp Blast", kn: "WhatsApp ಬ್ಲಾಸ್ಟ್" },
      { en: "Lucky Coupon Drop", kn: "ಲಕ್ಕಿ ಕೂಪನ್" },
      { en: "Online Store", kn: "ಆನ್\u200Cಲೈನ್ ಅಂಗಡಿ" },
    ],
  },
  {
    key: "q8_cost",
    en: "Comfortable monthly cost to avail such features?",
    kn: "ಈ ಸೌಲಭ್ಯಗಳಿಗೆ ತಿಂಗಳಿಗೆ ಎಷ್ಟು ಖರ್ಚು ಸರಿ ಎನಿಸುತ್ತದೆ?",
    type: "single",
    options: [
      { en: "\u20B97,000\u201310,000", kn: "\u20B97,000\u201310,000" },
      { en: "\u20B910,000\u201315,000", kn: "\u20B910,000\u201315,000" },
      { en: "\u20B915,000\u201320,000", kn: "\u20B915,000\u201320,000" },
      { en: "Above \u20B920,000", kn: "\u20B920,000ಕ್ಕಿಂತ ಹೆಚ್ಚು" },
      { en: "Too expensive for me", kn: "ನನಗೆ ತುಂಬಾ ದುಬಾರಿ" },
    ],
  },
  {
    key: "q9_operator",
    en: "Who will operate it in the shop?",
    kn: "ಅಂಗಡಿಯಲ್ಲಿ ಇದನ್ನು ಯಾರು ನಡೆಸುತ್ತಾರೆ?",
    type: "single",
    options: [
      { en: "Myself", kn: "ನಾನೇ" },
      { en: "Staff", kn: "ಸಿಬ್ಬಂದಿ" },
      { en: "Family member", kn: "ಕುಟುಂಬದ ಸದಸ್ಯ" },
      { en: "Not sure", kn: "ಗೊತ್ತಿಲ್ಲ" },
    ],
  },
  {
    key: "q10_contact",
    en: "Name & WhatsApp number (optional)",
    kn: "ಹೆಸರು ಮತ್ತು WhatsApp ನಂಬರ್ (ಐಚ್ಛಿಕ)",
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
          <h2 className="text-2xl font-bold text-indigo-deep">{"Thank you / ಧನ್ಯವಾದಗಳು"}</h2>
          <p className="text-gray-500 mt-2 text-sm">Your response has been saved.</p>
          <p className="text-gray-400 mt-1 text-xs font-hind">{"ನಿಮ್ಮ ಉತ್ತರ ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಸಲಾಗಿದೆ."}</p>
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
              <p className="text-white/40 text-xs font-hind mb-8">{"ನಿಮ್ಮ ಅಗತ್ಯಗಳನ್ನು ತಿಳಿಸಿ. ಕೇವಲ 2 ನಿಮಿಷ."}</p>

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
              <p className="text-sm text-gray-400 font-hind mb-6">{q.kn}</p>

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
                        <span className="block text-xs text-gray-400 font-hind">{opt.kn}</span>
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
                          <span className="block text-xs text-gray-400 font-hind">{opt.kn}</span>
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
                    <label className="text-sm text-gray-500 block mb-1.5">{"Your name / ನಿಮ್ಮ ಹೆಸರು"}</label>
                    <input
                      type="text"
                      value={answers.name || ""}
                      onChange={(e) => setAnswer("name", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:bg-white focus:border-indigo-deep outline-none transition-colors"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 block mb-1.5">{"WhatsApp number / WhatsApp ನಂಬರ್"}</label>
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
                      <span className="block text-xs text-gray-400 font-hind">{"ಉಚಿತ ಟ್ರಯಲ್\u200Cಗಾಗಿ ನಾವು ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಬಹುದೇ?"}</span>
                    </div>
                  </label>
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="mt-6 w-full bg-indigo-deep text-white py-3.5 rounded-xl text-sm font-medium btn-hover disabled:opacity-30 transition-all"
              >
                {step === questions.length - 1 ? "Submit / ಸಲ್ಲಿಸಿ" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
