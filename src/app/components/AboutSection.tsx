"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { useDarkMode } from "../context/DarkModeContext";

const AboutSection = () => {

  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const { darkMode } = useDarkMode();

  const TAB_DATA = [
    {
      title: "Skills",
      id: "skills",
      content: (
        <ul className="pl-2" id="skills">
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/node-js.svg" : "/images/tools/node-js-dark.svg" }`} alt="Node JS" width={100} height={100} />
            <span className="tooltip">NodeJS</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/express-js.svg" : "/images/tools/express-js-dark.svg"}`} alt="Express JS" width={100} height={100} />
            <span className="tooltip">Express</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/postgre-sql.svg" : "/images/tools/postgre-sql-dark.svg"}`} alt="Postgres SQL" width={100} height={100} />
            <span className="tooltip">Postgres SQL</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/firebase.svg" : "/images/tools/firebase-dark.svg"}`} alt="Firebase" width={100} height={100} />
            <span className="tooltip">Firebase</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/javascript.svg" : "/images/tools/javascript-dark.svg"}`} alt="Javascript & Typescript" width={100} height={100} />
            <span className="tooltip">Javascript & Typescript</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/react.svg" : "/images/tools/react-dark.svg"}`} alt="React" width={100} height={100} />
            <span className="tooltip">React</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/c-sharp.svg" : "/images/tools/c-sharp-dark.svg"}`} alt="C#" title="C#" width={100} height={100} />
            <span className="tooltip">C#</span>
          </li>
          <li className="skill">
            <Image src={`${darkMode? "/images/tools/next-js.svg" : "/images/tools/next-js-dark.svg"}`} alt="NextJS" width={100} height={100} />
            <span className="tooltip">NextJS</span>
          </li>
        </ul>
      ),
    },
    {
      title: "Education",
      id: "education",
      content: (
        <ul className="pl-2" id="education">
          <li className="skill">
            <a href="https://commons.wikimedia.org/wiki/File:Conestoga_College_logo.svg">
              <Image src="https://upload.wikimedia.org/wikipedia/commons/4/46/Conestoga_College_logo.svg" alt="Conestoga College" width={100} height={100} />
              <span className="tooltip">Conestoga College</span>
            </a>
          </li>
          <li className="skill">
            Software Engineering Technology Advanced Diploma
          </li>
        </ul>
      ),
    },
    {
      title: "Content",
      id: "content",
      content: (
        <ul className="list-disc pl-2">
          <li className="skill">AWS Cloud Practitioner</li>
          <li className="skill">Google Professional Cloud Developer</li>
        </ul>
      ),
    },
  ];

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className={`min-h-fit flex flex-col md:my-20 lg:my-20 my-0 ${darkMode ? 'text-white' : 'text-black'}`} id="about">
      <h2 className="text-4xl font-bold md:ml-28 lg:ml-28 sm:m-0">
        <span className={darkMode ? 'text-animation-small' : 'text-animation-small-light'}>Who am I?</span>,
      </h2>
      <div className={`md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-8 xl:px-8`}>
        <Image alt='About Me' src="/images/header-img2.svg" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className={`flex flex-row justify-between mt-8 md:px-12 lg:px-12 rounded-xl items-center bg-opacity-35 ${darkMode? 'bg-none' : 'bg-black'}`} >
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("content")}
              active={tab === "content"}
            >
              Content
            </TabButton>
          </div>
          <div className="mt-8">
            {isPending ? (
              <div className="flex justify-center items-center">
                <div className="spinner"></div>
              </div>
            ) : (
              TAB_DATA.find((t) => t.id === tab)?.content
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;