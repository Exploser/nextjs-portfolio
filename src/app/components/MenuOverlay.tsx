import React from "react";
import Navlink from "./Navlink";

type Link = {
  path: string;
  title: string;
};

const MenuOverlay = ({ links }: { links: Link[] }) => {
  return (
    <div className=" bg-black bg-opacity-50 py-2 mt-40">
      <ul className="flex flex-col items-center h-full">
        {links.map((link, index) => (
          <li key={index}>
            <Navlink href={link.path} title={link.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuOverlay;