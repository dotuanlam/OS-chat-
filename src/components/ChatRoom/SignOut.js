import React from "react";
import { Button } from "antd";
import { signOut } from "firebase/auth";
import { auth } from "../FireBase/index";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
function SignOut() {
  const navigate = useNavigate();
  const handleButtonSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.setItem("token", false);
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error With SignOut");
      });
    return;
  };
  return (
    <div>
      <Button
        style={{
          borderRadius: "1rem",
          padding: "1rem",
          display: "flex",
          border: "4px solid rgb(255, 255, 255)",
          alignItems: "center",
        }}
        type="primary"
        onClick={handleButtonSignOut}
      >
        Sign Out
        <LogoutOutlined />
      </Button>
    </div>
  );
}

export default SignOut;
