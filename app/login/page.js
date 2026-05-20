import { PURCHASES_EMAIL, SALES_EMAIL } from "../../lib/contact";

export default function LoginPage() {
  return (
    <main className="login-root">
      {/* ── Left: Brand panel ── */}
      <aside className="login-brand">
        <div className="login-brand-glow" />
        <div className="login-brand-dots" />

        <div className="login-brand-inner">
          <div className="login-brand-logo">
            <img
              src="/logo-z-distribution.png"
              alt="Z Distribution"
              width={280}
              height={76}
              className="site-logo site-logo--login"
            />
            <div>
              <p>Wholesale Partner</p>
            </div>
          </div>

          <div className="login-brand-hero">
            <h2>Your gateway to global  distribution</h2>
            <p>
              Access exclusive wholesale pricing, manage orders, track shipments, and stay updated on
              the latest promotions — all from one place.
            </p>
          </div>

          <div className="login-brand-stats">
            <div className="login-stat">
              <strong>20,000+</strong>
              <span>Products</span>
            </div>
            <div className="login-stat">
              <strong>100+</strong>
              <span>Brands</span>
            </div>
            <div className="login-stat">
              <strong>8+</strong>
              <span>Categories</span>
            </div>
          </div>

          <blockquote className="login-testimonial">
            <p>
              &ldquo;Z Distribution has been our go-to wholesale partner for 3 years. Reliable, fast and
              always competitive on price.&rdquo;
            </p>
            <footer>— A. Rahman, Gulf Distributors Ltd</footer>
          </blockquote>
        </div>
      </aside>

      {/* ── Right: Form panel ── */}
      <div className="login-form-panel">
        <div className="login-form-wrap2">
          <div className="login-form-head">
            <h1>Welcome back</h1>
            <p>Sign in to your wholesale account</p>
          </div>

          <form className="login-form2">
            <div className="lf-field">
              <label htmlFor="email">Email or Account No.</label>
              <div className="lf-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 7 10-7" />
                </svg>
                <input id="email" type="text" placeholder="you@company.com" autoComplete="email" />
              </div>
            </div>

            <div className="lf-field">
              <div className="lf-field-row">
                <label htmlFor="password">Password</label>
                <a href="#" className="lf-forgot">Forgot password?</a>
              </div>
              <div className="lf-input-wrap">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input id="password" type="password" placeholder="••••••••" autoComplete="current-password" />
              </div>
            </div>

            <button type="submit" className="lf-submit">Sign In</button>
          </form>

          <p className="lf-signup-link">
            New to Z Distribution?{" "}
            <a href="/signup">Request an account</a>
          </p>

          <div className="lf-divider">
            <span>or contact us directly</span>
          </div>

          <a href={`mailto:${SALES_EMAIL}`} className="lf-email-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
            {SALES_EMAIL}
          </a>
          <a href={`mailto:${PURCHASES_EMAIL}`} className="lf-email-btn lf-email-btn-secondary">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
            {PURCHASES_EMAIL}
          </a>
        </div>
      </div>
    </main>
  );
}
