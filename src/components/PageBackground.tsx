import { motion } from "framer-motion";

const PageBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
    <motion.div
      animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-primary/8 blur-[120px]"
    />
    <motion.div
      animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[40%] -right-32 w-[350px] h-[350px] rounded-full bg-primary/6 blur-[100px]"
    />
    <motion.div
      animate={{ x: [0, 20, -30, 0], y: [0, -20, 30, 0] }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-20 left-1/4 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[130px]"
    />
    <motion.div
      animate={{ x: [0, -15, 25, 0], y: [0, 25, -15, 0] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[60%] left-[60%] w-[250px] h-[250px] rounded-full bg-accent/5 blur-[100px]"
    />
  </div>
);

export default PageBackground;
