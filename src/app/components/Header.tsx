"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";


const HeaderSection = () => {
  return (
    <section className="lg:py-8 w-full">
      <div className="flex flex-col sm:flex-row items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 text-center sm:text-left"
        >
          <h1 className="text-white mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl lg:leading-normal font-extrabold xs:min-h-[165px] min-w-full">
            <span className="text-l sm:text-xl md:text-3xl lg:text-4xl xl:text-6xl block">
              Hello,
            </span>
            <span className="block w-full mt-8 lg:mt-12 md:mt-6 sm:mt-6">
              I&apos;m<span className="text-animation"> Abhijeet</span>
            </span>
            <div className="flex items-start justify-start w-full sm:h-[100px] md:h-[100px] lg:h-[250px] mt-8 lg:mt-12 md:mt-6 sm:mt-6 xs:mt-6">
              <TypeAnimation
                sequence={[
                  "Web Developer",
                  1000,
                  "Mobile Developer",
                  1000,
                  "UI/UX Designer",
                  1000,
                  "Freelancer",
                  1000,
                ]}
                wrapper="span"
                speed={1}
                deletionSpeed={1}
                repeat={Infinity}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl"
                cursor={true}
              />
            </div>
          </h1>
          <p className="text-[#ADB7BE] text-base xs:text-xs sm:text-lg mb-6 lg:text-xl mt-8 w-full">
            Specializing in writing clean, decoupled, and testable code. Skilled in Object-Oriented Programming and versed in Agile and SCRUM methodologies. Committed to continuous learning.
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Hire Me
            </Link>
            <Link
              href="/"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 mt-4 lg:mt-0 flex justify-center"
        >
          <div className="relative rounded-full bg-[#d65a5a] w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]"
            id="header-bg">
            <Image
              src="/images/header-img1.svg"
              alt="hero image"
              layout="fill"
              objectFit="contain"
              id="header-img"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeaderSection;