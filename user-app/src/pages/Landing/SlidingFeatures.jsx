import { motion } from "framer-motion";

const features = [
  {
    title: "Fast & Secure Check-in",
    description:
      "Scan and check-in within seconds, ensuring security and ease.",
  },
  {
    title: "User-Friendly",
    description: "Simple and intuitive design for effortless navigation.",
  },
  {
    title: "Real-Time Approvals",
    description: "Admins can approve or reject check-ins instantly.",
  },
];

const SlidingFeatures = () => {
  return (
    <div className="py-16 px-6 bg-gray-800">
      <h2 className="text-3xl text-center font-bold text-white mb-10">
        Key Features
      </h2>
      <div className="flex overflow-x-auto space-x-6 scrollbar-hide">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="min-w-[300px] bg-gray-900 text-white p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-2 text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SlidingFeatures;
