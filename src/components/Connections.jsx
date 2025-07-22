import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;

  if (connections.length === 0) return <h1>No connections found...</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="font-bold text-3xl mb-8 text-primary">Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {connections.map((connection, idx) => {
          const {
            _id,
            firstName,
            LastName,
            profile,
            age,
            gender,
            about,
            skills,
          } = connection;

          return (
            <div
              key={_id || idx}
              className="bg-base-200 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
            >
              <img
                alt="profile"
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary shadow"
                src={profile}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://ui-avatars.com/api/?name=" +
                    encodeURIComponent(firstName + " " + LastName);
                }}
              />
              <h2 className="text-lg font-semibold text-base-content mb-1">
                {firstName + " " + LastName}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {age} years • {gender}
              </p>
              <p className="text-sm text-base-content mb-2 text-center">
                {about}
              </p>

              {skills && Array.isArray(skills) && skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="badge badge-primary badge-outline text-xs px-2 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <button
                onClick={() => navigate(`/chat/${_id}`)}
                className="mt-4 btn btn-sm btn-primary px-4"
              >
                Chat
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
