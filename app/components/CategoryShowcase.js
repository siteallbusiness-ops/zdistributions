import Link from "next/link";
import products from "../../data/products.json";

const CATEGORY_META = {
  GROCERY:          { icon: "🛒", color: ["#1a4a30", "#2f6f56"], desc: "Ambient staples & everyday essentials" },
  CONFECTIONERY:    { icon: "🍫", color: ["#5a1a30", "#9f3455"], desc: "Chocolate, sweets & seasonal treats" },
  DRINKS:           { icon: "🥤", color: ["#1a2a5a", "#2f4a9f"], desc: "Soft drinks, juices & energy drinks" },
  SNACKS:           { icon: "🍿", color: ["#5a2a10", "#9f5030"], desc: "Crisps, nuts & on-the-go nibbles" },
  "PERSONAL CARE":  { icon: "🧴", color: ["#3a1a5a", "#6030a0"], desc: "Health, beauty & hygiene" },
  HOUSEHOLD:        { icon: "🏠", color: ["#1a4a5a", "#2f7a90"], desc: "Cleaning & home essentials" },
  "HOT DRINKS":     { icon: "☕", color: ["#3a2010", "#704020"], desc: "Tea, coffee & hot beverages" },
  "PET CARE":       { icon: "🐾", color: ["#1a4a1a", "#3a7a3a"], desc: "Food & care for pets" },
  "BABY & TODDLER": { icon: "👶", color: ["#4a3a10", "#806820"], desc: "Baby food & essentials" },
};

const ORDER = [
  "GROCERY", "CONFECTIONERY", "DRINKS", "SNACKS",
  "PERSONAL CARE", "HOUSEHOLD", "HOT DRINKS",
  "PET CARE", "BABY & TODDLER",
];

function buildCategories() {
  const counts = {};
  for (const item of products) {
    if (!item.category) continue;
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  return ORDER
    .filter((name) => counts[name])
    .map((name) => ({
      name,
      count: counts[name] || 0,
      ...CATEGORY_META[name],
    }));
}

const categories = buildCategories();

export default function CategoryShowcase() {
  return (
    <section id="products" className="section cat-showcase">
      <div className="container">
        <div className="cat-header">
          <div>
            <p className="eyebrow">Product Categories</p>
            <h2>Explore Our Full Range</h2>
          </div>
          <Link href="/products" className="cat-view-all">
            View all products →
          </Link>
        </div>

        <div className="cat-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="cat-card"
            >
              <div
                className="cat-card-bg"
                style={{ background: `linear-gradient(145deg, ${cat.color[0]}, ${cat.color[1]})` }}
              />
              <div className="cat-card-dots" />

              <div className="cat-card-body">
                <span className="cat-icon" role="img" aria-hidden="true">{cat.icon}</span>
                <h3 className="cat-name">{cat.name}</h3>
                <p className="cat-desc">{cat.desc}</p>
                <span className="cat-count">{cat.count.toLocaleString()}+ products</span>
              </div>

              <span className="cat-cta">
                Shop now
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <line x1="3" y1="8" x2="13" y2="8" />
                  <polyline points="9 4 13 8 9 12" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
