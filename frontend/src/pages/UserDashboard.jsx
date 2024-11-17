// import { useAuth } from "@clerk/clerk-react";
import React from "react";
import DashboardBox from "../components/DashboardBox";
import ClaimList from "../components/ClaimList";
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
import claims from "../../utils/demoData";

const UserDashboard = () => {
  // const { userId } = useAuth();
  // console.log(userId);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Creating Claim");
  }

  return (
    <div className="px-4 py-6 max-w-[1400px] mx-auto">
      <div className="my-5 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Hello <span>User</span>!
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
                  type="text"
                  defaultValue=""
                  placeholder="Claim Title"
                  className="font-semibold"
                />
                <Input
                  type="number"
                  defaultValue=""
                  placeholder="Policy Number"
                  className="font-semibold"
                />
                <Input
                  type="text"
                  defaultValue=""
                  placeholder="Hospital Name"
                  className="font-semibold"
                />
                <Input
                  type="text"
                  defaultValue=""
                  placeholder="Full Name"
                  className="font-semibold"
                />
                <Input
                  type="number"
                  min={0}
                  defaultValue=""
                  placeholder="Claim Amount"
                  className="font-semibold"
                />
                <Textarea
                  className="w-[100%]  font-semibold resize-none"
                  placeholder="Description ..."
                />
              </div>

              <label>Issue:</label>
              <RadioGroup
                defaultValue="option-one"
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
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hear" />
                  <label className="font-semibold">Hear Related</label>
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
        <DashboardBox label={"Total Claims"} count={2} />
        <DashboardBox label={"Claims Approved"} count={1} />
        <DashboardBox label={"Claims Rejected"} count={1} />
      </div>

      {/* recent claims */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold">Recent Claims</h3>
        <ul className="mt-4 flex flex-col gap-2">
          {claims.map((item, index) => (
            <ClaimList
              key={item.id}
              title={item.name}
              status={item.status}
              data={item}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
