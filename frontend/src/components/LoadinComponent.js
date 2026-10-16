import { motion, AnimatePresence } from "framer-motion";
import { BarLoader } from "react-spinners";

export const LoadingComponent = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "-100vw", opacity: 0 }}
        transition={{ type: "spring", stiffness: 50, duration: 0.5 }}
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "rgb(255, 94, 0)" }}
      >
        {" "}
        <div style={{ display: "inline-block", textAlign: "center" }}>
          <h2 style={{ marginBottom: "1rem" }}>Fetching Assest</h2>
          <div style={{ width: "100%" }}>
            <BarLoader width="100%" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
