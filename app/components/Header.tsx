import React, { useState } from "react";
import "../globals.css";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const basePath = process.env.NODE_ENV === 'production' ? '/oss_catalog' : '';
  return (
  <header className="site-header">
  <Link href={basePath + "/"} className="site-header-logo">
  <span className="site-header-divider"></span>
  <h1 className="site-header-title">Open Source Projects</h1>
      </Link>
  <div className="site-header-nav site-header-nav-desktop">
  <a href="https://github.com/company" className="site-header-link">COMPANY GITHUB</a>
  <a href="mailto:opensource@company.com" className="site-header-link">CONTACT US</a>
      </div>
      <button
  className="site-header-hamburger"
        aria-label="Open menu"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "1.2rem",
          cursor: "pointer"
        }}
      >
        &#9776;
      </button>
      {menuOpen && (
  <div className="site-header-menu">
          <a href="https://github.com/company" className="site-header-link">COMPANY GITHUB</a>
          <a href="mailto:opensource@company.com" className="site-header-link">CONTACT US</a>
        </div>
      )}
    </header>
  );
}
