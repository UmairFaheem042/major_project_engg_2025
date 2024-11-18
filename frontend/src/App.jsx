import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import AuthSignIn from "./pages/AuthSignIn";
import AuthSignUp from "./pages/AuthSignUp";
import Header from "./components/Header";
import Report from "./pages/Report";
import AdminLogin from "./pages/AdminLogin";
import Claim from "./pages/Claim";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<LandingPage />} />
    //     <Route path="/sign-in" element={<AuthSignIn/>}/>
    //     <Route path="/sign-in" element={<AuthSignIn/>}/>

    //     {/* Protected Routes */}
    //     <Route
    //       path="/user/dashboard/[userId]"
    //       element={
    //         <ProtectedRoute>
    //           <UserDashboard />
    //         </ProtectedRoute>
    //       }
    //     />
    //   </Routes>
    // </Router>

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={<AuthSignIn />} />
        <Route path="/sign-up" element={<AuthSignUp />} />

        <Route
          path="/user/dashboard/:userId"
          element={
            <>
              <Header />
              <UserDashboard />
            </>
          }
        />
        <Route
          path="/user/:userId/report/:claimId"
          element={
            <>
              <Header />
              <Report />
            </>
          }
        />
        <Route
          path="/user/:userId/claim/:claimId"
          element={
            <>
              <Header />
              <Claim />
            </>
          }
        />
        <Route
          path="/admin-login"
          element={
            <>
              <AdminLogin />
            </>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <>
              <AdminDashboard />
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
