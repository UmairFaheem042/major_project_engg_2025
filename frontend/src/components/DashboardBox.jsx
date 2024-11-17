import React from "react";

const DashboardBox = ({label, count}) => {
  let boxColor;
  let textColor;
  let countColor;
  if(label === "Claims Approved"){
    boxColor = "bg-green-200"
    textColor = "text-green-600"
    countColor = "text-green-700"
  }
  else if(label === "Claims Rejected"){
    boxColor = "bg-red-200"
    textColor = "text-red-600"
    countColor = "text-red-700"
  }
  else{
    boxColor = "bg-transparent"
    textColor = "text-black"
    countColor = "text-black"
  }
  return (
    <div className={`h-[150px] ${boxColor} flex flex-col justify-between border-2 border-[rgba(0,0,0,0.08)] p-3 rounded-lg`}>
      <h2 className={`text-lg font-semibold ${textColor}`}>{label}</h2>
      <h1 className={`text-end text-5xl font-bold ${countColor}`}>{count}</h1>
    </div>
  );
};

export default DashboardBox;
