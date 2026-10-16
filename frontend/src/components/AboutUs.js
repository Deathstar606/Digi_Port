import { Row, Col } from "react-bootstrap";
import React from "react";
import { StaggeredText } from "./TextAnimate";
import { motion } from "framer-motion";
import demo from "../images/demo.jpg";
import { CardImg } from "reactstrap";
import OfficeImg from "../images/office-interior.png";

const AboutUs = () => {
  return (
    <div id="brand" style={{ maxWidth: "100%", overflow: "hidden", fontFamily: "'Montserrat', sans-serif" }}>
      <Row className="m-0 g-0">
        <Col md={7} className="px-0">
          <motion.div
            className="pb-5"
            style={{ backgroundColor: "black", paddingTop: "5%" }}
            initial={{ x: -100, opacity: 0 }}
            transition={{ duration: 1, type: "tween", ease: "easeIn" }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div style={{ marginLeft: "10vw" }}>
              <h1 
                className="m-5 text-white"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase"
                }}
              >
                <StaggeredText text="Brand Goals" />
              </h1>
            </div>
          </motion.div>
          <div
            style={{
              marginLeft: "10vw",
              paddingBottom: "5%",
              paddingTop: "4%",
            }}
            className="pr-5"
          >
            <div className="ml-5">
              <span 
                style={{ 
                  color: "#f1593a", 
                  fontSize: "0.85rem", 
                  fontWeight: 700, 
                  letterSpacing: "2px", 
                  textTransform: "uppercase", 
                  display: "inline-block", 
                  marginBottom: "8px" 
                }}
              >
                Strategic Purpose
              </span>
              <h2 
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                  color: "#111111",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  marginBottom: "20px"
                }}
              >
                Our Goals
              </h2>
              <p 
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "#444444",
                  marginBottom: "16px",
                  fontWeight: 400
                }}
              >
                To be the premier end-to-end partner for visionary brands, transforming creative concepts into high-performing digital campaigns, cinematic video productions, and compelling brand narratives. We leverage cutting-edge production technologies and data-backed creative strategies to elevate brands in a crowded digital landscape.
              </p>
              <p 
                style={{
                  fontSize: "0.98rem",
                  lineHeight: 1.85,
                  color: "#555555",
                  marginBottom: "20px",
                  fontWeight: 400
                }}
              >
                At DIGIX, our objective extends beyond simple asset delivery—we build cohesive digital growth ecosystems. We measure our accomplishments through the tangible expansion of our clients' market reach, their ability to captivate audiences emotionally, and the sustained commercial growth of their ventures.
              </p>
              <div 
                style={{ 
                  borderLeft: "3px solid #f1593a", 
                  paddingLeft: "16px", 
                  marginBottom: "28px",
                  backgroundColor: "rgba(241, 89, 58, 0.04)",
                  padding: "14px 18px",
                  borderRadius: "0 8px 8px 0"
                }}
              >
                <p style={{ margin: 0, fontSize: "0.95rem", lineHeight: 1.7, color: "#333333", fontWeight: 500 }}>
                  Driven by relationships and proven results, our mission is to ensure every partner commands distinct authority, authenticity, and enduring momentum in their market.
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={5} className="px-0">
          <CardImg style={{ minHeight: "100%", height: "100%", objectFit: "cover" }} src={OfficeImg} alt="Office interior" />
        </Col>
      </Row>
      <Row className="m-0 g-0">
        <Col md={7} className="px-0">
          <div
            style={{
              minHeight: "100%",
              height: "100%",
              backgroundImage: `url(${demo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          />
        </Col>
        <Col
          md={5}
          className="px-0"
          style={{ marginTop: "5%", marginBottom: "5%" }}
        >
          <div className="pr-5 ml-5 mb-5">
            <h2 
              className="m-4" 
              style={{ 
                color: "#f1593a",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                letterSpacing: "1px",
                textTransform: "uppercase"
              }}
            >
              <StaggeredText text="Our Vision" />
            </h2>
            <p 
              className="ml-4"
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.8,
                color: "#444444",
                fontWeight: 400
              }}
            >
              To lead the new frontier of full-service digital transformation, empowering visionary brands to maximize their potential, adapt rapidly, and inspire millions across an interconnected world.
            </p>
          </div>
          <div className="pr-5 ml-5">
            <h2 
              className="m-4" 
              style={{ 
                color: "#f1593a",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                letterSpacing: "1px",
                textTransform: "uppercase"
              }}
            >
              <StaggeredText text="Our Mission" />
            </h2>
            <p 
              className="ml-4"
              style={{
                fontSize: "0.98rem",
                lineHeight: 1.8,
                color: "#444444",
                fontWeight: 400
              }}
            >
              Through high-caliber cinematography, forward-thinking brand strategy, and precision marketing campaigns, we craft unforgettable narratives that cultivate deep customer affinity and deliver indisputable ROI.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
