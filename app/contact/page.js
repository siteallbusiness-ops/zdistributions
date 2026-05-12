"use client";
import { useState } from "react";
import Link from "next/link";

const INFO_CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    primary: "+44 1923 250086",
    secondary: "Mon – Fri: 9:00 AM – 6:00 PM",
    href: "tel:+441923250086",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 7 10-7" />
      </svg>
    ),
    label: "Email",
    primary: "offers@zdistribution.com",
    secondary: "We reply within 24 hours",
    href: "mailto:offers@zdistribution.com",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Address",
    primary: "Z Distribution Ltd",
    secondary: "London, United Kingdom",
    href: null,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    label: "Business Hours",
    primary: "Monday – Friday",
    secondary: "9:00 AM – 6:00 PM GMT",
    href: null,
  },
];

export default function ContactPage() {
  const [qty, setQty] = useState([]);
  const [contact, setContact] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (setter, list, val) =>
    setter(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      {/* ── Hero ── */}
      <div className="ct-hero">
        <div className="ct-hero-blob ct-hero-blob-1" />
        <div className="ct-hero-blob ct-hero-blob-2" />
        <div className="container ct-hero-inner">
          <div className="ct-breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h1 className="ct-hero-heading">Get in Touch</h1>
          <p className="ct-hero-sub">
            Ready to place an order or have a question? Our team is here to help
            you source the right products at the best wholesale prices.
          </p>
        </div>
      </div>

      {/* ── Info cards ── */}
      <div className="container">
        <div className="ct-info-row">
          {INFO_CARDS.map((card) => (
            <div key={card.label} className="ct-info-card">
              <div className="ct-info-icon">{card.icon}</div>
              <p className="ct-info-label">{card.label}</p>
              {card.href ? (
                <a href={card.href} className="ct-info-primary">{card.primary}</a>
              ) : (
                <p className="ct-info-primary">{card.primary}</p>
              )}
              <p className="ct-info-secondary">{card.secondary}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Form section ── */}
      <div className="ct-form-section">
        <div className="container ct-form-layout">

          {/* Left: form */}
          <div className="ct-form-col">
            <p className="eyebrow">Send a Message</p>
            <h2 className="ct-form-heading">Tell us about your requirements</h2>

            <div className="ct-min-order">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <circle cx="10" cy="10" r="9" />
                <path d="M10 6v4.5M10 13.5h.01" strokeLinecap="round" />
              </svg>
              Minimum Order Value: GBP 5,000
            </div>

            {submitted ? (
              <div className="ct-success">
                <div className="ct-success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="ct-submit" onClick={() => setSubmitted(false)}>Send Another</button>
              </div>
            ) : (
              <form className="ct-form" onSubmit={handleSubmit} noValidate>
                <div className="ct-field-row">
                  <div className="ct-field">
                    <label htmlFor="fullName">Full Name <span>*</span></label>
                    <input id="fullName" type="text" placeholder="John Smith" required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="email">Email Address <span>*</span></label>
                    <input id="email" type="email" placeholder="john@company.com" required />
                  </div>
                </div>

                <div className="ct-field-row">
                  <div className="ct-field">
                    <label htmlFor="company">Company Name <span>*</span></label>
                    <input id="company" type="text" placeholder="Your Company Ltd" required />
                  </div>
                  <div className="ct-field">
                    <label htmlFor="phone">Phone Number <span>*</span></label>
                    <input id="phone" type="tel" placeholder="+1 234 567 890" required />
                  </div>
                </div>

                <div className="ct-field">
                  <label>Quantity Required <span>*</span></label>
                  <div className="ct-check-grid">
                    {["Cases", "Pallet", "20 FT Container", "40 FT Container"].map((opt) => (
                      <label key={opt} className={`ct-check${qty.includes(opt) ? " ct-check-on" : ""}`}>
                        <input
                          type="checkbox"
                          checked={qty.includes(opt)}
                          onChange={() => toggleCheck(setQty, qty, opt)}
                        />
                        <span className="ct-checkmark" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="ct-field">
                  <label>Preferred Contact Method <span>*</span></label>
                  <div className="ct-check-grid ct-check-grid-2">
                    {["Email", "Phone Call", "WhatsApp"].map((opt) => (
                      <label key={opt} className={`ct-check${contact.includes(opt) ? " ct-check-on" : ""}`}>
                        <input
                          type="checkbox"
                          checked={contact.includes(opt)}
                          onChange={() => toggleCheck(setContact, contact, opt)}
                        />
                        <span className="ct-checkmark" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="ct-field">
                  <label htmlFor="message">Message <span>*</span></label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Please provide details about your requirements — product types, quantities, destination country…"
                    required
                  />
                </div>

                <button type="submit" className="ct-submit">
                  Send Enquiry
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Right: sidebar */}
          <div className="ct-sidebar">
            <div className="ct-sidebar-card">
              <div className="ct-sidebar-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Why Work With Us?</h3>
              <ul className="ct-sidebar-list">
                <li>
                  <span className="ct-list-dot" />
                  Competitive UK pricing on all SKUs
                </li>
                <li>
                  <span className="ct-list-dot" />
                  Dedicated account manager for every client
                </li>
                <li>
                  <span className="ct-list-dot" />
                  Full container or mixed pallet options
                </li>
                <li>
                  <span className="ct-list-dot" />
                  Fast turnaround — most orders ship within 5 days
                </li>
              </ul>
            </div>

            <div className="ct-sidebar-card ct-sidebar-card-alt">
              <p className="ct-sidebar-alt-label">Direct Enquiry</p>
              <p className="ct-sidebar-alt-text">
                Prefer to talk? Call or email our sales team directly.
              </p>
              <a href="tel:+441923250086" className="ct-direct-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +44 1923 250086
              </a>
              <a href="mailto:offers@zdistribution.com" className="ct-direct-btn ct-direct-btn-outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
