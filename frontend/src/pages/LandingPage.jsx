import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const LandingPage = () => {
  return (
    <div className="p-4 flex flex-col items-center  min-h-screen gap-10">
      <img src={Logo} className="h-[40px]" />
      <div className="flex-1 flex gap-5 flex-col items-center justify-center">
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold">
          Easy, Fast and <br /> Secure{" "}
          <span className="text-blue-500">Claims</span>
        </h1>
        <div className="flex gap-2">
          <Link to="/sign-up" className="font-medium">
            <Button className="min-w-[120px] bg-blue-500">Get Started</Button>
          </Link>
          <Link to="/sign-in" className="font-medium ">
            <Button className="min-w-[120px]" variant="secondary">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
