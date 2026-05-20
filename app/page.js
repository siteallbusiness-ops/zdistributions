import HeroBannerSlider from "./components/HeroBannerSlider";
import AboutSection from "./components/AboutSection";
import CategoryShowcase from "./components/CategoryShowcase";
import ProductImageTicker from "./components/ProductImageTicker";
import { SALES_EMAIL } from "../lib/contact";

export default function Home() {
  return (
    <main>
      <section className="hero-fullscreen">
        <HeroBannerSlider />
      </section>

      <section className="ticker-band" aria-label="moving announcement">
        <div className="ticker-track">
          <span>◆ TRUSTED WHOLESALE & DISTRIBUTOR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>◆ TRUSTED WHOLESALER & DISTRIBUTOR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
           <span>◆ TRUSTED WHOLESALER & DISTRIBUTOR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          
          
        </div>
      </section
>
      <AboutSection />
      <section className="section features-section">
        <div className="container">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="features-heading">Built for National trade, trusted by partners</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3>National Reach</h3>
              <p>We distribute to all corners of United Kingdom backed by a network of trusted logistics partners.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h3>Branded Portfolio</h3>
              <p>Access 20,000+ SKUs from the UK&apos;s most recognised  brands at competitive wholesale prices.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h3>Reliable Logistics</h3>
              <p>End-to-end Onloading and Offloading services for seamless distribution.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Competitive Margins</h3>
              <p>Strong purchasing power means better deals for you — with transparent pricing and no hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="section brands-section">
        <div className="container">
          <p className="brands-label">Trusted Brands We Supply</p>
          <div className="brands-marquee">
            {["Cadbury","Walkers","Heinz","PG Tips","Nescafé","Kellogg's","Ribena","Lucozade",
              "Hovis","Mr Kipling","Bisto","Bovril","Tetley","Persil","Fairy","Dettol","Lynx","Dove"].map((brand) => (
              <span className="brand-pill" key={brand}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      <CategoryShowcase />

      <section className="shipping-animation-section">
        <div className="shipping-animation-bg">
          <img
            src="https://www.premierexports.co.uk/_next/image?url=%2Fship-two.png&w=750&q=75"
            alt="Cargo ship"
            className="moving-ship"
          />
          <img
            src="https://www.premierexports.co.uk/_next/image?url=%2Fship-two.png&w=750&q=75"
            alt="Cargo ship"
            className="moving-ship second"
          />
          <img
            src="https://www.premierexports.co.uk/_next/image?url=%2Ftruck-two.png&w=1080&q=75"
            alt="Delivery truck"
            className="moving-truck"
          />
          <img
            src="https://www.premierexports.co.uk/_next/image?url=%2Ftruck-two.png&w=1080&q=75"
            alt="Delivery truck"
            className="moving-truck second"
          />
        </div>
      </section>

      <ProductImageTicker />

      {/* Ordering Portal */}
      <section id="contact" className="section section-alt">
        <div className="container ordering-portal-v2">
          <div className="ordering-portal-copy">
            <p className="eyebrow">Product Ordering Portal</p>
            <h2>Get the best deals from our latest promotions</h2>
            <p className="ordering-subtext">
              Use our online ordering platform to access exclusive wholesale pricing, manage your orders, and stay
              updated on the latest promotions from our catalogue.
            </p>
            <a href={`mailto:${SALES_EMAIL}`} className="portal-cta">
              Contact Sales Team
            </a>
          </div>

          <div className="ordering-portal-visual">
            <div className="ordering-stat-card">
              <strong>20,000+</strong>
              <span>Products Available</span>
            </div>
            <div className="ordering-stat-card">
              <strong>100+</strong>
              <span>Brands</span>
            </div>
            <div className="ordering-stat-card">
              <strong>8+</strong>
              <span>Categories</span>
            </div>
            <div className="ordering-stat-card ordering-stat-highlight">
              <strong>24/7</strong>
              <span>Support Available</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
