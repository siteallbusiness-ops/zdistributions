"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import "./signup.css";

const STEPS = [
  "Contact Information",
  "Company Information",
  "Trade References",
  "Upload Documents",
  "Finish",
];

const COUNTRY_CODES = [
  { code: "+44", flag: "🇬🇧", label: "+44" },
  { code: "+1",  flag: "🇺🇸", label: "+1"  },
  { code: "+971",flag: "🇦🇪", label: "+971"},
  { code: "+92", flag: "🇵🇰", label: "+92" },
  { code: "+91", flag: "🇮🇳", label: "+91" },
  { code: "+880",flag: "🇧🇩", label: "+880"},
  { code: "+93", flag: "🇦🇫", label: "+93" },
  { code: "+20", flag: "🇪🇬", label: "+20" },
  { code: "+234",flag: "🇳🇬", label: "+234"},
  { code: "+27", flag: "🇿🇦", label: "+27" },
  { code: "+49", flag: "🇩🇪", label: "+49" },
  { code: "+33", flag: "🇫🇷", label: "+33" },
  { code: "+86", flag: "🇨🇳", label: "+86" },
  { code: "+60", flag: "🇲🇾", label: "+60" },
  { code: "+65", flag: "🇸🇬", label: "+65" },
];

const COUNTRIES = [
  "United Kingdom","United States","United Arab Emirates","Pakistan","India",
  "Bangladesh","Nigeria","Ghana","Kenya","South Africa","Egypt","Saudi Arabia",
  "Germany","France","Netherlands","Belgium","Spain","Italy","China","Singapore",
  "Malaysia","Australia","Canada","Brazil","Turkey","Poland","Czech Republic",
  "Hungary","Romania","Bulgaria","Other",
];

const COMPANY_TYPES = [
  "Limited Company (Ltd)","Public Limited Company (PLC)","Partnership",
  "Sole Trader","Limited Liability Partnership (LLP)","Charity","Other",
];

const PHONE_TYPES = ["Mobile","Landline","Fax","WhatsApp"];

const PRODUCTS = [
  "Confectionery","Snacks","Drinks","Hot Drinks",
  "Grocery","Household","Personal Care","Baby & Toddler","Pet Care",
];

/* ── helpers ── */
function PhoneInput({ dialCode, onDialChange, value, onChange, placeholder }) {
  return (
    <div className="sf-phone-wrap">
      <select className="sf-phone-code" value={dialCode} onChange={e => onDialChange(e.target.value)}>
        {COUNTRY_CODES.map(c => (
          <option key={c.code} value={c.code}>{c.flag} {c.label}</option>
        ))}
      </select>
      <input
        type="tel"
        className="sf-phone-num"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "201-555-0123"}
      />
    </div>
  );
}

function StepIndicator({ current }) {
  return (
    <ul className="signup-steps">
      {STEPS.map((label, i) => {
        const state = i < current ? "done" : i === current ? "active" : "";
        return (
          <li key={i} className={`signup-step ${state}`}>
            <div className="signup-step__num">
              {i < current ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <div className="signup-step__label">{label}</div>
          </li>
        );
      })}
    </ul>
  );
}

/* ── STEP 1: Contact Information ── */
function Step1({ data, onChange }) {
  const f = (field) => ({
    value: data[field] || "",
    onChange: e => onChange(field, e.target.value),
  });
  return (
    <>
      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">First Name <span className="req">*</span></label>
          <input className="sf-input" type="text" placeholder="John" {...f("firstName")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Last Name <span className="req">*</span></label>
          <input className="sf-input" type="text" placeholder="Smith" {...f("lastName")} />
        </div>
      </div>

      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">Job Title / Position <span className="req">*</span></label>
          <input className="sf-input" type="text" placeholder="Purchasing Manager" {...f("jobTitle")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Email Address <span className="req">*</span></label>
          <input className="sf-input" type="email" placeholder="you@company.com" {...f("contactEmail")} />
        </div>
      </div>

      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">Telephone <span className="req">*</span></label>
          <PhoneInput
            dialCode={data.contactDial || "+44"}
            onDialChange={v => onChange("contactDial", v)}
            value={data.contactPhone || ""}
            onChange={v => onChange("contactPhone", v)}
          />
        </div>
        <div className="sf-field">
          <label className="sf-label">Telephone Type <span className="req">*</span></label>
          <select className="sf-select" {...f("contactPhoneType")}>
            <option value="">- Choose -</option>
            {PHONE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">Password <span className="req">*</span></label>
          <input className="sf-input" type="password" placeholder="••••••••" {...f("password")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Confirm Password <span className="req">*</span></label>
          <input className="sf-input" type="password" placeholder="••••••••" {...f("confirmPassword")} />
        </div>
      </div>
    </>
  );
}

/* ── STEP 2: Company Information ── */
function Step2({ data, onChange }) {
  const f = (field) => ({
    value: data[field] || "",
    onChange: e => onChange(field, e.target.value),
  });

  const allSelected = PRODUCTS.every(p => (data.products || []).includes(p));

  function toggleProduct(p) {
    const current = data.products || [];
    const next = current.includes(p) ? current.filter(x => x !== p) : [...current, p];
    onChange("products", next);
  }

  function toggleAll() {
    onChange("products", allSelected ? [] : [...PRODUCTS]);
  }

  return (
    <>
      <div className="sf-row sf-row-1">
        <div className="sf-field">
          <label className="sf-label">Premier Exports Sales Executive</label>
          <input className="sf-input" type="text" placeholder="Name of your sales contact (if known)" {...f("salesExec")} />
        </div>
      </div>

      <div className="sf-row sf-row-3">
        <div className="sf-field">
          <label className="sf-label">Registered Company Name <span className="req">*</span></label>
          <input className="sf-input" type="text" {...f("companyName")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Trading As <span className="req">*</span></label>
          <input className="sf-input" type="text" {...f("tradingAs")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Company Type <span className="req">*</span></label>
          <select className="sf-select" {...f("companyType")}>
            <option value="">- Choose -</option>
            {COMPANY_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="sf-row sf-row-3">
        <div className="sf-field">
          <label className="sf-label">Company No <span className="req">*</span></label>
          <input className="sf-input" type="text" {...f("companyNo")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Incorporation Date <span className="req">*</span></label>
          <input className="sf-input" type="date" {...f("incorporationDate")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Tax / VAT No <span className="req">*</span></label>
          <input className="sf-input" type="text" {...f("vatNo")} />
        </div>
      </div>

      <div className="sf-row sf-row-1">
        <div className="sf-field">
          <label className="sf-label">Email <span className="req">*</span></label>
          <input className="sf-input" type="email" {...f("companyEmail")} />
        </div>
      </div>

      <div className="sf-row sf-row-1">
        <div className="sf-field">
          <label className="sf-label">Registered Address <span className="req">*</span></label>
          <input className="sf-input" type="text" {...f("address")} />
        </div>
      </div>

      <div className="sf-row sf-row-3">
        <div className="sf-field">
          <label className="sf-label">Post Code / Zip Code <span className="req">*</span></label>
          <input className="sf-input" type="text" {...f("postCode")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Country <span className="req">*</span></label>
          <select className="sf-select" {...f("country")}>
            <option value="">- Choose -</option>
            {COUNTRIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="sf-field">
          <label className="sf-label">Website</label>
          <input className="sf-input" type="url" placeholder="https://www.example.com" {...f("website")} />
        </div>
      </div>

      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">Telephone <span className="req">*</span></label>
          <PhoneInput
            dialCode={data.dial || "+44"}
            onDialChange={v => onChange("dial", v)}
            value={data.phone || ""}
            onChange={v => onChange("phone", v)}
          />
        </div>
        <div className="sf-field">
          <label className="sf-label">Telephone Type <span className="req">*</span></label>
          <select className="sf-select" {...f("phoneType")}>
            <option value="">- Choose -</option>
            {PHONE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Business Type */}
      <div className="sf-row sf-row-1">
        <div className="sf-field">
          <label className="sf-label">Business Type (please tick) <span className="req">*</span></label>
          <div className="sf-radio-group">
            {["Wholesaler","Exporter","Distributor","Retail","Other"].map(bt => (
              <label key={bt} className="sf-radio-item">
                <input
                  type="radio"
                  name="businessType"
                  value={bt}
                  checked={(data.businessType || "") === bt}
                  onChange={() => onChange("businessType", bt)}
                />
                {bt}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Products Interested */}
      <div className="sf-row sf-row-1" style={{ marginTop: 8 }}>
        <div className="sf-field">
          <div className="sf-check-header">
            <label className="sf-label">Products Interested (please tick) <span className="req">*</span></label>
            <label className="sf-select-all">
              <input type="checkbox" checked={allSelected} onChange={toggleAll} />
              Select all
            </label>
          </div>
          <div className="sf-check-grid">
            {PRODUCTS.map(p => (
              <label key={p} className="sf-check-item">
                <input
                  type="checkbox"
                  checked={(data.products || []).includes(p)}
                  onChange={() => toggleProduct(p)}
                />
                {p}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* AML */}
      <div className="sf-aml-section">
        <div className="sf-section-title">Anti-Money Laundering Questionnaires</div>
        <div className="sf-row sf-row-1">
          <div className="sf-field">
            <label className="sf-label">Which country are payments going to be made from? <span className="req">*</span></label>
            <input className="sf-input" type="text" {...f("amlCountry")} />
          </div>
        </div>
        <div className="sf-row sf-row-1">
          <div className="sf-field">
            <label className="sf-label">Are payments being made from your business account? <span className="req">*</span></label>
            <input className="sf-input" type="text" placeholder="Yes / No / Details..." {...f("amlBusinessAccount")} />
          </div>
        </div>
        <div className="sf-row sf-row-1">
          <div className="sf-field">
            <label className="sf-label">What is the source of the fund? <span className="req">*</span></label>
            <input className="sf-input" type="text" {...f("amlSource")} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ── STEP 3: Trade References ── */
function ReferenceBlock({ idx, data, onChange }) {
  const f = (field) => ({
    value: data[field] || "",
    onChange: e => onChange(field, e.target.value),
  });
  return (
    <div className="sf-ref-card">
      <h3>Reference {idx + 1}</h3>
      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">Supplier Name</label>
          <input className="sf-input" type="text" {...f("supplierName")} />
        </div>
        <div className="sf-field">
          <label className="sf-label">Contact Name</label>
          <input className="sf-input" type="text" {...f("contactName")} />
        </div>
      </div>
      <div className="sf-row sf-row-2">
        <div className="sf-field">
          <label className="sf-label">Telephone</label>
          <PhoneInput
            dialCode={data.dial || "+44"}
            onDialChange={v => onChange("dial", v)}
            value={data.phone || ""}
            onChange={v => onChange("phone", v)}
          />
        </div>
        <div className="sf-field">
          <label className="sf-label">Telephone Type</label>
          <select className="sf-select" {...f("phoneType")}>
            <option value="">- Choose -</option>
            {PHONE_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="sf-row sf-row-1">
        <div className="sf-field">
          <label className="sf-label">Registered Address</label>
          <input className="sf-input" type="text" {...f("address")} />
        </div>
      </div>
    </div>
  );
}

function Step3({ data, onChange }) {
  function updateRef(idx, field, value) {
    const refs = [...(data.refs || [{}, {}])];
    refs[idx] = { ...refs[idx], [field]: value };
    onChange("refs", refs);
  }
  const refs = data.refs || [{}, {}];
  return (
    <>
      {refs.map((ref, i) => (
        <ReferenceBlock
          key={i}
          idx={i}
          data={ref}
          onChange={(field, val) => updateRef(i, field, val)}
        />
      ))}
    </>
  );
}

/* ── STEP 4: Upload Documents ── */
function Step4({ data, onChange, canvasRef, sigSaved, setSigSaved }) {
  const [sigMode, setSigMode] = useState("draw");
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = 200;
  }, [canvasRef]);

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function startDraw(e) {
    e.preventDefault();
    drawing.current = true;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setSigSaved(false);
  }

  function draw(e) {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.strokeStyle = "#2f6f56";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function endDraw(e) {
    e.preventDefault();
    drawing.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSigSaved(false);
  }

  function saveSignature() {
    setSigSaved(true);
  }

  return (
    <>
      <div className="sf-uploads">
        {[
          { label: "Company Certificate", field: "companyCert", req: true },
          { label: "Tax / VAT Certificate", field: "vatCert", req: true },
          { label: "Director ID", field: "directorId", req: true },
        ].map(({ label, field, req }) => (
          <div key={field} className="sf-upload-field">
            <label className="sf-label">{label} {req && <span className="req">*</span>}</label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="sf-upload-input"
              onChange={e => onChange(field, e.target.files[0] || null)}
            />
          </div>
        ))}
      </div>

      <div className="sf-upload-note">
        📄 <strong>Note:</strong> Please ensure each document file size is less than 10MB. Accepted formats: PDF, JPG, PNG
      </div>

      <div className="sf-row sf-row-1">
        <div className="sf-field">
          <label className="sf-label">Director&apos;s Name <span className="req">*</span></label>
          <input
            className="sf-input"
            type="text"
            placeholder="Full name of the director"
            value={data.directorName || ""}
            onChange={e => onChange("directorName", e.target.value)}
          />
        </div>
      </div>

      <div className="sf-field" style={{ marginTop: 8 }}>
        <label className="sf-label">Director&apos;s Signature <span className="req">*</span></label>

        <div className="sf-sig-tabs">
          <button
            type="button"
            className={`sf-sig-tab ${sigMode === "draw" ? "active" : ""}`}
            onClick={() => setSigMode("draw")}
          >
            Draw with mouse / touch
          </button>
          <button
            type="button"
            className={`sf-sig-tab ${sigMode === "upload" ? "active" : ""}`}
            onClick={() => setSigMode("upload")}
          >
            Upload signature image
          </button>
        </div>

        {sigMode === "draw" ? (
          <>
            <div className="sf-canvas-wrap">
              <canvas
                ref={canvasRef}
                className="sf-sig-canvas"
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
              <span className="sf-canvas-hint">Sign in the box above using your mouse or finger</span>
            </div>
            <div className="sf-sig-actions">
              <button
                type="button"
                className={`sf-sig-btn ${sigSaved ? "saved" : ""}`}
                onClick={saveSignature}
              >
                {sigSaved ? "Signature saved ✓" : "Save signature"}
              </button>
              <button type="button" className="sf-sig-btn" onClick={clearCanvas}>
                Clear
              </button>
            </div>
          </>
        ) : (
          <div style={{ marginTop: 0, border: "1.5px solid #d6dae0", borderTop: "none", borderRadius: "0 0 8px 8px", padding: 16 }}>
            <input
              type="file"
              accept="image/*"
              className="sf-upload-input"
              onChange={e => onChange("signatureImage", e.target.files[0] || null)}
            />
          </div>
        )}
      </div>
    </>
  );
}

/* ── STEP 5: Finish / Success ── */
function Step5() {
  return (
    <div className="sf-success">
      <div className="sf-success__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2>Application Submitted!</h2>
      <p>
        Thank you for applying. Our team will review your application and get back to you
        within 2–3 business days. You will receive a confirmation email shortly.
      </p>
      <Link href="/" className="sf-btn-next" style={{ display: "inline-block", textDecoration: "none" }}>
        Back to Home
      </Link>
    </div>
  );
}

/* ── Main page ── */
export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [docsData, setDocsData] = useState({});
  const [sigSaved, setSigSaved] = useState(false);
  const canvasRef = useRef(null);

  function updateField(section, field, value) {
    if (section === "docs") {
      setDocsData(prev => ({ ...prev, [field]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: { ...(prev[section] || {}), [field]: value },
      }));
    }
  }

  function next() {
    setStep(s => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep(s => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const stepTitles = [
    "Contact Information",
    "Company Information",
    "Trade References",
    "Upload Documents",
  ];

  return (
    <div className="signup-page">
      <div className="signup-shell">
        {/* Sidebar */}
        <aside className="signup-sidebar">
          <StepIndicator current={step} />
          <p className="signup-login-hint">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </aside>

        {/* Form card */}
        <main className="signup-card">
          {step < 4 && <h2>{stepTitles[step]}</h2>}

          {step === 0 && (
            <Step1
              data={formData.contact || {}}
              onChange={(f, v) => updateField("contact", f, v)}
            />
          )}

          {step === 1 && (
            <Step2
              data={formData.company || {}}
              onChange={(f, v) => updateField("company", f, v)}
            />
          )}

          {step === 2 && (
            <Step3
              data={formData.refs || {}}
              onChange={(f, v) => updateField("refs", f, v)}
            />
          )}

          {step === 3 && (
            <Step4
              data={docsData}
              onChange={(f, v) => updateField("docs", f, v)}
              canvasRef={canvasRef}
              sigSaved={sigSaved}
              setSigSaved={setSigSaved}
            />
          )}

          {step === 4 && <Step5 />}

          {step < 4 && (
            <div className="sf-actions">
              {step > 0 ? (
                <button type="button" className="sf-btn-back" onClick={back}>Back</button>
              ) : (
                <span />
              )}
              <button type="button" className="sf-btn-next" onClick={next}>
                {step === 3 ? "Submit" : "Next"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
