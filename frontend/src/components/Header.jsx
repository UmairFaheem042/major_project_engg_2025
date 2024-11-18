import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { userId } = useParams();
  function handleLogOut() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <header className="border-b sticky top-0 left-0 w-full bg-white">
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-4 py-3">
        <Link to={`/user/dashboard/${userId}`}>
          <span className="font-semibold">ProjectName</span>
        </Link>
        <div>
          <Button onClick={handleLogOut} variant="secondary">
            Sign Out
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
