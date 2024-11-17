import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-3">
      <Link to="/">
        <span className="font-semibold">LOGO</span>
      </Link>
      <div>
        <Button variant="secondary">Sign Out</Button>
      </div>
    </header>
  );
};

export default Header;
