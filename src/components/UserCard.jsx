import React, { useState } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";
const UserCard = ({ user }) => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const { _id, firstName, LastName, profile, age, gender, about } = user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
      setToast({
        show: true,
        message:
          status === "interested"
            ? "Interest sent successfully!"
            : "User ignored successfully!",
      });
      setTimeout(() => setToast({ show: false, message: "" }), 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative">
      {toast.show && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-base-300 border border-primary shadow-lg px-6 py-3 rounded-lg animate-fade-in z-50">
          <span className="text-primary font-semibold">{toast.message}</span>
        </div>
      )}
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user.profile} alt="photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName + " " + user.LastName}</h2>
          <p>{age}</p>
          <p>{gender}</p>
          <p>{user.about}</p>
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
