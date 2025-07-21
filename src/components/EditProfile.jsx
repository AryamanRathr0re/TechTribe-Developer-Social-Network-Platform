import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [profile, setProfile] = useState(user.profile);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstName,
          LastName,
          profile,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    } catch (error) {
      console.error(
        "Error saving profile:",
        error.response || error.message || error
      );
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <>
      {/* Toast at top with animation */}
      <div className="fixed top-6 left-1/2 z-50 transform -translate-x-1/2 w-full max-w-xs pointer-events-none">
        <div
          className={`transition-all duration-500 ease-in-out ${
            showSuccess
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4"
          } pointer-events-auto`}
        >
          {showSuccess && (
            <div className="alert alert-success shadow-lg rounded-xl flex items-center justify-center">
              <span>
                Profile updated successfully.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-10 py-10">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 bg-base-300 shadow-xl rounded-3xl border border-base-200 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-base-content">
            Edit Profile
          </h2>
          <form className="space-y-4" onSubmit={saveProfile}>
            <div>
              <label className="block text-sm font-medium mb-1 text-base-content">
                First Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100 text-base-content rounded-xl shadow-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-base-content">
                Last Name
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100 text-base-content rounded-xl shadow-sm"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-base-content">
                Profile Picture URL
              </label>
              <input
                type="text"
                className="input input-bordered w-full bg-base-100 text-base-content rounded-xl shadow-sm"
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-base-content">
                Age
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-base-100 text-base-content rounded-xl shadow-sm"
                value={age === undefined || age === null ? "" : age}
                min={0}
                onChange={(e) => {
                  const val = e.target.value;
                  setAge(val === "" ? "" : Number(val));
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-base-content">
                Gender
              </label>
              <select
                className="select select-bordered w-full bg-base-100 text-base-content rounded-xl shadow-sm"
                value={gender || ""}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-base-content">
                About
              </label>
              <textarea
                rows="4"
                className="textarea textarea-bordered w-full bg-base-100 text-base-content rounded-xl shadow-sm"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Right: User Card Preview */}
        <div className="w-full lg:w-1/2 flex justify-center items-start">

          <UserCard
            user={{
              firstName,
              LastName,
              profile,
              age,
              gender,
              about,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
