import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Identity } from "@semaphore-protocol/identity";
import { ApiSdk } from "@bandada/api-sdk";
import { useNavigate } from 'react-router-dom';

import { Result } from 'postcss';

const CreateGroup = () => {

    const [identity, setIdentity] = useState("")
     const [groupType, setGroupType] = useState("normal");
     const [name, setName] = useState("");
     const [description, setDescription] = useState("");
     const navigate = useNavigate()

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814";
  const credentials = {
    id: "TWITTER_FOLLOWERS",
    criteria: {
      minFollowers: 1,
    },
  };

  const groupCreateDetails = {
    name,
    description,
    treeDepth: 16,
    fingerprintDuration: 3600,
    credentials,
  };


        try {
          const group = await apiSdk.createGroup(groupCreateDetails, apiKey);
          console.log("Group created:", group);
          saveGroupToLocal(groupCreateDetails);
          alert("Group created successfully!");
          navigate("/all")
        } catch (error) {
          console.error("Error creating group:", error);
          alert("Error creating group. Please try again.");
        }
      };

         const saveGroupToLocal = (group) => {
           const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
           savedGroups.push(group);
           localStorage.setItem("groups", JSON.stringify(savedGroups));
         };

const apiSdk = new ApiSdk();
function generateSemaphoreIdentity() {
  if (!identity) {
    const newIdentity = new Identity();
    setIdentity(newIdentity);
    toast.success(
      "Identity generated successfully!" + newIdentity.commitment.toString()
    );
  } else {
    toast.info("Identity already exists.")
  }
}



  return (
    <>
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
        <div className="navbar-end">
          <button
            className="btn btn-primary"
            onClick={generateSemaphoreIdentity}
          >
            Generate Identity
          </button>
          <ToastContainer />
        </div>
      </div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create Group</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Group Name */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Group Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Group Description */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Group Type */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Group Type</label>
            <select
              value={groupType}
              onChange={(e) => setGroupType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="normal">Normal Group</option>
              <option value="credential">Credential Group</option>
            </select>
          </div>

          {/* Credential Options */}
          {groupType === "credential" && (
            <div className="mb-4">
              <h3 className="text-md font-semibold mb-2">Select Credentials</h3>

              {/* GitHub Followers */}
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">
                  GitHub Followers
                </label>
                <input
                  type="number"
                  placeholder="Minimum followers"
                  //   onChange={(e) =>
                  //     handleCredentialChange(
                  //       "GITHUB_FOLLOWERS",
                  //       "minFollowers",
                  //       e.target.value
                  //     )
                  //   }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Blockchain Transactions */}
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">
                  Blockchain Transactions
                </label>
                <input
                  type="number"
                  placeholder="Minimum transactions"
                  //   onChange={(e) =>
                  //     handleCredentialChange(
                  //       "BLOCKCHAIN_TRANSACTIONS",
                  //       "minTransactions",
                  //       e.target.value,
                  //       "Sepolia"
                  //     )
                  //   }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>

              {/* Twitter Followers */}
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">
                  Twitter Followers
                </label>
                <input
                  type="number"
                  placeholder="Minimum followers"
                  //   onChange={(e) =>
                  //     handleCredentialChange(
                  //       "TWITTER_FOLLOWERS",
                  //       "minFollowers",
                  //       e.target.value
                  //     )
                  //   }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="m-5 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Create Group
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateGroup


       // const github = async () => {
//   const credentials = {
//     id: "GITHUB_FOLLOWERS",
//     criteria: {
//       minFollowers: 1,
//     },
//   };

//   const groupCreateDetails = {
//     name: "Group edge2234",
//     description: "This is Group edge.",
//     treeDepth: 16,
//     fingerprintDuration: 3600,
//     credentials,
//   };
//   const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814";

//   const group = await apiSdk.createGroup(groupCreateDetails, apiKey);
// };