import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { convertDateTime } from "../../utils/formatData";

const Report = () => {
  const { claimId } = useParams();
  const [currClaim, setCurrClaim] = useState([]);
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    async function getReport() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/reports/${claimId}`
        );
        const data = await response.json();

        setCurrClaim(data.report);
      } catch (error) {
        console.log(error);
      }
    }
    getReport();
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById("printable-report");
    const originalContent = document.body.innerHTML; // Save the original content

    // Replace the body content with the printable content
    document.body.innerHTML = printContent.innerHTML;

    window.print();

    // Restore the original content after printing
    document.body.innerHTML = originalContent;
  };

  const user_id = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="flex justify-between ">
        <Link to={`/user/dashboard/${user_id._id}`}>
          <Button>Back</Button>
        </Link>
        <h1 className="text-2xl font-semibold">Report Detail</h1>
        <Button variant="outline" onClick={handlePrint}>
          Print
        </Button>
      </div>

      {currClaim && (
        <div
          className="mt-20 border p-6 rounded-lg flex flex-col gap-2 max-w-[50%] max-h-[450px] overflow-y-scroll mx-auto"
          id="printable-report"
        >
          <div className="flex justify-between">
            <p className="text-md text-[rgba(0,0,0,0.8)]">
              Claim Id:{" "}
              <span className="text-black font-medium">
                {currClaim?.referencedClaimId?._id}
              </span>
            </p>
            <span
              className={`font-semibold ${
                currClaim?.status === "approved"
                  ? "text-green-600"
                  : "text-red-400"
              }`}
            >
              {currClaim?.status}
            </span>
          </div>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Beneficiary:{" "}
            <span className="text-black font-medium">
              {currClaim?.referencedClaimId?.name}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Date:{" "}
            <span className="text-black font-medium">
              {convertDateTime(currClaim?.referencedClaimId?.timeStamp)}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Policy Number:{" "}
            <span className="text-black font-medium">
              {currClaim?.referencedClaimId?.policyNumber}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Hospital Name:{" "}
            <span className="text-black font-medium">
              {currClaim?.referencedClaimId?.hospitalName}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Claim Amount:{" "}
            <span className="text-black font-medium">
              {currClaim?.referencedClaimId?.claimAmount}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Issue:{" "}
            <span className="text-black font-medium">
              {currClaim?.referencedClaimId?.accidental && "Accident"}
              {currClaim?.referencedClaimId?.kidneyRelated && "Kidney Related"}
              {currClaim?.referencedClaimId?.heartRelated && "Heart Related"}
            </span>
          </p>

          <div className="text-[rgba(0,0,0,0.8)]">
            Description:
            <p className="text-md text-black font-medium">
              {currClaim?.referencedClaimId?.description}
            </p>
          </div>

          <div className="text-[rgba(0,0,0,0.8)]">
            Note:
            <p className="text-md text-black font-medium">{currClaim?.note}</p>
          </div>
        </div>
      )}

      {!currClaim && (
        <div className="mt-10 md:mt-16 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-gray-300">Under Process</h1>
        </div>
      )}
    </div>
  );
};

export default Report;
