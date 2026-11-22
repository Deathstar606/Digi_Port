import { motion, AnimatePresence } from "framer-motion";
import { BarLoader } from "react-spinners";
import logo from "../images/Digixwhitelogo.png";

export const LoadingComponent = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#0b0b0b", color: "#ffffff" }}
      >
        <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px" }}>
          <img
            src={logo}
            alt="DIGIX"
            style={{ height: "42px", width: "auto", marginBottom: "24px", objectFit: "contain" }}
          />
          <div style={{ width: "180px" }}>
            <BarLoader width="100%" color="#f1593a" height={3} />
          </div>
          <p
            style={{
              marginTop: "14px",
              marginBottom: 0,
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.55)",
            }}
          >
            Loading Experience
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
