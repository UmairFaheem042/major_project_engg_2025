import ClaimList from "@/components/ClaimList";
import DashboardBox from "@/components/DashboardBox";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="px-4 py-6 max-w-[1400px] mx-auto">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Hello <span>Admin</span>!
        </h1>
      </div>

      {/* stats */}
      <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        <DashboardBox label={"Total Claims"} count={2} />
        <DashboardBox label={"Claims Approved"} count={1} />
        <DashboardBox label={"Claims Denied"} count={1} />
      </div>

      {/* recent claims */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold">Recent Claims</h3>
        <ul className="mt-4 flex flex-col gap-2">
          <ClaimList title={"Claim_1"} status={"Approved"} />
          <ClaimList title={"Claim_2"} status={"Declined"} />
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
