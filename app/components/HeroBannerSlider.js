import Link from "next/link";

export default function HeroBannerSlider() {
  return (
    <section className="hero-full-section">
      <div className="hero-full-blob hero-full-blob-1" />
      <div className="hero-full-blob hero-full-blob-2" />
      <div className="hero-full-blob hero-full-blob-3" />

      <div className="container hero-full-inner">
        <div className="hero-badge-pill">
          <span>🇬🇧</span>
          <span>UK&apos;s Premier Wholesale Distributor</span>
        </div>

        <h1 className="hero-full-heading">
          British &amp; European Products,<br />
          <span className="hero-full-heading-accent">Delivered Fast</span>
        </h1>

        <p className="hero-full-sub">
          Your trusted partner for branded  distribution across UK —
          confectionery, grocery, commercial.
        </p>

        <div className="hero-full-actions">
          <Link href="/products" className="btn btn-primary hero-full-cta">
            Browse Products
          </Link>
          <Link href="#contact" className="hero-outline-btn">
            Contact Sales →
          </Link>
        </div>

        <div className="hero-usps">
          <span className="hero-usp-pill">✓ Trade-ready documentation</span>
          <span className="hero-usp-pill">✓ GBP 5,000 minimum order</span>
          <span className="hero-usp-pill">✓ Delivered UK Pricing</span>
          <span className="hero-usp-pill">✓ Dedicated account manager</span>
        </div>
      </div>
    </section>
  );
}
