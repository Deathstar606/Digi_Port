import React, { useState } from 'react';
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaArrowUp,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import axios from 'axios';
import dem from "../images/demo.jpg";
import logo from "../images/Digixwhitelogo.png";

function Footer() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    if (!email || !message) return;

    setLoading(true);
    setStatus({ type: '', msg: '' });

    axios.post('https://digi-back-blue.vercel.app/send-mail', { email, message })
      .then(() => {
        setStatus({
          type: 'success',
          msg: 'Thank you! Your message has been sent successfully. We will be in touch soon.',
        });
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setStatus({
          type: 'error',
          msg: 'Failed to send message. Please try again or reach out directly at +88 019 3913 3033.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <FaFacebookF size={16} />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram size={16} />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter size={16} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaLinkedinIn size={16} />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaYoutube size={16} />, url: 'https://youtube.com', label: 'YouTube' },
  ];

  const quickNav = [
    { name: 'About Us', target: 'aboutus' },
    { name: 'Case Studies', target: 'casestu' },
    { name: 'Our Services', target: 'services' },
    { name: 'Client Brands', target: 'brand' },
  ];

  const services = [
    'Cinematic Video Production',
    'Commercial & Brand Films',
    'Digital Marketing Strategy',
    'Social Media Growth',
    'Creative Brand Direction',
  ];

  return (
    <footer
      style={{
        backgroundColor: "#333333",
        backgroundImage: `url(${dem})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        overflow: "hidden",
        color: "white",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      {/* Dark overlay to ensure contrast and readability while strictly preserving the background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(18, 18, 18, 0.92)",
          zIndex: 1,
        }}
      />

      <Container
        style={{
          maxWidth: "88%",
          position: "relative",
          zIndex: 2,
          paddingTop: "70px",
          paddingBottom: "30px",
        }}
      >
        <Row className="gy-4">
          {/* Column 1: Brand Info & Socials */}
          <Col lg={4} md={6} xs={12} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={logo}
                alt="DIGIX Agency Logo"
                style={{ height: "38px", width: "auto" }}
              />
            </div>
            <p
              style={{
                fontSize: "0.92rem",
                lineHeight: "1.75",
                color: "#cccccc",
                maxWidth: "340px",
                marginBottom: "20px",
              }}
            >
              A premier digital marketing and creative media agency driven by
              relationships &amp; results. We craft high-impact video campaigns,
              strategic branding, and digital growth for visionary enterprises.
            </p>

            <div
              className="d-inline-flex align-items-center px-3 py-1 mb-4"
              style={{
                backgroundColor: "rgba(241, 89, 58, 0.12)",
                borderRadius: "20px",
                border: "1px solid rgba(241, 89, 58, 0.3)",
                fontSize: "0.8rem",
                color: "#f1593a",
                fontWeight: 600,
                letterSpacing: "0.5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  marginRight: "8px",
                }}
              />
              Available for New Projects
            </div>

            <div>
              <h6
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#aaaaaa",
                  marginBottom: "12px",
                }}
              >
                Connect With Us
              </h6>
              <div className="d-flex flex-wrap gap-2">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      color: "#ffffff",
                      marginRight: "10px",
                      marginBottom: "8px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f1593a";
                      e.currentTarget.style.borderColor = "#f1593a";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </Col>

          {/* Column 2: Quick Links & Services */}
          <Col lg={3} md={6} xs={12} className="mb-4">
            <Row>
              <Col xs={6} md={12} className="mb-3">
                <h5
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#f1593a",
                    borderBottom: "2px solid rgba(241, 89, 58, 0.5)",
                    paddingBottom: "8px",
                    marginBottom: "16px",
                    display: "inline-block",
                  }}
                >
                  Quick Links
                </h5>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {quickNav.map((link, idx) => (
                    <li key={idx} style={{ marginBottom: "10px" }}>
                      <ScrollLink
                        to={link.target}
                        smooth={true}
                        duration={500}
                        offset={-80}
                        style={{
                          color: "#bbbbbb",
                          textDecoration: "none",
                          fontSize: "0.9rem",
                          cursor: "pointer",
                          transition: "color 0.2s ease, transform 0.2s ease",
                          display: "inline-block",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#f1593a")}
                        onMouseLeave={(e) => (e.target.style.color = "#bbbbbb")}
                      >
                        › {link.name}
                      </ScrollLink>
                    </li>
                  ))}
                </ul>
              </Col>

              <Col xs={6} md={12}>
                <h5
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: "#f1593a",
                    borderBottom: "2px solid rgba(241, 89, 58, 0.5)",
                    paddingBottom: "8px",
                    marginBottom: "16px",
                    display: "inline-block",
                  }}
                >
                  Capabilities
                </h5>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {services.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "0.86rem",
                        color: "#999999",
                        marginBottom: "7px",
                        lineHeight: 1.4,
                      }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Column 3: Contact Details & Working Hours */}
          <Col lg={2} md={6} xs={12} className="mb-4">
            <h5
              style={{
                fontSize: "0.95rem",
                fontWeight: 700,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "#f1593a",
                borderBottom: "2px solid rgba(241, 89, 58, 0.5)",
                paddingBottom: "8px",
                marginBottom: "16px",
                display: "inline-block",
              }}
            >
              Get In Touch
            </h5>

            <div style={{ marginBottom: "18px" }}>
              <div className="d-flex align-items-center mb-1">
                <FaPhoneAlt size={13} color="#f1593a" className="me-2" style={{ marginRight: "8px" }} />
                <span style={{ fontSize: "0.8rem", color: "#888888", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                  Phone
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                <a
                  href="tel:+8801939133033"
                  style={{ textDecoration: "none", color: "#eeeeee" }}
                  onMouseEnter={(e) => (e.target.style.color = "#f1593a")}
                  onMouseLeave={(e) => (e.target.style.color = "#eeeeee")}
                >
                  +88 019 3913 3033
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div className="d-flex align-items-center mb-1">
                <FaEnvelope size={13} color="#f1593a" className="me-2" style={{ marginRight: "8px" }} />
                <span style={{ fontSize: "0.8rem", color: "#888888", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                  Email
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.9rem" }}>
                <a
                  href="mailto:contact@digix.agency"
                  style={{ textDecoration: "none", color: "#eeeeee" }}
                  onMouseEnter={(e) => (e.target.style.color = "#f1593a")}
                  onMouseLeave={(e) => (e.target.style.color = "#eeeeee")}
                >
                  contact@digix.agency
                </a>
              </p>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div className="d-flex align-items-center mb-1">
                <FaMapMarkerAlt size={13} color="#f1593a" className="me-2" style={{ marginRight: "8px" }} />
                <span style={{ fontSize: "0.8rem", color: "#888888", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                  Studio
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.5 }}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Road+no+1+Nirala+Khulna"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#eeeeee" }}
                  onMouseEnter={(e) => (e.target.style.color = "#f1593a")}
                  onMouseLeave={(e) => (e.target.style.color = "#eeeeee")}
                >
                  Road no 1, Nirala,<br />Khulna, Bangladesh
                </a>
              </p>
            </div>

            <div>
              <div className="d-flex align-items-center mb-1">
                <FaClock size={13} color="#f1593a" className="me-2" style={{ marginRight: "8px" }} />
                <span style={{ fontSize: "0.8rem", color: "#888888", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>
                  Hours
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#bbbbbb", lineHeight: 1.5 }}>
                Sun - Thu: 9:00 AM - 7:00 PM<br />
                Fri - Sat: Closed / By Appt
              </p>
            </div>
          </Col>

          {/* Column 4: Stay in Touch Message Form */}
          <Col lg={3} md={6} xs={12} className="mb-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.8, type: "tween", ease: "easeOut" }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: "rgba(30, 30, 30, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "14px",
                padding: "24px 20px",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              }}
            >
              <div className="mb-3">
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "1.5px",
                    color: "#f1593a",
                    textTransform: "uppercase",
                  }}
                >
                  Message Us
                </span>
                <h4
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: "4px 0 6px 0",
                  }}
                >
                  Stay in touch
                </h4>
                <p style={{ fontSize: "0.82rem", color: "#aaaaaa", margin: 0 }}>
                  Send us an inquiry and our team will respond within 24 hours.
                </p>
              </div>

              {status.type === 'success' && (
                <div
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    border: "1px solid #22c55e",
                    color: "#86efac",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    fontSize: "0.83rem",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaCheckCircle size={15} style={{ flexShrink: 0 }} />
                  <span>{status.msg}</span>
                </div>
              )}

              {status.type === 'error' && (
                <div
                  style={{
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid #ef4444",
                    color: "#fca5a5",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    fontSize: "0.83rem",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <FaExclamationCircle size={15} style={{ flexShrink: 0 }} />
                  <span>{status.msg}</span>
                </div>
              )}

              <Form onSubmit={sendEmail}>
                <Form.Group style={{ marginBottom: "12px" }}>
                  <Form.Control
                    style={{
                      borderWidth: "1px",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      height: "42px",
                      backgroundColor: "rgba(20, 20, 20, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      borderRadius: "8px",
                      padding: "8px 12px",
                    }}
                    placeholder="Your Email Address"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group style={{ marginBottom: "14px" }}>
                  <Form.Control
                    as="textarea"
                    style={{
                      borderWidth: "1px",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      backgroundColor: "rgba(20, 20, 20, 0.8)",
                      color: "#ffffff",
                      fontSize: "0.88rem",
                      borderRadius: "8px",
                      width: "100%",
                      height: "90px",
                      resize: "none",
                      padding: "8px 12px",
                    }}
                    placeholder="Tell us about your project or message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>

                <button
                  className="butt"
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    color: "#ffffff",
                    borderColor: "#f1593a",
                    backgroundColor: "#f1593a",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    margin: 0,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#d04729";
                      e.currentTarget.style.borderColor = "#d04729";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = "#f1593a";
                      e.currentTarget.style.borderColor = "#f1593a";
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={13} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </Form>
            </motion.div>
          </Col>
        </Row>

        {/* Bottom Bar: Copyright & Legal */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            marginTop: "35px",
            paddingTop: "25px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
            fontSize: "0.84rem",
            color: "#888888",
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} <strong style={{ color: "#ffffff" }}>DIGIX Agency</strong>. All rights reserved. Driven by relationships &amp; results.
          </div>

          <div className="d-flex align-items-center flex-wrap gap-3">
            <span style={{ cursor: "pointer", color: "#aaaaaa" }}>Privacy Policy</span>
            <span style={{ color: "#555" }}>•</span>
            <span style={{ cursor: "pointer", color: "#aaaaaa" }}>Terms of Service</span>
            <span style={{ color: "#555" }}>•</span>
            <button
              onClick={scrollToTop}
              style={{
                background: "transparent",
                border: "none",
                color: "#f1593a",
                cursor: "pointer",
                padding: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontWeight: 600,
                fontSize: "0.84rem",
              }}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <FaArrowUp size={11} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
