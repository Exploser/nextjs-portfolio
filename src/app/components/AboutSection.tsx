"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="pl-2" id="skills">
        <li className="skill">
          <img src="/images/tools/node-js.svg"></img>
          <span className="tooltip">NodeJS</span>
        </li>
        <li className="skill">
          <img src="/images/tools/express-js.svg"></img>
          <span className="tooltip">Express</span>
        </li>
        <li className="skill">
          <img src="/images/tools/postgres-sql.svg"></img>
          <span className="tooltip">Postgres SQL</span>
        </li>
        <li className="skill">
          <img src="/images/tools/firebase.svg"></img>
          <span className="tooltip">Firebase</span>
        </li>
        <li className="skill">
          <img src="/images/tools/javascript.svg"></img>
          <span className="tooltip">Javascript & Typescript</span>  
        </li>
        <li className="skill">
          <img src="/images/tools/react.svg"></img>
          <span className="tooltip">React</span>
        </li>
        <li className="skill">
          <img src="/images/tools/c-sharp.svg"></img>
          <span className="tooltip">C#</span>
        </li>
        <li className="skill">
          <img src="/images/tools/next-js.svg"></img>
          <span className="tooltip">NextJS</span>
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li className="skill">Fullstack Academy of Code</li>
        <li className="skill">University of California, Santa Cruz</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li className="skill">AWS Cloud Practitioner</li>
        <li className="skill">Google Professional Cloud Developer</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white min-h-fit" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image alt='About Me' src="/images/header-img2.svg" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className="flex flex-row justify-between mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-2">
            {/* Add a Spinner Here */}
            {isPending ? "Loading..." : null}
            {TAB_DATA.find((t) => t.id === tab)?.content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;