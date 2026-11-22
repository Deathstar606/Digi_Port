import React from "react";
import { motion } from "framer-motion";
import "./Brands.css";

const BRAND_PARTNERS = [
  {
    name: "APEX REALTY",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M4 22L14 5L24 22H18.8L14 13.6L9.2 22H4Z"
          fill="currentColor"
        />
        <rect x="11.5" y="18.5" width="5" height="3.5" className="brand-accent" fill="#f1593a" />
      </svg>
    ),
    fontWeight: 800,
    letterSpacing: "1.8px",
  },
  {
    name: "IRONPULSE",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M3 15H8.2L11.2 7.5L15.2 20.5L18.4 12.5L20.8 15H25"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <circle cx="24" cy="15" r="2" className="brand-accent" fill="#f1593a" />
      </svg>
    ),
    fontWeight: 800,
    letterSpacing: "2px",
  },
  {
    name: "VELA LIVING",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M6 22V13C6 8.58 9.58 5 14 5C18.42 5 22 8.58 22 13V22"
          stroke="currentColor"
          strokeWidth="2.4"
        />
        <path
          d="M10.5 22V14C10.5 12.07 12.07 10.5 14 10.5C15.93 10.5 17.5 12.07 17.5 14V22"
          stroke="currentColor"
          strokeWidth="2.2"
        />
        <line x1="4" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="2.2" />
      </svg>
    ),
    fontWeight: 700,
    letterSpacing: "2.2px",
  },
  {
    name: "NOVAPAY",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="7" width="14" height="14" stroke="currentColor" strokeWidth="2.4" />
        <rect x="10" y="7" width="14" height="14" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="2.4" />
        <rect x="12.5" y="12.5" width="3" height="3" className="brand-accent" fill="#f1593a" />
      </svg>
    ),
    fontWeight: 800,
    letterSpacing: "1.6px",
  },
  {
    name: "STRIDE MOTORS",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M4 9H17L24 14L17 19H4L9.5 14L4 9Z" stroke="currentColor" strokeWidth="2.3" strokeLinejoin="miter" />
        <path d="M12 14H20" stroke="#f1593a" strokeWidth="2.3" />
      </svg>
    ),
    fontWeight: 700,
    letterSpacing: "1.8px",
  },
  {
    name: "KORA STUDIO",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="5" width="7" height="18" fill="currentColor" />
        <path d="M22 5L12.5 14L22 23H16.5L9.5 16V12L16.5 5H22Z" fill="currentColor" />
      </svg>
    ),
    fontWeight: 800,
    letterSpacing: "2.2px",
  },
  {
    name: "NORTHSTAR",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 3L16.8 11.2L25 14L16.8 16.8L14 25L11.2 16.8L3 14L11.2 11.2L14 3Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="miter"
        />
        <circle cx="14" cy="14" r="2.2" fill="#f1593a" />
      </svg>
    ),
    fontWeight: 700,
    letterSpacing: "2px",
  },
  {
    name: "MONOLITH",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="5" height="16" fill="currentColor" />
        <rect x="11.5" y="6" width="5" height="16" fill="currentColor" fillOpacity="0.6" />
        <rect x="19" y="6" width="5" height="16" fill="#f1593a" />
      </svg>
    ),
    fontWeight: 800,
    letterSpacing: "2px",
  },
];

const BrandTrack = ({ prefix }) => (
  <div className="logos-slide" aria-hidden={prefix === "dup"}>
    {BRAND_PARTNERS.map((brand) => (
      <div key={`${prefix}-${brand.name}`} className="brand-lockup">
        {brand.icon}
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.95rem",
            fontWeight: brand.fontWeight,
            letterSpacing: brand.letterSpacing,
          }}
        >
          {brand.name}
        </span>
      </div>
    ))}
  </div>
);

function ShowBrand() {
  return (
    <section id="brand" className="brands-section" aria-label="Brand Partners">
      <div className="brands-layout">
        <motion.div
          className="brands-header"
          initial={{ x: -24, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span
            style={{
              display: "block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "2.4px",
              textTransform: "uppercase",
              color: "#f1593a",
              marginBottom: "4px",
            }}
          >
            Trusted By
          </span>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)",
              fontWeight: 800,
              letterSpacing: "0.6px",
              textTransform: "uppercase",
              color: "#111111",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Brand Partners
          </h2>
        </motion.div>

        <div className="logos">
          <BrandTrack prefix="primary" />
          <BrandTrack prefix="dup" />
        </div>
      </div>
    </section>
  );
}

export default ShowBrand;