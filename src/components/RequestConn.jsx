import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import BASE_URL from "../utils/constants";

const RequestConn = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error("Error fetching requests:", error.message);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  if (!Array.isArray(requests)) return <h1>Loading...</h1>;
  if (requests.length === 0) return <h1>No connections found...</h1>;

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="font-bold text-3xl mb-8 text-primary">Request</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
        {requests.map((request, idx) => {
          const { firstName, LastName, profile, age, gender, about, skills } =
            request.fromUserId || {};

          return (
            <div
              key={request._id || idx}
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
              <div className="flex gap-3 mt-6">
               
                               <button className="btn btn-active btn-accent">Accept</button>

                <button className="btn btn-active btn-secondary">
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RequestConn;
