import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AboutUs from "./AboutUs";
import MediaQuery from "react-responsive";

const dimentions =
  "M1.01803 0V435.826C0.434679 456.536 13.7935 497.956 71.8956 497.956C129.998 497.956 139.856 456.536 137.523 435.826V364.559C142.773 340.498 167.974 292.561 226.776 293.292C285.578 294.022 488.702 293.596 582.914 293.292H756.171C804.881 294.814 902.301 320.702 902.301 412.07C902.301 503.438 902.301 546.99 902.301 557.345C908.134 575.314 928.727 611.252 964.428 611.252C1000.13 611.252 1340.4 611.252 1506.07 611.252C1530.28 610.643 1578.7 621.851 1578.7 671.555C1578.7 721.26 1578.7 857.946 1578.7 920.077C1580.74 933.782 1573.28 961.009 1527.07 960.279C1480.87 959.548 1132.73 955.71 964.428 953.883C943.719 951.446 902.301 962.289 902.301 1025.15C902.301 1088.01 902.301 1115.91 902.301 1122";
/* -5 0 1620 1200 */
/* const pathOffset = useTransform(
  scrollYProgress,
  [0.30, 0.10],
  [1, pathLength]
); */
const mobiledim =
  "M2 0V302.167C2.66323 310.136 9.85933 326.168 33.3378 326.551C56.8164 326.933 126.025 326.71 157.694 326.551C165.985 325.913 182.765 331.428 183.561 358.584C184.356 385.741 183.892 449.266 183.561 477.634C184.058 483.212 180.576 494.368 162.669 494.368C144.761 494.368 61.0279 494.368 21.3996 494.368C14.9331 493.093 2 495.707 2 516.362C2 537.016 2 572.46 2 587.6C2.16581 595.41 6.27787 611.028 21.3996 611.028C36.5214 611.028 121.88 611.028 162.669 611.028C167.975 612.622 178.686 618.678 179.084 630.152C179.482 641.627 179.25 775.499 179.084 841";

function Show() {
  const { scrollYProgress } = useScroll();
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", dimentions);

  const pathLength = path.getTotalLength();
  const pathOffsetD = useTransform(
    scrollYProgress,
    [0.3, 0.075],
    [1, pathLength],
  );
  const pathOffset = useTransform(scrollYProgress, [0.5, 0.1], [1, pathLength]);

  return (
    <>
      <MediaQuery maxWidth={639}>
        <div className="show-container">
          <div className="svg-container">
            <svg
              viewBox="0 0 186 841"
              fill="none"
              preserveAspectRatio="xMidYMax meet"
            >
              <motion.path
                d={mobiledim}
                stroke="#d4d4d4"
                strokeWidth="5"
                opacity={0.6}
                strokeDasharray={pathLength}
                style={{ strokeDashoffset: pathOffset }}
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
                stroke="#d4d4d4"
                strokeWidth="10"
                opacity={0.6}
                strokeDasharray={pathLength}
                style={{ strokeDashoffset: pathOffsetD }}
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
