import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0.75rem)" },
};

const TabButton = ({ active, selectTab, children }: { active: boolean, selectTab: () => void, children: React.ReactNode }) => {
  const buttonClasses = active ? "text-white" : "text-[#ADB7BE]";

  return (
    <button onClick={selectTab} className="relative flex flex-col items-center justify-center h-8">
      <p className={`font-semibold hover:text-primary-500 ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        transition={{ duration: 0.9 }}
        className="h-1 bg-primary-500 w-full absolute bottom-0"
      ></motion.div>
    </button>
  );
};

export default TabButton;