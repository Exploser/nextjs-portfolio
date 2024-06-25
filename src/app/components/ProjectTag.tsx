import React from "react";

const ProjectTag = ({ name, onClick, isSelected }: { name: string, onClick: (name: string) => void, isSelected: boolean }) => {
    const buttonStyles = isSelected
        ? "text-white border-[rgba(214,90,90,255)] mx-6"
        : "text-gray-500 border-slate-600 hover:border-white mx-4";
    return (
        <button
            className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
            onClick={() => onClick(name)}
        >
            {name}
        </button>
    );
};

export default ProjectTag;