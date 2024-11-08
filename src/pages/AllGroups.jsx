import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllGroups = () => {
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(savedGroups);
  }, []);

  const handleJoinGroup = (group) => {
    console.log("Joining group:", group.name);
    // Add your joining logic here
    navigate(`/group/${group.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">All Groups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group, index) => (
          <div key={index} className="border p-4 rounded-md shadow">
            <h3 className="text-lg font-bold">{group.name}</h3>
            <p className="text-gray-700">{group.description}</p>

            {/* Conditionally render credentials if they exist */}
            {group.credentials && group.credentials.credentials && (
              <div className="mt-2">
                <p className="font-semibold">Criteria:</p>
                {group.credentials.credentials.map((cred, i) => (
                  <p key={i} className="text-gray-600">
                    {cred.id}: {Object.values(cred.criteria).join(", ")}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={() => handleJoinGroup(group)}
              className="mt-4 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              Join Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGroups;
