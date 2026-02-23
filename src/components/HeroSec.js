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
      <h1 style={{ fontSize: "clamp(44px, 4vw, 70px)" }}>
        Digital Marketing Agency
      </h1>
      <p style={{ fontSize: "clamp(14px, 1vw, 36px)", marginTop: "10px" }}>
        driven by RELATIONSHIPS & RESULTS
      </p>
      <div className="scroll-container">
        <h4>Scroll</h4>
        <Link to="brand" smooth={true} duration={500}>
          <img
            style={{
              height: 50,
              width: 50,
              marginLeft: "10px",
              cursor: "pointer",
            }}
            src={arrow}
          />
        </Link>
      </div>
    </VideoBackground>
  );
};

export default HeroSec;
