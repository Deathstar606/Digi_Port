import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Container, Row, Col } from "reactstrap";
import { StaggeredText } from "./TextAnimate";

// Services Data JSON
const SERVICES_DATA = [
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "Crafting high-impact video narratives with seamless pacing, color grading, visual effects, and professional sound design.",
    viewBox: "0 0 200 200",
    paths: [
      "M35 60 H125 C130 60 135 65 135 70 V130 C135 135 130 140 125 140 H35 C30 140 25 135 25 130 V70 C25 65 30 60 35 60 Z",
      "M135 85 L175 60 V140 L135 115 Z",
      "M68 85 L98 100 L68 115 Z",
      "M55 42 H105 V60 H55 Z",
    ],
  },
  {
    id: "3d-modeling",
    title: "3D Modeling",
    description:
      "Designing photorealistic 3D models, asset creation, motion graphics, and immersive CGI environments tailored to brand vision.",
    viewBox: "0 0 200 200",
    paths: [
      "M100 35 L160 70 V140 L100 175 L40 140 V70 Z",
      "M100 35 V105",
      "M100 105 L40 70",
      "M100 105 L160 70",
      "M100 105 V175",
    ],
  },
  {
    id: "graphics-design",
    title: "Graphics Design",
    description:
      "Building distinctive visual identities, digital typography, marketing collateral, and polished creative brand assets.",
    viewBox: "0 0 200 200",
    paths: [
      "M40 160 L60 140 L50 115 L105 60 C115 50 135 50 145 60 C155 70 155 90 145 100 L90 155 L65 145 Z",
      "M40 160 L85 115",
      "M25 80 Q 90 20 175 75",
      "M20 75 H30 V85 H20 Z",
      "M170 70 H180 V80 H170 Z",
    ],
  },
  {
    id: "seo",
    title: "SEO",
    description:
      "Strategic search optimization, technical audits, keyword indexing, and content architecture to maximize organic discovery.",
    viewBox: "0 0 200 200",
    paths: [
      "M85 37 A 48 48 0 1 1 84.9 37",
      "M120 120 L168 168",
      "M62 105 V90",
      "M85 105 V75",
      "M108 105 V58",
      "M58 88 L85 68 L108 80 L132 50",
      "M118 50 H132 V64",
    ],
  },
];

const variants = {
  initial: {
    pathLength: 0,
    pathOffset: 1,
  },
  animate: {
    pathLength: 1,
    pathOffset: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const ServiceCard = ({ service }) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <Col md={3} xs={12} className="mb-4">
      <div className="d-flex flex-column align-items-center px-2">
        <motion.svg
          ref={ref}
          style={{ width: "140px", height: "140px" }}
          viewBox={service.viewBox}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {service.paths.map((p, idx) => (
            <motion.path
              key={idx}
              d={p}
              fill="none"
              stroke="black"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={variants}
              animate={inView ? "animate" : "initial"}
            />
          ))}
        </motion.svg>
        <h4
          className="text-center mt-3"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            color: "#111111",
            textTransform: "uppercase",
            letterSpacing: "1px",
            margin: 0,
          }}
        >
          {service.title}
        </h4>
        <p
          className="text-center mt-2"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.65,
            color: "#555555",
            margin: 0,
          }}
        >
          {service.description}
        </p>
      </div>
    </Col>
  );
};

const Service = () => {
  return (
    <>
      <div id="services" className="text-center pt-5 pb-3">
        <h1
          className="row-header text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(36px, 5vw, 76px)",
            fontWeight: 800,
            letterSpacing: "1.5px",
            lineHeight: 1.15,
            textTransform: "uppercase",
            color: "#F1593A",
            margin: 0,
          }}
        >
          <StaggeredText text="Our Services" />
        </h1>
        <h5
          className="pt-2 pb-3 text-center"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(12px, 1.2vw, 16px)",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "#666666",
            margin: 0,
          }}
        >
          What We Deliver
        </h5>
      </div>
      <Container style={{ minWidth: "85%" }}>
        <Row className="mt-4 mb-5">
          {SERVICES_DATA.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Service;
