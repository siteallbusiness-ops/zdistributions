import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand brand-with-site-logo footer-brand-logo-row">
            <img
              src="/logo-z-distribution.png"
              alt="Z Distribution"
              width={260}
              height={70}
              className="site-logo site-logo--footer"
            />
            <div>
              <p>Wholesale Partner</p>
            </div>
          </div>
          <p>
            Supplying branded  products worldwide with reliable sourcing, trade documentation, and trade-ready
            logistics support.
          </p>
        </div>

        <div>
          <h5>Quick Links</h5>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/products">Products</Link>
            <Link href="/login">Login</Link>
          </div>
        </div>

        <div>
          <h5>Contact</h5>
          <div className="footer-links">
            <a href="tel:+441923250086">+44 1923 250086</a>
            <a href="mailto:offers@zdistribution.com">offers@zdistribution.com</a>
            <p>Unit 11, Trade City, Kingsway, Luton, Bedfordshire, LU1 1FW</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Z Distribution</span>
          <span>Built for global wholesale trade</span>
        </div>
      </div>
    </footer>
  );
}
