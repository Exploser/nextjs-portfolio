"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import GitHubCalendar from 'react-github-calendar';
import { useDarkMode } from "../context/DarkModeContext";

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const AchievementsSection = () => {
  const { darkMode } = useDarkMode();
  const [profilePicture, setProfilePicture] = useState("");
  const [username, setUsername] = useState("exploser");
  const [achievementsList, setAchievementsList] = useState([
    {
      metric: "Projects",
      value: "10",
      postfix: "+",
    },
    {
      prefix: "~",
      metric: "Users",
      value: "300",
    },
    {
      metric: "Awards",
      value: "7",
    },
    {
      metric: "Gists",
      value: "5",
    },
  ]);

  useEffect(() => {
    fetch("https://api.github.com/users/exploser", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: GitHubUser) => {
        // Update the achievements list with GitHub data
        setAchievementsList([
          {
            metric: "Projects",
            value: data.public_repos.toString(),
          },
          {
            metric: "Followers",
            value: data.followers.toString(),
          },
          {
            metric: "Following",
            value: data.following.toString(),
          },
          {
            metric: "Gists",
            value: data.public_gists.toString(),
          },
        ]);
        setProfilePicture(data.avatar_url);
        setUsername(data.login);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <section className="w-full my-20">
      <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 w-full">
        <span className={`text-3xl font-bold pb-4 ml-8 ${darkMode ? 'text-animation-small' : 'text-slate-800'}`}>
          My GitHub Contributions,
        </span>
        <div className={`flex justify-center items-center p-4 sm:border rounded-md mt-4 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-600 border-gray-300'}`}>
          <div className="text-center mr-4">
            <img src={profilePicture} className="w-32 h-32 rounded-full" alt="Profile"></img>
            <a href="https://github.com/Exploser"><span className={`text-2xl font-bold pt-2 ${darkMode ? 'text-white' : 'text-slate-300'}`}>@{username}</span></a>
          </div>
          <GitHubCalendar username="exploser" colorScheme={darkMode ? "dark" : "light"} />
        </div>
        <div className={`sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
          {achievementsList.map((achievement, index) => (
            <div key={index} className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0">
              <h2 className={`text-4xl font-bold flex flex-row ${darkMode ? 'text-white' : 'text-black'}`}>
                {achievement.prefix}
                <AnimatedNumbers
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className={`text-4xl font-bold`}
                />
                {achievement.postfix}
              </h2>
              <p className={`text-base ${darkMode ? 'text-[#ADB7BE]' : 'text-gray-700'}`}>{achievement.metric}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
