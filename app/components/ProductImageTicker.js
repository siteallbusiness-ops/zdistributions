"use client";

import { useEffect, useMemo, useState } from "react";
import products from "../../data/products.json";

function groupByCategory(limitPerCategory = 8) {
  const map = new Map();

  for (const item of products) {
    if (!item.category || !item.imageUrl) continue;
    if (!map.has(item.category)) map.set(item.category, []);
    const bucket = map.get(item.category);
    if (bucket.length < limitPerCategory) {
      bucket.push({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
      });
    }
  }

  return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
}

export default function ProductImageTicker() {
  const grouped = useMemo(() => groupByCategory(10), []);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + grouped.length) % grouped.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % grouped.length);
  };

  useEffect(() => {
    if (!grouped.length) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % grouped.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [grouped.length]);

  const active = grouped[activeIndex];
  const items = active?.items ?? [];

  return (
    <section className="section product-stage-section">
      <div className="container">
        <div className="stage-heading">
          <p className="eyebrow">Product Discovery</p>
          <h2>Explore Featured Categories</h2>
          <p>Fresh picks updated automatically to highlight your current trading opportunities.</p>
        </div>

        <div className="stage-stats">
          <article>
            <h3>8 +</h3>
            <p>Categories</p>
          </article>
          <article>
            <h3>100+</h3>
            <p>Brands</p>
          </article>
          <article>
            <h3>20,000+</h3>
            <p>Products Available</p>
          </article>
        </div>

        <div className="stage-title-wrap">
          <h2 key={active?.category} className="stage-title ">
            {active?.category || "CATEGORY"} ALL RANGE
          </h2>
          <div className="stage-controls">
            <button type="button" onClick={goToPrevious} aria-label="Previous category">
              &#8592;
            </button>
            <button type="button" onClick={goToNext} aria-label="Next category">
              &#8594;
            </button>
          </div>
        </div>
        <div className="product-stage" key={`stage-${active?.category}`}>
          {items.map((item, idx) => (
            <article
              className="stage-item"
              key={item.id}
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <img src={item.imageUrl} alt={item.name} />
              <p>{item.name}</p>
            </article>
          ))}
        </div>

        <div className="stage-dots">
          {grouped.map((entry, idx) => (
            <button
              key={entry.category}
              type="button"
              className={idx === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Show ${entry.category} range`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
