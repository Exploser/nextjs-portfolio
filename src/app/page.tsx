import AboutSection from "./components/AboutSection";
import AchievementsSection from "./components/AchievementsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import HeaderSection from "./components/Header";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#121212] container mx-auto px-12 pt-8 pb-0 ">
      <section className="container mt-24 mx-auto px-12 py-4">
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
