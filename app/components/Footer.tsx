import React from "react";
import Image from "next/image";
import "../globals.css";

export default function Footer() {
  const [showBar, setShowBar] = React.useState(false);
  return (
    <>
      <div
  className={`site-footer-bar${showBar ? " site-footer-bar-visible" : ""}`}
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => setShowBar(false)}
      >
  <a href="/legal" className="site-footer-link">Legal</a>
  <span className="site-footer-divider">|</span>
  <a href="/accessibility" className="site-footer-link">Site Accessibility</a>
  <span className="site-footer-divider">|</span>
  <a href="#" className="site-footer-link">Access to Information</a>
  <span className="site-footer-divider">|</span>
  <a href="#" className="site-footer-link">Jobs</a>
  <span className="site-footer-divider">|</span>
  <a href="#" className="site-footer-link">Contacts</a>
        <div style={{ flex: 1 }} />
  <a href="#" className="site-footer-link site-footer-report">REPORT FRAUD OR CORRUPTION</a>
      </div>
      <footer
  className="site-footer"
        onMouseEnter={() => setShowBar(true)}
        onMouseLeave={() => setShowBar(false)}
      >
  <div className="site-footer-logo">
          <span className="site-footer-agencies">A Generic Company</span>
        </div>
  <span className="site-footer-copyright">&copy; {new Date().getFullYear()} Company Name, All Rights Reserved</span>
      </footer>
    </>
  );
}
