import React from "react";
import Navlink from "./Navlink";

type Link = {
  path: string;
  title: string;
};

const MenuOverlay = ({ links }: { links: Link[] }) => {
  return (
    <ul className="flex flex-col py-2 items-center h-full">
      {links.map((link, index) => (
        <li key={index}>
          <Navlink href={link.path} title={link.title} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;