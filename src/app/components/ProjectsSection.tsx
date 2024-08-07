"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";

const projectsData = [
  {
    id: 1,
    title: "Tweet Ahead: Twitter Scheduler",
    description: "Schedule your tweets ahead of time",
    image: "/images/projects/Tweet-Ahead.jpg",
    tag: ["All", "Web"],
    previewUrl: "https://github.com/Exploser/Posts-Scheduler",
  },
  {
    id: 2,
    title: "Exploser Blogs: Personal Blogs",
    description: "A simple blog application made with wordpress.",
    image: "/images/projects/Blogs.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/Personal-Blog-Site",
    previewUrl: "https://exploserblogs.com/",
  },
  {
    id: 3,
    title: "Exploser Portfolio: Personal Portfolio",
    description: "A simple portfolio application with Next, React, and TailwindCSS.",
    image: "/images/projects/Portfolio.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/portfolio-website",
    previewUrl: "https://exploser.info/",
  },
  {
    id: 4,
    title: "Cling Disk: Hard Drive Wallmount",
    description: "A simple wall mount for displaying and storing your hard drives.",
    image: "/images/projects/cling-disk.jpg",
    tag: ["All", "3D Models"],
    previewUrl: "https://than.gs/m/1056499",
  },
  {
    id: 4,
    title: "Keep It Up: Keyboard Wallmount",
    description: "A simple wall mount for displaying and storing your keyboard.",
    image: "/images/projects/keep-it-up.jpeg",
    tag: ["All", "3D Models"],
    previewUrl: "https://than.gs/m/1056436",
  },
  {
    id: 5,
    title: "TacoTunes: Find new music!",
    description: "Spotify Web API project to find new music based on your taste.",
    image: "/images/projects/Taco-Tunes.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/SpotiShare",
    previewUrl: "https://wrapifer.vercel.app/",
  },
  {
    id: 6,
    title: "Sort-my-stuff: Simple File Organizer",
    description: "A file organizer that sorts your files based on their type.",
    image: "/images/projects/sort-my-stuff.jpg",
    tag: ["All", "Software"],
    gitUrl: "https://github.com/Exploser/sort-my-files",
  },
  {
    id: 7,
    title: "Sorting Visualizer: Interactive Sorting Algorithm Web App",
    description: "An interactive web application to visualize various sorting algorithms",
    image: "/images/projects/sorting-visualizer.jpeg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/algorithm-visualizer",
    previewUrl: "https://loser-algorithm-visualiser.vercel.app/",
  },
  {
    id: 8,
    title: "Loser AI: Multi Modal AI Generator",
    description: "A multi modal AI generator that generates text, images, music and video.",
    image: "/images/projects/loser-ai.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/Loser-AI",
    previewUrl: "https://loserai.vercel.app/",
  },
  {
    id: 9,
    title: "TunaTunes: Music Recommendation System",
    description: "A music recommendation system that suggests music based on your taste.",
    image: "/images/projects/TunaTunes.jpg",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/TunaTunes",
    previewUrl: "https://tuna-tunes.vercel.app",
  }
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { darkMode } = useDarkMode();

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className={`my-20 ${darkMode ? 'bg-dark text-white' : 'bg-light text-black'}`}>
      <h2 className={`text-start md:ml-28 lg:ml-28 sm:ml-0 text-4xl font-bold mt-4 mb-8 md:mb-12 ${darkMode ? 'text-animation-small' : 'text-animation-small-light'}`}>
        Things that I have made,
      </h2>
      <div className={`flex flex-row justify-center items-center gap-2 py-6 w-full`}>
        <div className={`p-4 rounded-xl ${darkMode ? 'text-white' : 'bg-black bg-opacity-20'}`}>
          <ProjectTag
            onClick={() => handleTagChange("All")}
            name="All"
            isSelected={tag === "All"}
          />
          <ProjectTag
            onClick={() => handleTagChange("Web")}
            name="Web"
            isSelected={tag === "Web"}
          />
          <ProjectTag
            onClick={() => handleTagChange("3D Models")}
            name="3D Models"
            isSelected={tag === "3D Models"}
          />
          <ProjectTag
            onClick={() => handleTagChange("Software")}
            name="Software"
            isSelected={tag === "Software"}
          />
          <ProjectTag
            onClick={() => handleTagChange("Old")}
            name="Old"
            isSelected={tag === "Old"}
          />
        </div>
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.slice().reverse().map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
