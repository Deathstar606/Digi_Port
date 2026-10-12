import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaExpand,
  FaExternalLinkAlt,
  FaChevronDown,
  FaTimes,
} from "react-icons/fa";

function CaseDeats(props) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isTheaterOpen, setIsTheaterOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (props.case) {
    return (
      <div
        style={{
          backgroundColor: "#000000",
          position: "relative",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {/* DESKTOP MEDIA CONTROL LAYOUT (≥ 768px) */}
        {!isMobile && (
          <div
            style={{
              position: "fixed",
              top: "48%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "92%",
              maxWidth: "1020px",
              aspectRatio: "16 / 9",
              maxHeight: "75vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.85)",
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              pointerEvents: "auto",
            }}
          >
            <iframe
              src={props.case.video}
              title={props.case.name || "Case Study Video"}
              style={{
                border: "none",
                width: "100%",
                height: "100%",
                display: "block",
                pointerEvents: "auto",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>
        )}

        {/* MOBILE ALTERNATIVE MEDIA CONTROL LAYOUT (< 768px) */}
        {isMobile && (
          <div
            style={{
              position: "fixed",
              top: "43%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "94%",
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            {/* Mobile Video Frame with Rounded Edges */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.85)",
                backgroundColor: "#000000",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            >
              <iframe
                src={props.case.video}
                title={props.case.name || "Mobile Case Video"}
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                  display: "block",
                  pointerEvents: "auto",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Alternative Mobile Media Control Dock */}
            <div
              style={{
                marginTop: "14px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setIsTheaterOpen(true)}
                style={{
                  backgroundColor: "#F1593A",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "7px 15px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(241, 89, 58, 0.35)",
                }}
                aria-label="Open Theater Fullscreen Mode"
              >
                <FaExpand size={11} />
                <span>Theater Mode</span>
              </button>

              <a
                href={props.case.video}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  padding: "7px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <FaExternalLinkAlt size={10} />
                <span>Drive App</span>
              </a>

              <button
                onClick={() => {
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  });
                }}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  padding: "7px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  cursor: "pointer",
                }}
              >
                <FaChevronDown size={10} />
                <span>Details</span>
              </button>
            </div>
          </div>
        )}

        {/* FULLSCREEN THEATER OVERLAY FOR MOBILE (Allows full-width media controls without cutoff) */}
        {isTheaterOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.98)",
              zIndex: 999999,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "16px",
            }}
          >
            {/* Top Bar with Case Title & Close Button */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "75%",
                }}
              >
                {props.case.name}
              </span>
              <button
                onClick={() => setIsTheaterOpen(false)}
                style={{
                  backgroundColor: "rgba(241, 89, 58, 0.9)",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                <FaTimes size={12} />
                <span>Close</span>
              </button>
            </div>

            {/* Maximized Full-Width Video Player */}
            <div
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 9",
                maxHeight: "75vh",
                borderRadius: "12px",
                overflow: "hidden",
                backgroundColor: "#000000",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <iframe
                src={props.case.video}
                title={props.case.name || "Theater Video Player"}
                style={{
                  border: "none",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            </div>

            {/* Bottom Helper Hint */}
            <div style={{ textAlign: "center", paddingBottom: "8px" }}>
              <span style={{ color: "#aaaaaa", fontSize: "0.75rem" }}>
                Rotate device to landscape for full screen experience
              </span>
            </div>
          </div>
        )}

        {/* SCROLL CUE INDICATOR (Visible on both desktop & mobile in fold 1) */}
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            pointerEvents: "none",
          }}
        >
          <span>Scroll for details</span>
          <span style={{ fontSize: "15px" }}>↓</span>
        </div>

        {/* PARALLAX SLIDE-UP CONTENT SECTION (Maintained on both desktop & mobile) */}
        <div
          style={{
            marginTop: "100vh",
            position: "relative",
            backgroundColor: "#ffffff",
            zIndex: 2,
            borderRadius: isMobile ? "28px 28px 0 0" : "32px 32px 0 0",
            boxShadow: "0 -15px 45px rgba(0, 0, 0, 0.6)",
            padding: isMobile
              ? "45px 20px 60px 20px"
              : "clamp(50px, 6vw, 90px) clamp(30px, 8vw, 150px)",
            minHeight: "50vh",
          }}
        >
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {/* Header Badge */}
            <div style={{ marginBottom: "16px" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "2px",
                  color: "#F1593A",
                  textTransform: "uppercase",
                  backgroundColor: "rgba(241, 89, 58, 0.12)",
                  padding: "5px 16px",
                  borderRadius: "20px",
                }}
              >
                Case Study
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile
                  ? "clamp(1.5rem, 6vw, 2.2rem)"
                  : "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 800,
                lineHeight: 1.25,
                letterSpacing: "-0.5px",
                color: "#111111",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {props.case.name}
            </h1>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                marginTop: "20px",
                fontSize: isMobile ? "0.95rem" : "1.05rem",
                lineHeight: 1.85,
                color: "#555555",
                fontWeight: 400,
              }}
            >
              {props.case.description}
            </p>

            <div className="mt-4 pt-2">
              <Link
                to="/home"
                className="butt"
                style={{
                  textDecoration: "none",
                  display: "inline-block",
                  fontSize: "14px",
                  padding: "8px 24px",
                }}
              >
                ← Back to Case Studies
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseDeats;