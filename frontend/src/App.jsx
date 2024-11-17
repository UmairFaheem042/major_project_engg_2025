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
          path="/claim/:claimId"
          element={
            <>
              <Header />
              <Report/>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
