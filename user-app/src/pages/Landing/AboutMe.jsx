import { motion } from "framer-motion";

const AboutMe = () => {
  return (
    <div className="py-20 px-6 bg-gray-900 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-white"
      >
        About Me
      </motion.h2>
      <p className="mt-4 text-lg text-gray-400">
        Hi, I'm{" "}
        <span className="text-blue-400 font-semibold">Kumar Roushan</span>, a
        passionate Web Developer and AI/ML enthusiast. Currently pursuing B.Tech
        CSE (3rd Year), I specialize in building scalable and intelligent
        applications.
      </p>
    </div>
  );
};

export default AboutMe;
