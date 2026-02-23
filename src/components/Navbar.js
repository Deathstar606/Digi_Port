import React, { useState, useEffect } from "react";
import {
  Navbar as BootstrapNavbar,
  NavLink,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/Digixwhitelogo.png";
/* import Burger from './Burger'; */
import MediaQuery from "react-responsive";
import { Link } from "react-scroll";

export const Burger = ({ handleOrdPage, linkClick }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = windowWidth < 640 ? "60vw" : "500px";

  return (
    <motion.div
      onClick={handleOrdPage}
      className="modal-back"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()} // Prevent click event propagation
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          backgroundColor: "#F1593A",
          color: "rgb(0, 0, 0)",
          width: sidebarWidth, // Use the calculated width
          height: "100vh", // Full height of the viewport
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Box shadow for some depth
          position: "fixed", // Fix to the right side
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flex: 1, // Allow this container to grow and take up available space
            maxHeight: "calc(100vh - 80px)", // Adjust max height to account for footer space
            overflowY: "hidden",
            padding: "0 1rem", // Add padding for aesthetics
          }}
        >
          <ul
            className="p-3"
            style={{ padding: 0, listStyleType: "none", marginTop: "10%" }}
          >
            <li
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                fontSize: "18px",
              }}
            >
              <Link
                style={{ color: "black", fontSize: "18px", fontWeight: "500" }}
                to="aboutus"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => linkClick("aboutus")}
              >
                About Us
              </Link>
            </li>
            <li
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                fontSize: "18px",
              }}
            >
              <Link
                style={{ color: "black", fontSize: "18px", fontWeight: "500" }}
                to="casestu"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => linkClick("casestu")}
              >
                Case Studies
              </Link>
            </li>
            <li
              style={{
                marginTop: "5px",
                marginBottom: "5px",
                fontSize: "18px",
              }}
            >
              <Link
                style={{ color: "black", fontSize: "18px", fontWeight: "500" }}
                to="services"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                onClick={() => linkClick("services")}
              >
                Servies
              </Link>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Navbar = () => {
  const navigate = useNavigate(); // Replaces useHistory
  const location = useLocation();
  const [scrollTarget, setScrollTarget] = useState(null);

  function handleClick(targetId) {
    if (location.pathname !== "/home") {
      setScrollTarget(targetId); // Set the target for scrolling
      navigate("/home"); // Redirect to /home
    } else {
      setScrollTarget(targetId); // Set target for the current page
    }
    setisOpen(false);
  }

  useEffect(() => {
    if (location.pathname === "/home" && scrollTarget) {
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          const offset = 100; // Set your desired offset here
          const elementPosition =
            element.getBoundingClientRect().top + window.scrollY; // Get element position
          const offsetPosition = elementPosition - offset; // Adjust for offset

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 500); // Delay for navigation to complete
    }
  }, [location, scrollTarget]); // Dependency on location and scrollTarget

  const [isOpen, setisOpen] = useState(false);
  const burgerToggle = () => {
    setisOpen(!isOpen);
  };

  return (
    <Container className="nav-container d-flex justify-content-center">
      <div className="nav-c">
        <MediaQuery maxWidth={639}>
          <BootstrapNavbar light expand="md">
            <NavbarBrand href="/" className="text-white">
              <img className="logo" src={logo} />
            </NavbarBrand>
          </BootstrapNavbar>
          <div
            onClick={burgerToggle}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "20px",
              right: "15px",
            }}
          >
            <div
              className="bar"
              style={{
                width: "30px",
                height: "2px",
                backgroundColor: "white",
                margin: "5px",
              }}
            ></div>
            <div
              className="bar"
              style={{
                width: "15px",
                height: "2px",
                backgroundColor: "white",
                margin: "5px",
              }}
            ></div>
          </div>
          <AnimatePresence mode="wait">
            {isOpen && (
              <Burger handleOrdPage={burgerToggle} linkClick={handleClick} />
            )}
          </AnimatePresence>
        </MediaQuery>
        <MediaQuery minWidth={640}>
          <BootstrapNavbar light expand="md">
            <NavbarBrand href="/" className="text-white">
              <img className="logo" src={logo} />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-ele">
                <Link
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  to="aboutus"
                  spy={true}
                  smooth={true}
                  offset={-250}
                  duration={500}
                  onClick={() => handleClick("aboutus")}
                >
                  About Us
                </Link>
              </NavItem>
              <NavItem className="nav-ele">
                <Link
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  to="casestu"
                  spy={true}
                  smooth={true}
                  offset={-50}
                  duration={500}
                  onClick={() => handleClick("casestu")}
                >
                  Case Studies
                </Link>
              </NavItem>
              <NavItem className="nav-ele">
                <Link
                  style={{
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                  onClick={() => handleClick("services")}
                >
                  Services
                </Link>
              </NavItem>
            </Nav>
          </BootstrapNavbar>
        </MediaQuery>
      </div>
    </Container>
  );
};

export default Navbar;
