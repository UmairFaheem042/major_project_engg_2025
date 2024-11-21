import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";

const AuthSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "VMed - Sign In";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          policyNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || "Registration failed");
      }

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      
      toast.info("Redirecting to Dashboard...");
      setTimeout(() => {
        navigate(`/user/dashboard/${result.user._id}`);
      }, 1000);
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-white relative">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block  lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex min-h-screen items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="flex flex-col w-full max-w-xl lg:max-w-3xl">
              <h1 className="text-2xl font-bold flex gap-2 items-center text-gray-900 sm:text-2xl md:text-2xl">
                Welcome to <img src={Logo} className="h-[40px]" alt="" />
              </h1>

              <form
                onSubmit={handleSubmit}
                className="mt-8 w-full flex flex-col gap-6"
              >
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    className="mt-1 w-full rounded-md border p-2 bg-white text-sm text-gray-700 shadow-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    min={0}
                    className="mt-1 w-full rounded-md  border p-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    {" "}
                    Policy Number{" "}
                  </label>

                  <input
                    type="text"
                    value={policyNumber}
                    onChange={(e) => setPolicyNumber(e.target.value)}
                    className="mt-1 w-full rounded-md  border p-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="flex flex-col gap-4 items-center ">
                  <Button
                    className={`border-blue-600 bg-blue-600 hover:bg-blue-400 ${
                      loading && "pointer-events-none"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Redirecting ..." : "Login"}
                  </Button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?
                    <Link to="/sign-up" className="text-gray-700 underline">
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
      <ToastContainer position="top-right" />
    </>
  );
};

export default AuthSignIn;
