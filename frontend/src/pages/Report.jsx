import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useParams } from "react-router-dom";
import claims from "../../utils/demoData";


const Report = () => {
  const { claimId } = useParams();
  const currClaim = claims.find((claim) => claim.id === parseInt(claimId));

  const handlePrint = () => {
    const printContent = document.getElementById("printable-report");
    const originalContent = document.body.innerHTML; // Save the original content

    // Replace the body content with the printable content
    document.body.innerHTML = printContent.innerHTML;

    window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalContent;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="flex justify-between ">
        <Link to="/user/dashboard/123">
          <Button>Back</Button>
        </Link>
        <h1 className="text-2xl font-semibold">Report Detail</h1>
        <Button variant="outline" onClick={handlePrint}>Print</Button>
      </div>

      <div className="mt-20 border p-6 rounded-lg flex flex-col gap-2 max-w-[50%] max-h-[450px] overflow-y-scroll mx-auto" id="printable-report">
        <div className="flex justify-between">
          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Name:{" "}
            <span className="text-black font-medium">{currClaim.name}</span>
          </p>
          <span
            className={`font-semibold ${
              currClaim.status === "Approved" ? "text-green-600" : "text-red-400"
            }`}
          >
            {currClaim.status}
          </span>
        </div>

        <p className="text-md text-[rgba(0,0,0,0.8)]">
          Beneficiary:{" "}
          <span className="text-black font-medium">
            {currClaim.beneficiary}
          </span>
        </p>

        <p className="text-md text-[rgba(0,0,0,0.8)]">
          Data: <span className="text-black font-medium">{currClaim.date}</span>
        </p>

        <p className="text-md text-[rgba(0,0,0,0.8)]">
          Policy Number:{" "}
          <span className="text-black font-medium">
            {currClaim.policyNumber}
          </span>
        </p>

        <p className="text-md text-[rgba(0,0,0,0.8)]">
          Hospital Name:{" "}
          <span className="text-black font-medium">
            {currClaim.hospitalName}
          </span>
        </p>

        <p className="text-md text-[rgba(0,0,0,0.8)]">
          Claim Amount:{" "}
          <span className="text-black font-medium">
            {currClaim.claimAmount}
          </span>
        </p>

        <p className="text-md text-[rgba(0,0,0,0.8)]">
          Issue:{" "}
          <span className="text-black font-medium">{currClaim.issue}</span>
        </p>

        <div className="text-[rgba(0,0,0,0.8)]">
          Description:
          <p className="text-md text-black font-medium">
            {currClaim.description}
          </p>
        </div>

        <div className="text-[rgba(0,0,0,0.8)]">
          Note:
          <p className="text-md text-black font-medium">{currClaim.note}</p>
        </div>
      </div>
    </div>
  );
};

export default Report;
