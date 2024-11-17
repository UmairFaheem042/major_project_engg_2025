import { SignIn, useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthSignIn = () => {
  // const { isSignedIn, userId } = useAuth();

  // if (isSignedIn) {
  //   return <Navigate to={`/user/dashboard/${userId}`} />;
  // }

  return (
    <section className="bg-white">
      <main className="flex items-center justify-center px-8 py-8 ">
        <SignIn />
      </main>
    </section>
  );
};

export default AuthSignIn;
