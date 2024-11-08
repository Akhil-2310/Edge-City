import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
const Navbar = () => {

  const navigate = useNavigate()

function start(){
navigate("/create")
}

const onSuccess = (result) => {
  console.log(result);
};
const handleVerify = (result) => {
  console.log(result);
};

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">Zk-soc</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1"></ul>
        </div>
        <IDKitWidget
          app_id="app_staging_fb6e2c24d875eae347de00ebfee9dd46" // obtained from the Developer Portal
          action="edge" // obtained from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // callback when the proof is received
          verification_level={VerificationLevel.Device}
        >
          {({ open }) => (
            // This is the button that will open the IDKit modal
            <button
              onClick={open}
              className="btn btn-primary btn-sm text-white"
            >
              Verify with World ID
            </button>
          )}
        </IDKitWidget>
        <div className="navbar-end">
          <button className="btn btn-primary" onClick={start}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar
