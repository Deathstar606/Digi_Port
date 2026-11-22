import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import AboutUs from "./AboutUs";
import MediaQuery from "react-responsive";

// Desktop & Tablet (>= 768px) primary sculptural path:
// Originates beside "Brand Goals" (56, 76), weaves down the left gutter of "Our Goals",
// sweeps beneath the quote box (y = 674) through the 4-quadrant nexus (933, 678),
// frames "Our Vision" & "Our Mission" along the right margin, and terminates at "Our Team" (800, 1192).
const DESKTOP_MAIN_PATH =
  "M 56 76 C 56 150, 56 205, 56 265 C 56 325, 94 345, 94 405 C 94 465, 38 485, 38 555 C 38 625, 68 674, 150 674 L 780 674 C 855 674, 895 660, 933 678 C 972 696, 1030 700, 1120 700 L 1485 700 C 1545 700, 1570 728, 1570 785 C 1570 842, 1540 868, 1540 925 C 1540 982, 1570 1008, 1570 1065 C 1570 1122, 1540 1154, 1470 1158 L 890 1158 C 825 1158, 800 1168, 800 1192";

// Desktop & Tablet intertwined harmonic companion ribbon
const DESKTOP_ECHO_PATH =
  "M 56 76 C 82 155, 34 220, 74 290 C 110 355, 42 415, 72 490 C 96 555, 52 630, 160 686 L 775 686 C 850 686, 892 696, 933 678 C 975 660, 1035 688, 1125 688 L 1478 688 C 1532 688, 1554 720, 1554 778 C 1554 836, 1578 868, 1558 925 C 1538 982, 1554 1015, 1554 1068 C 1554 1114, 1525 1142, 1462 1146 L 888 1146 C 822 1146, 800 1162, 800 1192";

// Mobile (< 768px) primary sculptural path:
// Originates beside "Brand Goals" (20, 74), flows down the left margin of "Our Goals",
// sweeps across the mid-section seam (y ~ 825) to the right edge, frames "Our Vision" & "Our Mission",
// and converges at the bottom center (200, 1794) directly into "Our Team".
const MOBILE_MAIN_PATH =
  "M 20 74 C 20 140, 20 190, 20 245 C 20 305, 34 335, 34 395 C 34 455, 12 485, 12 545 C 12 605, 28 635, 24 705 C 20 765, 24 805, 58 818 C 110 836, 290 820, 346 838 C 374 848, 384 875, 384 925 C 384 1020, 370 1080, 384 1180 C 394 1260, 384 1340, 384 1420 C 384 1495, 368 1535, 368 1595 C 368 1655, 386 1685, 378 1732 C 370 1768, 335 1776, 265 1778 C 218 1780, 200 1785, 200 1794";

// Mobile intertwined companion ribbon
const MOBILE_ECHO_PATH =
  "M 20 74 C 32 145, 10 205, 28 265 C 44 320, 14 370, 26 435 C 36 495, 16 555, 30 620 C 40 685, 16 785, 68 806 C 125 828, 280 810, 338 828 C 364 838, 374 868, 374 920 C 374 1015, 388 1085, 374 1185 C 364 1265, 374 1345, 374 1425 C 374 1495, 386 1540, 378 1600 C 370 1660, 374 1690, 368 1724 C 360 1756, 325 1766, 260 1768 C 215 1770, 200 1778, 200 1794";

function measurePathLength(d, fallback) {
  if (typeof document === "undefined") return fallback;
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute("d", d);
  return p.getTotalLength ? p.getTotalLength() : fallback;
}

function Show() {
  const containerRef = useRef(null);

  const [lengths] = useState(() => ({
    dMain: measurePathLength(DESKTOP_MAIN_PATH, 3150),
    dEcho: measurePathLength(DESKTOP_ECHO_PATH, 3180),
    mMain: measurePathLength(MOBILE_MAIN_PATH, 2320),
    mEcho: measurePathLength(MOBILE_ECHO_PATH, 2340),
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 82%", "end 88%"],
  });

  // Natural spring-smoothed scroll expansion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 22,
    mass: 0.3,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Trigger initial measurement sync on mount
  }, []);

  // Desktop dash offsets (expand from full length down to 0)
  const dashOffsetDMain = useTransform(
    smoothProgress,
    [0, 0.96],
    [lengths.dMain, 0]
  );
  const dashOffsetDEcho = useTransform(
    smoothProgress,
    [0.02, 0.97],
    [lengths.dEcho, 0]
  );

  // Mobile dash offsets
  const dashOffsetMMain = useTransform(
    smoothProgress,
    [0, 0.96],
    [lengths.mMain, 0]
  );
  const dashOffsetMEcho = useTransform(
    smoothProgress,
    [0.02, 0.97],
    [lengths.mEcho, 0]
  );

  // Color transform after reaching the midpoint threshold (~54% -> 68% of scroll)
  const mainStrokeColor = useTransform(
    smoothProgress,
    [0, 0.5, 0.66, 1],
    ["#b0b7c0", "#9aa3af", "#F1593A", "#F1593A"]
  );

  const echoStrokeColor = useTransform(
    smoothProgress,
    [0, 0.52, 0.7, 1],
    ["#d0d5dd", "#c0c7d0", "#ff8b73", "#F1593A"]
  );

  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 0.7, 1],
    [0.04, 0.08, 0.25, 0.32]
  );

  // Milestone node activations along the scroll journey
  const node2Scale = useTransform(smoothProgress, [0.14, 0.24], [0.4, 1]);
  const node2Opacity = useTransform(smoothProgress, [0.14, 0.24], [0.25, 1]);

  const nexusScale = useTransform(smoothProgress, [0.42, 0.54], [0.5, 1]);
  const nexusColor = useTransform(
    smoothProgress,
    [0.42, 0.58],
    ["#9aa3af", "#F1593A"]
  );

  const node4Scale = useTransform(smoothProgress, [0.68, 0.8], [0.4, 1]);
  const node4Opacity = useTransform(smoothProgress, [0.68, 0.8], [0.25, 1]);

  const endScale = useTransform(smoothProgress, [0.9, 0.99], [0.5, 1]);
  const endOpacity = useTransform(smoothProgress, [0.88, 0.99], [0.2, 1]);

  return (
    <div id="aboutus" ref={containerRef}>
      <MediaQuery maxWidth={767}>
        <div className="show-container">
          <div className="svg-container">
            <svg
              viewBox="0 0 400 1800"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Subtle architectural guide track */}
              <path
                d={MOBILE_MAIN_PATH}
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="6 10"
                opacity={0.55}
              />

              {/* Warm ambient glow layer that ignites on color transform */}
              <motion.path
                d={MOBILE_MAIN_PATH}
                stroke="#F1593A"
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={lengths.mMain}
                style={{
                  strokeDashoffset: dashOffsetMMain,
                  opacity: glowOpacity,
                }}
              />

              {/* Intertwined companion ribbon strand */}
              <motion.path
                d={MOBILE_ECHO_PATH}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.55}
                strokeDasharray={lengths.mEcho}
                style={{
                  strokeDashoffset: dashOffsetMEcho,
                  stroke: echoStrokeColor,
                }}
              />

              {/* Primary sculptural scroll path */}
              <motion.path
                d={MOBILE_MAIN_PATH}
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.78}
                strokeDasharray={lengths.mMain}
                style={{
                  strokeDashoffset: dashOffsetMMain,
                  stroke: mainStrokeColor,
                }}
              />

              {/* Origin Node beside Brand Goals */}
              <g>
                <circle
                  cx="20"
                  cy="74"
                  r="10"
                  stroke="#F1593A"
                  strokeWidth="1.5"
                  opacity="0.45"
                />
                <motion.circle
                  cx="20"
                  cy="74"
                  r="5"
                  style={{ fill: mainStrokeColor }}
                />
              </g>

              {/* Goals Wave Milestone Node */}
              <motion.g
                style={{
                  scale: node2Scale,
                  opacity: node2Opacity,
                  transformOrigin: "34px 395px",
                }}
              >
                <circle
                  cx="34"
                  cy="395"
                  r="8"
                  stroke="#9aa3af"
                  strokeWidth="1.5"
                  fill="#ffffff"
                />
                <motion.circle
                  cx="34"
                  cy="395"
                  r="3.5"
                  style={{ fill: mainStrokeColor }}
                />
              </motion.g>

              {/* Mid-Section Crossover Diamond Node */}
              <motion.g
                style={{
                  scale: nexusScale,
                  transformOrigin: "200px 828px",
                }}
              >
                <motion.path
                  d="M 200 816 L 212 828 L 200 840 L 188 828 Z"
                  fill="#ffffff"
                  strokeWidth="2.2"
                  style={{ stroke: nexusColor }}
                />
                <motion.circle
                  cx="200"
                  cy="828"
                  r="3.5"
                  style={{ fill: nexusColor }}
                />
              </motion.g>

              {/* Vision/Mission Wave Node */}
              <motion.g
                style={{
                  scale: node4Scale,
                  opacity: node4Opacity,
                  transformOrigin: "368px 1595px",
                }}
              >
                <circle
                  cx="368"
                  cy="1595"
                  r="8"
                  stroke="#F1593A"
                  strokeWidth="1.5"
                  fill="#ffffff"
                />
                <circle cx="368" cy="1595" r="3.5" fill="#F1593A" />
              </motion.g>

              {/* Terminal Node & Chevron pointing into Our Team */}
              <motion.g
                style={{
                  scale: endScale,
                  opacity: endOpacity,
                  transformOrigin: "200px 1790px",
                }}
              >
                <circle
                  cx="200"
                  cy="1786"
                  r="11"
                  fill="rgba(241, 89, 58, 0.16)"
                />
                <path
                  d="M 191 1783 L 200 1794 L 209 1783"
                  stroke="#F1593A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            </svg>
          </div>
          <div className="about-pos">
            <AboutUs />
          </div>
        </div>
      </MediaQuery>

      <MediaQuery minWidth={768}>
        <div className="show-container">
          <div className="svg-container">
            <svg
              viewBox="0 0 1600 1200"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Subtle architectural blueprint track */}
              <path
                d={DESKTOP_MAIN_PATH}
                stroke="#e2e8f0"
                strokeWidth="2"
                strokeDasharray="8 12"
                opacity={0.65}
              />

              {/* Warm ambient glow layer that ignites on color transform */}
              <motion.path
                d={DESKTOP_MAIN_PATH}
                stroke="#F1593A"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={lengths.dMain}
                style={{
                  strokeDashoffset: dashOffsetDMain,
                  opacity: glowOpacity,
                }}
              />

              {/* Intertwined harmonic companion ribbon strand */}
              <motion.path
                d={DESKTOP_ECHO_PATH}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.65}
                strokeDasharray={lengths.dEcho}
                style={{
                  strokeDashoffset: dashOffsetDEcho,
                  stroke: echoStrokeColor,
                }}
              />

              {/* Primary sculptural scroll path */}
              <motion.path
                d={DESKTOP_MAIN_PATH}
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
                strokeDasharray={lengths.dMain}
                style={{
                  strokeDashoffset: dashOffsetDMain,
                  stroke: mainStrokeColor,
                }}
              />

              {/* 1. Origin Beacon beside Brand Goals (56, 76) */}
              <g>
                <circle
                  cx="56"
                  cy="76"
                  r="16"
                  stroke="#F1593A"
                  strokeWidth="1.5"
                  opacity="0.35"
                />
                <circle
                  cx="56"
                  cy="76"
                  r="10"
                  stroke="#F1593A"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <motion.circle
                  cx="56"
                  cy="76"
                  r="5"
                  style={{ fill: mainStrokeColor }}
                />
              </g>

              {/* 2. Left Gutter Wave Node beside Our Goals (94, 405) */}
              <motion.g
                style={{
                  scale: node2Scale,
                  opacity: node2Opacity,
                  transformOrigin: "94px 405px",
                }}
              >
                <circle
                  cx="94"
                  cy="405"
                  r="11"
                  fill="#ffffff"
                  stroke="#9aa3af"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="94"
                  cy="405"
                  r="4.5"
                  style={{ fill: mainStrokeColor }}
                />
              </motion.g>

              {/* 3. Center 4-Quadrant Nexus Diamond (933, 678) */}
              <motion.g
                style={{
                  scale: nexusScale,
                  transformOrigin: "933px 678px",
                }}
              >
                <circle
                  cx="933"
                  cy="678"
                  r="22"
                  fill="rgba(241, 89, 58, 0.1)"
                />
                <motion.path
                  d="M 933 661 L 950 678 L 933 695 L 916 678 Z"
                  fill="#ffffff"
                  strokeWidth="3"
                  style={{ stroke: nexusColor }}
                />
                <motion.circle
                  cx="933"
                  cy="678"
                  r="5"
                  style={{ fill: nexusColor }}
                />
              </motion.g>

              {/* 4. Right Margin Wave Node between Our Vision & Our Mission (1540, 925) */}
              <motion.g
                style={{
                  scale: node4Scale,
                  opacity: node4Opacity,
                  transformOrigin: "1540px 925px",
                }}
              >
                <circle
                  cx="1540"
                  cy="925"
                  r="11"
                  fill="#ffffff"
                  stroke="#F1593A"
                  strokeWidth="2.2"
                />
                <circle cx="1540" cy="925" r="4.5" fill="#F1593A" />
              </motion.g>

              {/* 5. Terminal Node & Chevron at Our Team border (800, 1190) */}
              <motion.g
                style={{
                  scale: endScale,
                  opacity: endOpacity,
                  transformOrigin: "800px 1188px",
                }}
              >
                <circle
                  cx="800"
                  cy="1184"
                  r="18"
                  fill="rgba(241, 89, 58, 0.16)"
                />
                <path
                  d="M 786 1180 L 800 1195 L 814 1180"
                  stroke="#F1593A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            </svg>
          </div>
          <div className="about-pos">
            <AboutUs />
          </div>
        </div>
      </MediaQuery>
    </div>
  );
}

export default Show;
