import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { getCaseDemoDescription } from "../data/case";

const VIRTUAL_PLAYER_WIDTH = 960;
const VIRTUAL_PLAYER_HEIGHT = 540;

const getAutoplayPreviewUrl = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("autoplay", "1");
    return parsed.toString();
  } catch {
    return url.includes("?") ? `${url}&autoplay=1` : `${url}?autoplay=1`;
  }
};

function CaseDeats(props) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);
  const [mobileBoxWidth, setMobileBoxWidth] = useState(
    typeof window !== "undefined" ? Math.max(280, window.innerWidth - 28) : 347
  );
  const mobilePlayerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || !mobilePlayerRef.current) return;
    const node = mobilePlayerRef.current;
    const updateWidth = () => {
      if (node.clientWidth > 0) {
        setMobileBoxWidth(node.clientWidth);
      }
    };
    updateWidth();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(updateWidth);
      observer.observe(node);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [isMobile, props.case?._id]);

  useEffect(() => {
    setIsMobilePlaying(false);
  }, [props.case?._id]);

  if (!props.case) {
    return null;
  }

  const descriptionText = getCaseDemoDescription(props.case);
  const needsVirtualScale = mobileBoxWidth < VIRTUAL_PLAYER_WIDTH;
  const iframeScale = needsVirtualScale
    ? mobileBoxWidth / VIRTUAL_PLAYER_WIDTH
    : 1;

  if (isMobile) {
    return (
      <div
        style={{
          backgroundColor: "#0a0a0a",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        {/* Full 100vh mobile cinema showcase */}
        <div
          className="case-mobile-stage"
          style={{
            position: "relative",
            backgroundColor: "#0a0a0a",
            paddingTop: "76px",
            paddingLeft: "14px",
            paddingRight: "14px",
            paddingBottom: "52px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "18px",
            boxSizing: "border-box",
          }}
        >
          {/* Compact top title grouped directly above the player */}
          <div style={{ paddingLeft: "2px", paddingRight: "2px" }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "2.2px",
                color: "#F1593A",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Case Study
            </span>
            <h1
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(1.25rem, 5.5vw, 1.65rem)",
                fontWeight: 800,
                lineHeight: 1.22,
                letterSpacing: "-0.2px",
                color: "#ffffff",
                margin: 0,
                textTransform: "uppercase",
              }}
            >
              {props.case.name}
            </h1>
          </div>

          {/* 16:9 player container centered cleanly in the 100vh viewport */}
          <div
            ref={mobilePlayerRef}
            style={{
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              position: "relative",
              borderRadius: "12px",
              clipPath: "inset(0 round 12px)",
              overflow: "hidden",
              transform: "translateZ(0)",
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              boxShadow: "0 18px 46px rgba(0, 0, 0, 0.85)",
            }}
          >
            {!isMobilePlaying ? (
              <button
                type="button"
                onClick={() => setIsMobilePlaying(true)}
                aria-label={`Play ${props.case.name || "case study"} video`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  padding: 0,
                  border: "none",
                  backgroundColor: "#000000",
                  cursor: "pointer",
                  display: "block",
                }}
              >
                {props.case.image && (
                  <img
                    src={props.case.image}
                    alt={props.case.name || "Case study preview"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      filter: "brightness(0.68)",
                    }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "radial-gradient(circle at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.62) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    backgroundColor: "#F1593A",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 30px rgba(241, 89, 58, 0.55)",
                    pointerEvents: "none",
                  }}
                >
                  <FaPlay size={20} style={{ marginLeft: "4px" }} />
                </div>
              </button>
            ) : (
              <iframe
                src={getAutoplayPreviewUrl(props.case.video)}
                title={props.case.name || "Case Study Video"}
                style={
                  needsVirtualScale
                    ? {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: `${VIRTUAL_PLAYER_WIDTH}px`,
                        height: `${VIRTUAL_PLAYER_HEIGHT}px`,
                        border: "none",
                        display: "block",
                        transform: `scale(${iframeScale})`,
                        transformOrigin: "top left",
                      }
                    : {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        border: "none",
                        display: "block",
                      }
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
              />
            )}
          </div>

          {/* Subtle scroll indicator anchored at bottom of the 100vh stage */}
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: 0,
              right: 0,
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.65)",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              pointerEvents: "none",
            }}
          >
            Scroll for details ↓
          </div>
        </div>

        {/* Clean details sheet below the 100vh mobile stage */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px 20px 0 0",
            padding: "32px 20px 44px 20px",
          }}
        >
          <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
            <span
              style={{
                display: "inline-block",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "2px",
                color: "#F1593A",
                textTransform: "uppercase",
                marginBottom: "10px",
              }}
            >
              Project Overview
            </span>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                color: "#4a4a4a",
                margin: "0 0 28px 0",
                fontWeight: 400,
              }}
            >
              {descriptionText}
            </p>

            <Link
              to="/home"
              className="butt"
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "42px",
                padding: "8px 24px",
                fontSize: "0.88rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      {/* Desktop cinema video stage cleared below fixed navbar */}
      <div
        style={{
          paddingTop: "104px",
          paddingLeft: "32px",
          paddingRight: "32px",
          paddingBottom: "44px",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "960px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 0,
              paddingBottom: "56.25%",
              borderRadius: "14px",
              overflow: "hidden",
              transform: "translateZ(0)",
              backgroundColor: "#000000",
              border: "1px solid rgba(255, 255, 255, 0.14)",
              boxShadow: "0 18px 46px rgba(0, 0, 0, 0.78)",
            }}
          >
            <iframe
              src={props.case.video}
              title={props.case.name || "Case Study Video"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: "none",
                width: "100%",
                height: "100%",
                display: "block",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Simple, clean case details sheet directly below video */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          borderRadius: "28px 28px 0 0",
          padding: "clamp(42px, 5vw, 68px) clamp(28px, 6vw, 96px)",
        }}
      >
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "2px",
              color: "#F1593A",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Case Study
          </span>

          <h1
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(1.8rem, 3.4vw, 2.65rem)",
              fontWeight: 800,
              lineHeight: 1.25,
              letterSpacing: "-0.3px",
              color: "#111111",
              margin: "0 0 16px 0",
              textTransform: "uppercase",
            }}
          >
            {props.case.name}
          </h1>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "1.02rem",
              lineHeight: 1.8,
              color: "#4a4a4a",
              margin: "0 0 28px 0",
              fontWeight: 400,
            }}
          >
            {descriptionText}
          </p>

          <Link
            to="/home"
            className="butt"
            style={{
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "42px",
              padding: "8px 24px",
              fontSize: "0.88rem",
              fontWeight: 600,
              margin: 0,
            }}
          >
            ← Back to Case Studies
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CaseDeats;