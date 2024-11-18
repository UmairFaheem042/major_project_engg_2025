import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ClaimList = ({ title, data, userId }) => {
  return (
    <li className="flex justify-between items-center border rounded-lg px-2 py-2">
      <p>
        <span className="bg-[rgba(0,0,0,0.05)] border text-[0.7rem] p-1 px-2 rounded-md mr-2">
          claim id
        </span>{" "}
        {title}
      </p>
      <p className="flex gap-5 items-center justify-center">
        <span className="text-[0.7rem] bg-[rgba(0,0,0,0.05)] p-2 rounded-md">
          {data.accidental && "Accident"}
          {data.heartRelated && "Heart"}
          {data.kidneyRelated && "Kidney"}
        </span>
        <Link to={`/user/${userId}/claim/${data._id}`}>
          <Button variant="outline" className="min-w-[100px]">
            View Claim
          </Button>
        </Link>
        <Link to={`/user/${userId}/report/${data._id}`}>
          <Button variant="outline" className="min-w-[100px]">
            View Report
          </Button>
        </Link>
      </p>
    </li>
  );
};

export default ClaimList;
