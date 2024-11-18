import ClaimList from "../components/ClaimList";
import DashboardBox from "../components/DashboardBox";
import React, { useEffect } from "react";

const AdminDashboard = () => {
  let claims = [];

  // useEffect(()=>{
  //   async function fetchAllClaims(){
  //     const response = await fetch("http://localhost:3000/")
  //   }
  // },[])
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
          {claims?.map((item) => (
            <ClaimList
              key={item._id}
              title={item._id}
              status={item.status}
              data={item}
              userId={userId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
