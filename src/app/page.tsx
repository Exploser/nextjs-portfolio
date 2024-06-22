import AboutSection from "./components/AboutSection";
import AchievementsSection from "./components/AchievementsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import HeaderSection from "./components/Header";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#121212] container px-12 pt-8 pb-0 xs:mx-2 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto  xs:px-4">
      <section className="container xs:mx-2 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto px-12 py-4">
        <HeaderSection />
        <AchievementsSection />
        <AboutSection />
        <ProjectsSection />
        <EmailSection />
      </section>
      <Footer />
    </main>
  );
}
