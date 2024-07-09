"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import Navlink from "./Navlink";
import MenuOverlay from "./MenuOverlay";
import Image from "next/image";
import { useDarkMode } from "../context/DarkModeContext";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`sticky top-0 z-50 flex justify-between items-center text-xl font-semibold duration-100 h-20 ${scrolled ? 'scrolled bg-black bg-opacity-60 p-4 text-slate-800 h-12' : 'text-white bg-transparent h-20 p-2'}`}>
        <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className={`text-2xl md:text-5xl font-semibold ${scrolled? 'text-black' : 'text-white'}`}
        >
          <div className={`logo ${scrolled ? 'items-center justify-center' : 'hidden'}`}>
            <Image
              src="/logo.svg"
              alt="Exploser Logo"
              width={40}
              height={40}
            />
          </div>
          <span className={`flex text-2xl font-semibold bg-clip-text text-center text-transparent ${darkMode?'bg-gradient-to-tr from-slate-400 to-transparent' : 'bg-gradient-to-r from-slate-800 to-transparent'} ${scrolled ? 'hidden' : ''}`}>
            {darkMode? 'Exp/loser' : 'Ex-l0ser'}
          </span>
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Navlink href={link.path} title={link.title} />
              </li>
            ))}
            <button onClick={toggleDarkMode} className="ml-4 p-2">
              {darkMode ? <SunIcon className="h-6 w-6 text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-gray-500" />}
            </button>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
};

export default Navbar;