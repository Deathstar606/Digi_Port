import React from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlay, FaArrowRight } from "react-icons/fa";

const CaseCard = ({ ca, index }) => {
  const caseNumber = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
    <Col md={(index + 1) % 3 === 0 ? 12 : 6} className="py-3">
      <motion.div
        className="catcard"
        initial={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.8, type: "tween", ease: "easeOut" }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <Link
          style={{
            color: "inherit",
            textDecoration: "none",
            display: "block",
            height: "100%",
          }}
          to={`/home/${ca._id}`}
        >
          <div style={{ height: "100%", position: "relative" }}>
            <CardImg
              className="catimg"
              src={ca.image}
              alt={ca.name || "Case study thumbnail"}
            />
            {/* Cinematic Gradient Overlay */}
            <div className="cat-overlay" />

            {/* Top Bar Badges */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                left: "20px",
                right: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  borderRadius: "20px",
                  padding: "5px 14px",
                }}
              >
                Case #{caseNumber}
              </span>
              <span
                style={{
                  backgroundColor: "rgba(241, 89, 58, 0.85)",
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  borderRadius: "20px",
                  padding: "4px 12px",
                }}
              >
                Film
              </span>
            </div>

            {/* Centered Play Button Indicator */}
            <div className="cat-play-btn">
              <FaPlay size={18} style={{ marginLeft: "3px" }} />
            </div>

            {/* Bottom Content / Typography */}
            <div
              className="cat-body"
              style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(1.15rem, 1.8vw, 1.65rem)",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  lineHeight: 1.35,
                  color: "#ffffff",
                  borderBottom: "2px solid #F1593A",
                  paddingBottom: "6px",
                  margin: 0,
                  textAlign: "left",
                  alignSelf: "flex-start",
                  display: "inline-block",
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.9)",
                  wordBreak: "break-word",
                }}
              >
                {ca.name}
              </h4>
              <div
                style={{
                  marginTop: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  gap: "6px",
                  color: "#F1593A",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                <span>Watch Case Study</span>
                <FaArrowRight size={11} />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </Col>
  );
};

function Case({ casefile }) {
  const caseStudies =
    casefile && casefile.length > 0
      ? casefile.map((ca, index) => (
          <CaseCard key={ca._id} ca={ca} index={index} />
        ))
      : null;

  if (caseStudies) {
    return (
      <Container id="casestu" className="pb-5" style={{ minWidth: "95%" }}>
        <div className="text-center pt-5 pb-3">
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
            Case Studies
          </h1>
          <h5
            className="pt-2 text-center"
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
            Our Creations
          </h5>
        </div>
        <Row className="mt-4 justify-content-center text-center">
          {caseStudies}
        </Row>
      </Container>
    );
  }
}

export default Case;
