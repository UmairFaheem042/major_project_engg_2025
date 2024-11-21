import React, { useEffect, useState } from "react";
import DashboardBox from "../components/DashboardBox";
import ClaimList from "../components/ClaimList";
import Error from "../pages/Error";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const UserDashboard = () => {
  const [policyNumber, setPolicyNumber] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [description, setDescription] = useState("");
  const [issueType, setIssueType] = useState("");
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState(false);
  // const [approvedClaims, setApprovedClaims] = useState(0);
  // const [rejectedClaims, setRejectedClaims] = useState(0);

  const { userId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.title = "VMed - Dashboard";
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const requestData = {
      policyNumber,
      hospitalName,
      email,
      name,
      claimAmount,
      description,
      accidental: issueType === "accident",
      kidneyRelated: issueType === "kidney",
      heartRelated: issueType === "heart",
    };

    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        "http://localhost:3000/api/claims/createClaim",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestData),
        }
      );
      console.log(response);
      if (!response.ok) {
        toast.error("An Error Occurred");
        return;
      }

      const data = await response.json();
      setClaims((prev) => [...prev] + data);
      window.location.reload();
      setPolicyNumber("");
      setHospitalName("");
      setEmail("");
      setName("");
      setClaimAmount("");
      setDescription("");
      setIssueType("");
    } catch (error) {
      console.error("Error creating claim:", error);
      toast.error("Something went wrong!");
    }
  }

  useEffect(() => {
    async function fetchAllClaimsById() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/claims/${userId}/claims`
        );
        const data = await response.json();

        setClaims(data);
      } catch (error) {
        setError(true);
      }
    }

    fetchAllClaimsById();
  }, []);

  return (
    <div className="px-4 py-6 max-w-[1400px] mx-auto">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Hello <span className="text-blue-500">{user?.name}</span>
        </h1>
        <Dialog className="w-[100%] ">
          <DialogTrigger asChild>
            <Button variant="">New Claim</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">New Claim</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 py-4">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Registered Email"
                  className="font-semibold"
                />
                <Input
                  type="text"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  placeholder="Policy Number"
                  className="font-semibold"
                />
                <Input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="Hospital Name"
                  className="font-semibold"
                />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="font-semibold"
                />
                <Input
                  type="number"
                  min={0}
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  placeholder="Claim Amount"
                  className="font-semibold"
                />
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[100%]  font-semibold resize-none"
                  placeholder="Description ..."
                />
              </div>

              <label>Issue:</label>
              <RadioGroup
                value={issueType}
                onValueChange={(value) => setIssueType(value)}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="accident" />
                  <label className="font-semibold">Accident</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="heart" />
                  <label className="font-semibold">Heart Related</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kidney" />
                  <label className="font-semibold">Kidney Related</label>
                </div>
              </RadioGroup>
              <div className="flex gap-3 justify-end mt-5">
                <Button type="submit">Create</Button>
                <DialogTrigger asChild>
                  <Button variant="outline" type="reset">
                    Cancel
                  </Button>
                </DialogTrigger>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* stats */}
      <div className="mt-10 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        <DashboardBox label={"Total Claims"} count={claims?.length} />
        <DashboardBox label={"Claims Approved"} count={"NA"} />
        <DashboardBox label={"Claims Rejected"} count={"NA"} />
      </div>

      {/* recent claims */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold">Recent Claims</h3>
        {!error ? (
          <ul className="mt-4 flex flex-col gap-2">
            {claims &&
              claims?.map((item) => (
                <ClaimList
                  key={item._id}
                  title={item._id}
                  data={item}
                  userId={userId}
                />
              ))}
          </ul>
        ) : (
          <div className="flex flex-col ">
            <p className="mt-2 text-red-500 italic text-md font-medium">
              Error in fetching Claims
            </p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserDashboard;
