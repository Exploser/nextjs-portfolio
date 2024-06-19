"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "TacoTunes: Find new music!",
    description: "Spotify Web API project to find new music based on your taste.",
    image: "/images/projects/0.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/SpotiShare",
    previewUrl: "https://wrapifer.vercel.app/",
  },
  {
    id: 2,
    title: "Exploser Blogs: Personal Blogs",
    description: "A simple blog application made with wordpress.",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/Personal-Blog-Site",
    previewUrl: "https://exploserblogs.com/",
  },
  {
    id: 3,
    title: "Exploser Portfolio: Personal Portfolio",
    description: "A simple portfolio application with Next, React, and TailwindCSS.",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Exploser/portfolio-website",
    previewUrl: "https://exploser.info/",
  },
  {
    id: 4,
    title: "Food Ordering Application",
    description: "Project 4 description",
    image: "/images/projects/4.png",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Keep It Up: Keyboard Wallmount",
    description: "A simple wall mount for displaying and storing your keyboard.",
    image: "/images/projects/keep-it-up.jpeg",
    tag: ["All", "3D Models"],
    previewUrl: "https://than.gs/m/1056436",
  },
  {
    id: 6,
    title: "Tweet Ahead: Twitter Scheduler",
    description: "Schedule your tweets ahead of time",
    image: "/images/projects/tweet-ahead.png",
    tag: ["All", "Web"],
    previewUrl: "https://github.com/Exploser/Posts-Scheduler",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: React.SetStateAction<string>) => {
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
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="3D Models"
          isSelected={tag === "3D Models"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
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