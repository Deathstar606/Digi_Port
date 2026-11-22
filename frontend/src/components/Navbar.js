import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import logo from "../images/Digixwhitelogo.png";

export const Burger = ({ handleOrdPage, linkClick }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 375
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = windowWidth < 640 ? "78vw" : "380px";

  const drawerLinks = [
    { label: "About Us", target: "aboutus" },
    { label: "Case Studies", target: "casestu" },
    { label: "Services", target: "services" },
    { label: "Contact", target: "contact" },
  ];

  return (
    <motion.div
      onClick={handleOrdPage}
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        style={{
          backgroundColor: "#0c0c0c",
          color: "#ffffff",
          width: sidebarWidth,
          height: "100vh",
          borderLeft: "3px solid #f1593a",
          borderRadius: 0,
          boxShadow: "-12px 0 40px rgba(0, 0, 0, 0.7)",
          position: "fixed",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "24px",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingBottom: "20px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <img
              src={logo}
              alt="DIGIX"
              style={{ height: "26px", width: "auto", objectFit: "contain" }}
            />
            <button
              type="button"
              onClick={handleOrdPage}
              aria-label="Close menu"
              style={{
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 0,
                color: "#ffffff",
                width: "36px",
                height: "36px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FaTimes size={15} />
            </button>
          </div>

          <ul style={{ padding: 0, listStyleType: "none", marginTop: "24px" }}>
            {drawerLinks.map((item, idx) => (
              <li
                key={item.target}
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <button
                  type="button"
                  onClick={() => linkClick(item.target)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    borderRadius: 0,
                    padding: "18px 4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "#ffffff",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    textAlign: "left",
                    cursor: "pointer",
                  }}
                >
                  <span>{item.label}</span>
                  <span style={{ color: "#f1593a", fontSize: "0.75rem", fontWeight: 700 }}>
                    0{idx + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            paddingTop: "18px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "0.72rem",
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.45)",
            }}
          >
            Driven by Relationships &amp; Results
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToElement = (targetId) => {
    if (targetId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(targetId);
    if (element) {
      const offset = targetId === "contact" ? 0 : 88;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - offset),
        behavior: "smooth",
      });
    }
  };

  function handleClick(targetId) {
    setIsOpen(false);
    if (targetId === "contact") {
      scrollToElement("contact");
      return;
    }
    if (location.pathname !== "/home") {
      setScrollTarget(targetId);
      navigate("/home");
    } else {
      scrollToElement(targetId);
    }
  }

  useEffect(() => {
    if (location.pathname === "/home" && scrollTarget) {
      const timer = setTimeout(() => {
        scrollToElement(scrollTarget);
        setScrollTarget(null);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, scrollTarget]);

  const burgerToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname !== "/home") {
      navigate("/home");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="site-navbar-wrap">
      <nav
        aria-label="Primary Navigation"
        className={`nav-c ${scrolled ? "nav-scrolled" : ""}`}
      >
        <div className="nav-inner">
          <a
            href="#/home"
            onClick={handleBrandClick}
            aria-label="DIGIX Home"
            style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
          >
            <img className="logo" src={logo} alt="DIGIX" />
          </a>

          <div className="nav-desktop-links">
            <a
              href="#aboutus"
              className="nav-ele"
              onClick={(e) => {
                e.preventDefault();
                handleClick("aboutus");
              }}
            >
              About Us
            </a>
            <a
              href="#casestu"
              className="nav-ele"
              onClick={(e) => {
                e.preventDefault();
                handleClick("casestu");
              }}
            >
              Case Studies
            </a>
            <a
              href="#services"
              className="nav-ele"
              onClick={(e) => {
                e.preventDefault();
                handleClick("services");
              }}
            >
              Services
            </a>
            <a
              href="#contact"
              className="nav-cta-btn"
              onClick={(e) => {
                e.preventDefault();
                handleClick("contact");
              }}
            >
              Get in Touch
            </a>
          </div>

          <button
            type="button"
            onClick={burgerToggle}
            className="nav-burger-btn"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
          >
            <span
              style={{
                width: "24px",
                height: "2px",
                backgroundColor: "#ffffff",
                display: "block",
              }}
            />
            <span
              style={{
                width: "16px",
                height: "2px",
                backgroundColor: "#f1593a",
                display: "block",
              }}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <Burger handleOrdPage={burgerToggle} linkClick={handleClick} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
