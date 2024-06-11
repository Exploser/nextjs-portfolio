import AboutSection from "./components/AboutSection";
import HeaderSection from "./components/Header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#121212] container mx-auto px-12 py-8 ">
      <HeaderSection />
      <AboutSection />
    </main>
  );
}
