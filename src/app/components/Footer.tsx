import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer w-screen border-t text-white">
      <div className="container mx-auto p-6 sm:p-0 xs:p-0 flex flex-col md:flex-row justify-between items-center">
        <Image src="/logo.svg" alt="Exploser Logo" width={60} height={60} />
        <p className="text-slate-400 mt-4 md:mt-0">Icons by @<a className="underline" href="https://www.svgrepo.com/">SVGRepo</a> </p>
      </div>
    </footer>
  );
};

export default Footer;