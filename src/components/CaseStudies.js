import React from "react";
import { Container, Row, Col, CardImg } from "reactstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CaseCard = ({ ca, index }) => {
  return (
    <Col md={(index + 1) % 3 === 0 ? 12 : 6} className="py-2">
      <motion.div
        className="catcard"
        initial={{ y: 50, opacity: 0 }}
        transition={{ duration: 1, type: "tween", ease: "easeIn" }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* NEW FEATURE: display: block and height: 100% ensures the anchor tag fills the motion.div */}
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
              alt={ca.name || "case image"}
            />
            <div className="cat-body">
              <h4
                style={{
                  borderBottom: "1px solid #ccc",
                  paddingBottom: "5px",
                  color: "#F1593A",
                  margin: 0,
                  display: "inline-block", // NEW FEATURE: Ensures border only wraps text width
                }}
              >
                {ca.name}
              </h4>
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
        <h1
          className="pt-4 mt-4 pb-1 mb-1 row-header text-center"
          style={{
            fontSize: "clamp(54px, 4vw, 100px)",
            color: "#F1593A",
          }}
        >
          Case Studies
        </h1>
        <h5 className="pb-3 text-center" style={{ color: "#F1593A" }}>
          Our Creations
        </h5>
        <Row className="mt-5 justify-content-center text-center">
          {caseStudies}
        </Row>
      </Container>
    );
  }
}

export default Case;
