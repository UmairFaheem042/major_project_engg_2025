import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ClaimList = ({ title, status, data }) => {
  return (
    <li className="flex justify-between items-center border rounded-lg p-4">
      <span>{title}</span>
      <p className="flex gap-5 items-center justify-center">
        <span
          className={`${
            status === "Approved" ? "text-green-600" : "text-red-400"
          } font-semibold`}
        >
          {status}
        </span>
        <Link to={`/claim/${data.id}`}>
          <Button variant="outline" className='min-w-[100px]'>
            View
          </Button>
        </Link>
      </p>
    </li>
  );
};

export default ClaimList;
