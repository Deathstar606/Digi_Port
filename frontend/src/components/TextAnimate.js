import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const StaggeredText = ({ text }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const textVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={textVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {text.split("").map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};