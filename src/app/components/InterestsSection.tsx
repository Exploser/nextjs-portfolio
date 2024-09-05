import Image from "next/image";
import { useDarkMode } from "../context/DarkModeContext";

const InterestsSection = () => {
    const { darkMode } = useDarkMode();

    const interests = [
        { id: 1, image: darkMode? "/images/interests/web-dev-dark.svg" : "/images/interests/web-dev-light.svg", text: 'Website Development' },
        { id: 2, image: darkMode? "/images/interests/3d-design-dark.svg" : "/images/interests/3d-design-light.svg", text: '3D Designs' },
        { id: 3, image: darkMode? "/images/interests/arduino-dark.svg" : "/images/interests/arduino-light.svg", text: 'Embedded Systems' },
        { id: 4, image: darkMode? "/images/interests/database-dark.svg" : "/images/interests/database-light.svg", text: 'Database Development' },
        { id: 5, image: darkMode? "/images/interests/api-dark.svg" : "/images/interests/api-light.svg", text: 'API Creation' },
        { id: 6, image: darkMode? "/images/interests/mobile-dev-dark.svg" : "/images/interests/mobile-dev-light.svg", text: 'Mobile Development' },
        { id: 7, image: darkMode? "/images/interests/automation-dark.svg" : "/images/interests/automation-light.svg", text: 'Automation' },
        { id: 8, image: darkMode? "/images/interests/more-dark.svg" : "/images/interests/more-light.svg", text: 'More...' },
    ];


    return (
        <section className={`min-h-fit flex flex-col md:my-20 lg:my-20 my-0 ${darkMode ? 'text-white' : 'text-black'}`} id="about">
            <h2 className="text-4xl font-bold md:ml-28 lg:ml-28 sm:m-0">
                <span className={darkMode ? 'text-animation-small' : 'text-animation-small-light'}>Fields of Interest</span>,
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {interests.map(interest => (
                    <div key={interest.id} className="flex flex-col items-center text-center hover:scale-125 transition-transform">
                        <Image src={interest.image} alt={interest.text} width={64} height={64} className="my-4" />
                        <p className="text-lg font-medium">{interest.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default InterestsSection;