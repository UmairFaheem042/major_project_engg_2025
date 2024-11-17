import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import React from "react";
import { Link, Navigate } from "react-router-dom";

const LandingPage = () => {
  //   const { isSignedIn, userId } = useAuth();
  //   if (isSignedIn) {
  //     return <Navigate to={`/user/dashboard/${userId}`} />;
  //   }

  return (
    <div className="p-4 flex flex-col items-center  min-h-screen gap-10">
      <h1 className=" text-xl">ProjectName</h1>
      <div className="flex-1 flex gap-5 flex-col items-center justify-center">
        <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-bold">
          Easy, Fast and <br /> Secure{" "}
          <span className="text-green-500">Claims</span>
        </h1>
        <div className="flex gap-2">
          <Link to="/sign-up" className="font-medium">
            {/* <button className="text-sm font-medium px-6 py-2 border rounded-md min-w-[120px]">
              Get Started
            </button> */}
            <Button className="min-w-[120px]">Get Started</Button>
          </Link>
          <Link to="/sign-in" className="font-medium">
            {/* <button className="text-sm px-6 py-2 border rounded-md min-w-[120px] bg-black text-white">
              Login
            </button> */}
            <Button className="min-w-[120px]" variant="secondary">
              Login
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="flex flex-col items-center justify-center">
        <p>Project Contributors</p>
        <ul className="flex gap-5">
          <li>Khushi</li>
          <li>Ujjwal</li>
          <li>Umair</li>
          <li>Vinay</li>
        </ul>
      </div> */}
    </div>
  );
};

export default LandingPage;
