import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const AdminLogin = () => {
  return (
    <div className="p-5 min-h-[100dvh] flex flex-col items-center justify-center">
        <h1 className="text-6xl text-center font-semibold">Admin Portal</h1>
      <form className="mt-20 flex flex-col gap-2 w-full md:w-[40%] mx-auto" >
        <Input type="text" placeholder="Username" required/>
        <Input type="password" placeholder="Password" required/>
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default AdminLogin;
