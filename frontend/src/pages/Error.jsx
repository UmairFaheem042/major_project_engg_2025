import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="text-center min-h-[90vh] flex items-center justify-center flex-col">
      <h1 className="text-9xl font-black text-gray-200">404</h1>

      <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Uh-oh!
      </p>

      <p className="mt-4 text-gray-500">We can't find that page.</p>

      <Link to="#" className="mt-5">
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default Error;
