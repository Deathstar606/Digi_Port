import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AboutUs from "./AboutUs";
import MediaQuery from "react-responsive";

// Desktop SVG path: gracefully curves across the AboutUs section and terminates before reaching Our Team
const dimentions =
  "M1 20V420C1 455 18 495 72 495C126 495 138 455 138 420V355C138 318 168 293 226 293H756C808 293 902 320 902 412V555C902 580 928 611 965 611H1506C1545 611 1578 630 1578 672V895C1578 935 1550 960 1510 960H970C925 960 902 970 902 995";

// Reverted back to the original mobiledim path with organic loops extended to 1450 to reach Our People section
const mobiledim =
  "M2 0V302.167C2.66323 310.136 9.85933 326.168 33.3378 326.551C56.8164 326.933 126.025 326.71 157.694 326.551C165.985 325.913 182.765 331.428 183.561 358.584C184.356 385.741 183.892 449.266 183.561 477.634C184.058 483.212 180.576 494.368 162.669 494.368C144.761 494.368 61.0279 494.368 21.3996 494.368C14.9331 493.093 2 495.707 2 516.362C2 537.016 2 572.46 2 587.6C2.16581 595.41 6.27787 611.028 21.3996 611.028C36.5214 611.028 121.88 611.028 162.669 611.028C167.975 612.622 178.686 618.678 179.084 630.152C179.482 641.627 179.25 775.499 179.084 841V960C179.084 995 165 1010 150 1010H35C15 1010 2 1025 2 1045V1160C2 1205 15 1220 35 1220H150C165 1220 179.084 1235 179.084 1255V1450";

function Show() {
  const { scrollYProgress } = useScroll();

  // Desktop path length calculation
  const pathD = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathD.setAttribute("d", dimentions);
  const pathLengthD = pathD.getTotalLength ? pathD.getTotalLength() : 3000;

  // Mobile path length calculation
  const pathM = document.createElementNS("http://www.w3.org/2000/svg", "path");
  pathM.setAttribute("d", mobiledim);
  const pathLengthM = pathM.getTotalLength ? pathM.getTotalLength() : 2600;

  // Desktop scroll animation: draws between scroll 0.08 and 0.30
  const pathOffsetD = useTransform(
    scrollYProgress,
    [0.3, 0.08],
    [1, pathLengthD],
  );

  // Mobile scroll animation: draws between scroll 0.08 and 0.50 (travels longer down to Our People)
  const pathOffset = useTransform(
    scrollYProgress,
    [0.3, 0.08],
    [1, pathLengthM],
  );

  // Desktop stroke color: transforms to #F1593A when line reaches 80% rendered (scroll ~0.256)
  const strokeColorD = useTransform(
    scrollYProgress,
    [0, 0.245, 0.256, 1],
    ["#d4d4d4", "#d4d4d4", "#F1593A", "#F1593A"],
  );

  // Mobile stroke color: transforms to #F1593A when line reaches 80% rendered (scroll ~0.416)
  const strokeColorM = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 1],
    ["#d4d4d4", "#d4d4d4", "#F1593A", "#F1593A"],
  );

  return (
    <>
      <MediaQuery maxWidth={639}>
        <div className="show-container">
          <div className="svg-container">
            <svg
              viewBox="0 0 186 1450"
              fill="none"
              preserveAspectRatio="xMidYMax meet"
            >
              <motion.path
                d={mobiledim}
                strokeWidth="5"
                opacity={0.4}
                strokeDasharray={pathLengthM}
                style={{
                  strokeDashoffset: pathOffset,
                  stroke: strokeColorM,
                }}
              />
            </svg>
          </div>
          <div className="about-pos">
            <AboutUs />
          </div>
        </div>
      </MediaQuery>
      <MediaQuery minWidth={640}>
        <div className="show-container">
          <div className="svg-container">
            <svg
              viewBox="-5 0 1620 1200"
              fill="none"
              preserveAspectRatio="xMidYMax meet"
            >
              <motion.path
                d={dimentions}
                strokeWidth="10"
                opacity={0.4}
                strokeDasharray={pathLengthD}
                style={{
                  strokeDashoffset: pathOffsetD,
                  stroke: strokeColorD,
                }}
              />
            </svg>
          </div>
          <div className="about-pos">
            <AboutUs />
          </div>
        </div>
      </MediaQuery>
    </>
  );
}

export default Show;
