import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { convertDateTime } from "../../utils/formatData";

const Claim = () => {
  const { userId, claimId } = useParams();

  const [claimData, setClaimData] = useState([]);
  useEffect(() => {
    async function fetchClaimById() {
      const response = await fetch(
        `http://localhost:3000/api/claims/${claimId}`
      );
      const data = await response.json();
      setClaimData(data.claim);
    }
    fetchClaimById();
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById("printable-report");
    const originalContent = document.body.innerHTML; // Save the original content

    document.body.innerHTML = printContent.innerHTML;

    window.print();

    document.body.innerHTML = originalContent;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <div className="flex justify-between ">
        <Link to={`/user/dashboard/${userId}`}>
          <Button>Back</Button>
        </Link>
        <h1 className="text-2xl font-semibold">Your Claim's Detail</h1>
        <Button variant="outline" onClick={handlePrint}>
          Print
        </Button>
      </div>

      {claimData && (
        <div
          className="mt-20 border p-6 rounded-lg flex flex-col gap-2 max-w-[50%] max-h-[450px] overflow-y-scroll mx-auto"
          id="printable-report"
        >
          <div className="flex justify-between">
            <p className="text-md text-[rgba(0,0,0,0.8)]">
              Claim Id:{" "}
              <span className="text-black font-medium">{claimData?._id}</span>
            </p>
          </div>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Beneficiary:{" "}
            <span className="text-black font-medium">{claimData?.name}</span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Date:{" "}
            <span className="text-black font-medium">
              {convertDateTime(claimData?.timeStamp)}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Policy Number:{" "}
            <span className="text-black font-medium">
              {claimData?.policyNumber}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Hospital Name:{" "}
            <span className="text-black font-medium">
              {claimData?.hospitalName}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Claim Amount:{" "}
            <span className="text-black font-medium">
              {claimData?.claimAmount}
            </span>
          </p>

          <p className="text-md text-[rgba(0,0,0,0.8)]">
            Issue:{" "}
            <span className="text-black font-medium">
              {claimData?.accidental && "Accident"}
              {claimData?.kidneyRelated && "Kidney Related"}
              {claimData?.heartRelated && "Heart Related"}
            </span>
          </p>

          <div className="text-[rgba(0,0,0,0.8)]">
            Description:
            <p className="text-md text-black font-medium">
              {claimData?.description}
            </p>
          </div>
        </div>
      )}

      {!claimData && (
        <div className="mt-10 md:mt-16 flex items-center justify-center">
          <h1 className="text-6xl font-bold text-gray-300">Under Process</h1>
        </div>
      )}
    </div>
  );
};

export default Claim;
