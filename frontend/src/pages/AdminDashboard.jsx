import { Link } from "react-router-dom";
import ClaimList from "../components/ClaimList";
import DashboardBox from "../components/DashboardBox";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [allClaims, setAllClaims] = useState([]);

  useEffect(() => {
    async function fetchAllClaims() {
      const response = await fetch(
        "http://localhost:3000/api/claims/admin/allClaims"
      );
      const data = await response.json();
      setAllClaims(data.claims);
    }
    fetchAllClaims();
  }, []);

  console.log(allClaims);
  return (
    <div className="px-4 py-6 max-w-[1400px] mx-auto">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Hello <span>Admin</span>!
        </h1>
      </div>

      {/* stats */}
      <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        <DashboardBox label={"Total Claims"} count={allClaims?.length} />
        <DashboardBox label={"Claims Approved"} count={"NA"} />
        <DashboardBox label={"Claims Rejected"} count={"NA"} />
      </div>

      {/* recent claims => UI would be different unlike user's */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold">All Claims</h3>
        <ul className="mt-4 flex flex-col gap-2">
          {allClaims &&
            allClaims?.map((item) => (
              <li key={item._id} className="flex justify-between items-center border rounded-lg px-2 py-2">
                <p>
                  <span className="bg-[rgba(0,0,0,0.05)] border text-[0.7rem] p-1 px-2 rounded-md mr-2">
                    claim id
                  </span>{" "}
                  {item._id}
                </p>
                <p className="flex gap-5 items-center justify-center">
                  <span className="text-[0.7rem] bg-[rgba(0,0,0,0.05)] p-2 rounded-md">
                    {item.accidental && "Accident"}
                    {item.heartRelated && "Heart"}
                    {item.kidneyRelated && "Kidney"}
                  </span>
                  <Link to={`/user/report/${item._id}`}>
                    <Button variant="outline" className="min-w-[100px]">
                      View Report
                    </Button>
                  </Link>
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
