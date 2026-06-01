"use client";

import { useState } from "react";
import Link from "next/link";
import { ADDRESS_LOCATION_SHORT, PURCHASES_EMAIL, SALES_EMAIL } from "../../lib/contact";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <p>
            0161 821 0615 |{" "}
            <a href={`mailto:${SALES_EMAIL}`}>{SALES_EMAIL}</a> ·{" "}
            <a href={`mailto:${PURCHASES_EMAIL}`}>{PURCHASES_EMAIL}</a>
          </p>
          <p>{ADDRESS_LOCATION_SHORT}</p>
        </div>
      </header>

      <nav className="navbar container">
        <Link href="/" className="brand brand-with-site-logo" onClick={() => setOpen(false)}>
          <img
            src="/logo-z-distribution.png"
            alt="Z Distribution"
            width={260}
            height={70}
            className="site-logo site-logo--header"
          />
          <div>
            <p>Wholesale</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="navlinks">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className={`nav-hamburger ${open ? "is-open" : ""}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="mobile-nav-overlay" onClick={() => setOpen(false)}>
          <div className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
            <div className="mobile-nav-links">
              <Link href="/"        onClick={() => setOpen(false)}>Home</Link>
              <Link href="/about"   onClick={() => setOpen(false)}>About</Link>
              <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <Link href="/login"   onClick={() => setOpen(false)}>Login</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
