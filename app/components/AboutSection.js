export default function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="split">
          <div className="about-copy">
            <p className="eyebrow">About Z Distribution</p>
            <h2>
              Your <span className="text-highlight">Reliable Partner</span> for Timely and Fast Distribution</h2>
            <p>
              Z Distribution is a fast-growing UK wholesaler and distributor of household and commercial products
              products. We specialize in confectionery, ambient grocery and  commercial products.
            </p>
            <p>
              With strong purchasing power and efficient operations, we help distributors and retailers secure
              known brands with better margins and dependable shipment schedules.
            </p>
          </div>

          <div className="about-visual">
            <img
              src="/about/about-building.png"
              alt="Z Distribution facility"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
