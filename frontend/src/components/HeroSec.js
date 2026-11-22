import React from "react";
import { Link } from "react-scroll";
import dem from "../images/demo.mp4";
import "./video.css";
import arrow from "../images/arrow.gif";

const VideoBackground = ({ videoSource, children }) => (
  <div className="video-container">
    <video autoPlay loop muted playsInline>
      <source src={videoSource} type="video/mp4" />
    </video>
    {children}
  </div>
);

const HeroSec = () => {
  return (
    <VideoBackground videoSource={dem}>
      <div className="centered-text">
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(36px, 5.4vw, 72px)",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
            color: "#ffffff",
            margin: 0,
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.7)",
          }}
        >
          Crafting <span style={{ color: "#f1593a" }}>Bold</span> Brands
        </h1>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(10.5px, 2.4vw, 15px)",
            fontWeight: 500,
            letterSpacing: "clamp(1.5px, 0.35vw, 3.2px)",
            textTransform: "uppercase",
            color: "rgba(255, 255, 255, 0.78)",
            marginTop: "16px",
            marginBottom: 0,
            textShadow: "0 2px 12px rgba(0, 0, 0, 0.8)",
          }}
        >
          Driven by Relationships &amp; Results
        </p>
      </div>

      <div className="scroll-container">
        <Link
          to="brand"
          smooth={true}
          duration={500}
          offset={-70}
          className="scroll-link-trigger"
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.78rem",
              fontWeight: 700,
              letterSpacing: "2.8px",
              textTransform: "uppercase",
              color: "#f1593a",
            }}
          >
            Explore
          </span>
          <img
            style={{
              height: 36,
              width: 36,
              display: "block",
            }}
            src={arrow}
            alt="Scroll down"
          />
        </Link>
      </div>
    </VideoBackground>
  );
};

export default HeroSec;
