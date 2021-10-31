import React from "react";
import Menu from "./icons/Menu";
import Logo from "./Logo";

const Header = () => {
  return (
    <div className="flex fixed items-center container h-16 border-b border-gray-300">
      <Menu className="sm:hidden w-16" />
      <Logo />
    </div>
  );
};

export default Header;
