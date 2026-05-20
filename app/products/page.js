import Link from "next/link";
import products from "../../data/products.json";
import { SALES_EMAIL } from "../../lib/contact";
import ProductImage from "../components/ProductImage";

const DEFAULT_PER_PAGE = 30;
const PER_PAGE_OPTIONS = [30, 60, 90];
const QUICK_FILTERS = ["PROMOTION", "NEW", "PMP", "NPMP"];

function normalizeParams(params) {
  const query = (params?.q ?? "").trim().toLowerCase();
  const category = (params?.category ?? "").trim();
  const categoryKey = category.toUpperCase();
  const quick = (params?.quick ?? "").trim().toUpperCase();
  const perPageChoice = Number(params?.perPage ?? DEFAULT_PER_PAGE) || DEFAULT_PER_PAGE;
  const perPage = PER_PAGE_OPTIONS.includes(perPageChoice) ? perPageChoice : DEFAULT_PER_PAGE;
  const page = Math.max(1, Number(params?.page ?? 1) || 1);
  return { query, category, categoryKey, quick, perPage, page };
}

function getFilteredProducts(params) {
  const { query, category, categoryKey, quick, perPage, page } = normalizeParams(params);
  const filtered = products.filter((product) => {
    if (category && (product.category ?? "").toUpperCase() !== categoryKey) return false;
    if (quick === "PROMOTION" && !(Number(product.discount) > 0)) return false;
    if (quick === "NEW" && !product.isNPD) return false;
    if (quick === "PMP" && !product.isPMP) return false;
    if (quick === "NPMP" && product.isPMP) return false;
    if (!query) return true;
    const bag = `${product.name} ${product.brand} ${product.sku} ${product.subCategory} ${product.childCategory}`.toLowerCase();
    return bag.includes(query);
  });
  return { filtered, page, query, category, quick, perPage };
}

function formatPrice() {
  return "Contact for price";
}

export default async function ProductsPage({ searchParams }) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const { filtered, page, query, category, quick, perPage } = getFilteredProducts(resolvedSearchParams);
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);
  const showingFrom = filtered.length ? start + 1 : 0;
  const showingTo = start + pageItems.length;

  const baseParams = new URLSearchParams();
  if (query) baseParams.set("q", query);
  if (category) baseParams.set("category", category);
  if (quick) baseParams.set("quick", quick);
  if (perPage !== DEFAULT_PER_PAGE) baseParams.set("perPage", String(perPage));

  const getPageHref = (targetPage) => {
    const p = new URLSearchParams(baseParams.toString());
    p.set("page", String(targetPage));
    return `/products?${p.toString()}`;
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2)
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const clearParams = new URLSearchParams();
  if (perPage !== DEFAULT_PER_PAGE) clearParams.set("perPage", String(perPage));
  const clearHref = `/products${clearParams.toString() ? `?${clearParams.toString()}` : ""}`;
  const hasActiveFilter = !!(query || category || quick);
  const visiblePages = getVisiblePages();

  return (
    <main>
      {/* ── Hero ── */}
      <div className="prod-hero">
        <div className="container prod-hero-inner">
          <div>
            <p className="prod-kicker">Z Distribution Trade Desk</p>
            <h1> Wholesale Catalogue</h1>
            <p className="prod-hero-sub">
              Trade-ready British &amp; European goods · Direct inquiry · Bulk pricing
            </p>
          </div>
          <div className="prod-hero-stats">
            <div className="prod-hero-stat">
              <strong>{filtered.length.toLocaleString()}</strong>
              <span>Products</span>
            </div>
            <div className="prod-hero-stat">
              <strong>{categories.length}</strong>
              <span>Categories</span>
            </div>
            <div className="prod-hero-stat">
              <strong>GBP 5K</strong>
              <span>Min. Order</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container prod-body">
        {/* ── Category chips ── */}
        <div className="prod-cat-chips">
          <Link href="/products" className={`prod-chip${!category ? " prod-chip-active" : ""}`}>
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${encodeURIComponent(cat)}`}
              className={`prod-chip${category.toUpperCase() === cat ? " prod-chip-active" : ""}`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* ── Filter bar ── */}
        <form method="get" className="pf-bar">
          <input type="hidden" name="page" value="1" />

          {/* Search */}
          <div className="pf-search-wrap">
            <svg className="pf-si" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search products, brands, SKU…"
            />
          </div>

          <div className="pf-sep" aria-hidden="true" />

          {/* Selects */}
          <select name="category" defaultValue={category} className="pf-select" aria-label="Category">
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select name="quick" defaultValue={quick} className="pf-select" aria-label="Quick filter">
            <option value="">Quick Filter</option>
            {QUICK_FILTERS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>

          <select name="perPage" defaultValue={String(perPage)} className="pf-select pf-select-sm" aria-label="Per page">
            {PER_PAGE_OPTIONS.map((v) => (
              <option key={v} value={String(v)}>{v} / pg</option>
            ))}
          </select>

          {/* Search icon button */}
          <button type="submit" className="pf-apply" aria-label="Apply filters">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </button>

          {/* Clear icon button */}
          <Link href={clearHref} className={`pf-clear${hasActiveFilter ? " pf-clear-active" : ""}`} aria-label="Clear all filters">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Link>
        </form>

        {/* ── Meta row ── */}
        <div className="prod-meta-row">
          <div className="prod-notice-inline">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle cx="10" cy="10" r="9" />
              <path d="M10 6v4.5M10 13.5h.01" strokeLinecap="round" />
            </svg>
            Min. order GBP 5,000 · Prices EXW UK · excl. VAT
          </div>
          <span className="prod-result-info">
            Showing {showingFrom}–{showingTo} of {filtered.length.toLocaleString()}
            {hasActiveFilter && (
              <Link href={clearHref} className="prod-clear-link"> · Clear filters ×</Link>
            )}
          </span>
        </div>

        {/* ── Product grid ── */}
        <div className="pc-grid">
          {pageItems.map((item) => (
            <article className="pc-card" key={item.id}>
              <div className="pc-img-wrap">
                <ProductImage src={item.imageUrl} alt={item.name} restricted={Boolean(item.isRestricted)} />
                {item.isRestricted && (
                  <div className="pc-restricted-badge">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    Restricted
                  </div>
                )}
              </div>

              <div className="pc-info">
                {item.brand && <p className="pc-brand">{item.brand}</p>}
                <h3 className="pc-name">{item.name}</h3>
                <p className="pc-price">{formatPrice()}</p>
                <div className="pc-actions">
                  <Link href="/login" className="pc-btn pc-btn-login">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16 10V8a4 4 0 0 0-8 0v2" />
                      <rect x="5" y="10" width="14" height="10" rx="2" />
                      <circle cx="12" cy="15" r="1.3" />
                    </svg>
                    Order
                  </Link>
                  <a href={`mailto:${SALES_EMAIL}`} className="pc-btn pc-btn-inquiry">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                      <path d="M4.5 7l7.5 6 7.5-6" />
                    </svg>
                    Enquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── Pagination ── */}
        <div className="prod-pagination">
          {currentPage === 1 ? (
            <span className="prod-pg-btn prod-pg-nav prod-pg-disabled">
              First
            </span>
          ) : (
            <Link href={getPageHref(1)} className="prod-pg-btn prod-pg-nav">
              First
            </Link>
          )}

          {currentPage === 1 ? (
            <span className="prod-pg-btn prod-pg-nav prod-pg-disabled">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
              Prev
            </span>
          ) : (
            <Link href={getPageHref(currentPage - 1)} className="prod-pg-btn prod-pg-nav">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5"/></svg>
              Prev
            </Link>
          )}

          {visiblePages.map((num) => (
            <Link
              key={num}
              href={getPageHref(num)}
              className={`prod-pg-btn prod-pg-num${num === currentPage ? " prod-pg-active" : ""}`}
            >
              {num}
            </Link>
          ))}

          <span className="prod-pg-info">
            {currentPage} / {totalPages}
          </span>

          {currentPage === totalPages ? (
            <span className="prod-pg-btn prod-pg-nav prod-pg-disabled">
              Next
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
            </span>
          ) : (
            <Link href={getPageHref(currentPage + 1)} className="prod-pg-btn prod-pg-nav">
              Next
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
            </Link>
          )}

          {currentPage === totalPages ? (
            <span className="prod-pg-btn prod-pg-nav prod-pg-disabled">
              Last
            </span>
          ) : (
            <Link href={getPageHref(totalPages)} className="prod-pg-btn prod-pg-nav">
              Last
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
