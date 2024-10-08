import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDarkMode } from "../context/DarkModeContext";

interface ProjectCardProps {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl?: string;
  previewUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  const { darkMode } = useDarkMode();

  return (
    <div>
      <div
        className="h-72 md:h-72 relative group rounded-xl overflow-hidden shadow-xl transition-all duration-500 bg-no-repeat bg-center bg-cover"
        style={{ background: `url(${imgUrl})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}
      >
        <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
          {gitUrl && (
            <Link
              href={gitUrl}
              target="_blank"
              className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
            >
              <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            </Link>
          )}
          {previewUrl && (
            <Link
              href={previewUrl}
              target="_blank"
              className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
            >
              <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
            </Link>
          )}
        </div>
      </div>
      <div className={`rounded-b-xl mt-3 px-4 ${darkMode ? ' text-white' : 'text-slate-900'}`}>
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className={`text-base ${darkMode ? 'text-[#ADB7BE]' : 'text-slate-700'}`}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
