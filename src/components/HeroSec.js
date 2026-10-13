import React from "react";
import { Link } from "react-scroll";
import dem from "../images/demo.mp4";
import "./video.css";
import arrow from "../images/arrow.gif";

const VideoBackground = ({ videoSource, children }) => (
  <div style={{ backgroundColor: "black" }} className="video-container">
    <video autoPlay loop muted>
      <source src={videoSource} type="video/mp4" />
    </video>
    <div className="centered-text">{children}</div>
  </div>
);

const HeroSec = () => {
  return (
    <VideoBackground videoSource={dem}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: "clamp(11px, 1.1vw, 15px)",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.85)",
            marginBottom: "16px",
            background: "rgba(241, 89, 58, 0.15)",
            border: "1px solid rgba(241, 89, 58, 0.4)",
            padding: "6px 18px",
            borderRadius: "30px",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
          }}
        >
          Full-Service Creative Studio
        </span>
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(38px, 5.5vw, 76px)",
            fontWeight: 900,
            lineHeight: 1.12,
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
          }}
        >
          Crafting Brands That <span style={{ color: "#f1593a" }}>Command</span> Attention
        </h1>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(14px, 1.3vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "rgba(255, 255, 255, 0.85)",
            marginTop: "18px",
            marginBottom: "24px",
            letterSpacing: "0.5px",
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.8)",
          }}
        >
          Cinematic Video Production • Brand Strategy • Digital Growth
        </p>
      </div>
      <div className="scroll-container">
        <h4
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: "#f1593a",
            margin: 0,
          }}
        >
          Explore
        </h4>
        <Link to="brand" smooth={true} duration={500}>
          <img
            style={{
              height: 44,
              width: 44,
              marginLeft: "10px",
              cursor: "pointer",
            }}
            src={arrow}
            alt="Scroll down indicator"
          />
        </Link>
      </div>
    </VideoBackground>
  );
};

export default HeroSec;
