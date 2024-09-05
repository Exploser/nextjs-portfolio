'use client';

import AboutSection from "./components/AboutSection";
import AchievementsSection from "./components/AchievementsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import HeaderSection from "./components/Header";
import InterestsSection from "./components/InterestsSection";
import ProjectsSection from "./components/ProjectsSection";
import { useDarkMode } from "./context/DarkModeContext";

export default function Home() {
  const { darkMode } = useDarkMode();
  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-24 bg-[#121212] container px-12 pt-8 pb-0 xs:mx-2 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto xs:px-4 ${darkMode ? 'dark' : 'light'}`}>
      <section className="container xs:mx-2 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto px-12 py-4">
        <HeaderSection />
        <AchievementsSection />
        <AboutSection />
        <InterestsSection />
        <ProjectsSection />
        <EmailSection />
      </section>
      <Footer />
    </main>
  );
}
