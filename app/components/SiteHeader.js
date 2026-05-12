import Link from "next/link";

export default function SiteHeader() {
  return (
    <>
      <header className="topbar">
        <div className="container topbar-inner">
          <p>+44 1923 250086 | offers@zdistribution.com</p>
          <p>London, United Kingdom</p>
        </div>
      </header>

      <nav className="navbar container">
        <Link href="/" className="brand brand-with-site-logo">
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
        <div className="navlinks">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>
    </>
  );
}
