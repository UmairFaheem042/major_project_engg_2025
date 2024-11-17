import { SignUp, useAuth } from "@clerk/clerk-react";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthSignIn = () => {
  // const { isSignedIn, userId } = useAuth();

  // if (isSignedIn) {
  //   return <Navigate to={`/user/dashboard/${userId}`} />;
  // }

  return (
    <section className="flex items-center justify-center p-2">
      <SignUp />
    </section>
  );
};

export default AuthSignIn;
