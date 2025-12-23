import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import {
  FaSave,
  FaTimes,
  FaPlus,
  FaUser,
  FaImage,
  FaBirthdayCake,
  FaVenusMars,
  FaInfo,
  FaCode,
  FaCheckCircle,
  FaGithub,
  FaLinkedin,
  FaGlobe,
  FaEnvelope,
  FaFolderOpen,
  FaHeart,
} from "react-icons/fa";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [LastName, setLastName] = useState(user.LastName);
  const [profile, setProfile] = useState(user.profile);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [photos, setPhotos] = useState(
    user.photos || [user.profile].filter(Boolean)
  );
  const [newPhoto, setNewPhoto] = useState("");
  const [verifications, setVerifications] = useState(
    user.verifications || {
      email: false,
      github: false,
      linkedin: false,
      portfolio: false,
    }
  );
  const [verificationLinks, setVerificationLinks] = useState(
    user.verificationLinks || {
      github: "",
      linkedin: "",
      portfolio: "",
    }
  );
  const [projects, setProjects] = useState(user.projects || []);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    url: "",
    techStack: "",
  });
  const [interests, setInterests] = useState(user.interests || []);
  const [newInterest, setNewInterest] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Backend rejects some system-managed fields; send only editable ones.
      const payload = {
        firstName,
        LastName,
        profile,
        about,
        gender,
        skills,
      };

      if (age !== "" && age !== null && age !== undefined) {
        payload.age = age;
      }

      const res = await axios.post(
        BASE_URL + "/profile/edit",
        payload,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(
        "Error saving profile:",
        error.response || error.message || error
      );
      setError(
        error.response?.data?.message ||
          "❌ Something went wrong. Please try again."
      );
    }
  };

  const addSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const addPhoto = () => {
    if (newPhoto && !photos.includes(newPhoto) && photos.length < 9) {
      setPhotos([...photos, newPhoto]);
      setNewPhoto("");
    }
  };

  const removePhoto = (photoToRemove) => {
    setPhotos(photos.filter((photo) => photo !== photoToRemove));
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, { ...newProject, id: Date.now() }]);
      setNewProject({ title: "", description: "", url: "", techStack: "" });
    }
  };

  const removeProject = (projectId) => {
    setProjects(projects.filter((p) => p.id !== projectId));
  };

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
            Edit Your <span className="tinder-gradient">Profile</span> ✨
          </h1>
          <p className="text-white/70 text-xl">Make yourself shine! 🌟</p>
        </motion.div>

        {/* Success Toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
                <FaCheckCircle className="text-2xl" />
                <span className="font-bold text-lg">
                  Profile updated successfully! 🎉
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Toast */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-red-500 text-white px-8 py-4 rounded-full shadow-2xl">
                <span className="font-bold text-lg">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8"
          >
            <form className="space-y-6" onSubmit={saveProfile}>
              {/* First Name */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaUser /> First Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaUser /> Last Name
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>

              {/* Profile Picture URL */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaImage /> Profile Picture URL
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={profile}
                  onChange={(e) => setProfile(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  required
                />
                {profile && (
                  <div className="mt-3 w-24 h-24 rounded-full overflow-hidden border-2 border-pink-500">
                    <img
                      src={profile}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Age */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaBirthdayCake /> Age
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={age === undefined || age === null ? "" : age}
                  min={18}
                  max={100}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAge(val === "" ? "" : Number(val));
                  }}
                  placeholder="25"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaVenusMars /> Gender
                </label>
                <select
                  className="select select-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={gender || ""}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" className="bg-gray-800">
                    Select Gender
                  </option>
                  <option value="male" className="bg-gray-800">
                    👨 Male
                  </option>
                  <option value="female" className="bg-gray-800">
                    👩 Female
                  </option>
                  <option value="others" className="bg-gray-800">
                    🧑 Other
                  </option>
                </select>
              </div>

              {/* About */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaInfo /> About Me
                </label>
                <textarea
                  rows="4"
                  className="textarea textarea-bordered w-full bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell us about yourself... 🚀"
                ></textarea>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaCode /> Skills
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill (e.g., React, Python)"
                    className="input input-bordered flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addSkill}
                    className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-xl shadow-lg"
                  >
                    <FaPlus />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      className="badge badge-lg bg-gradient-to-r from-pink-500/30 to-red-500/30 backdrop-blur-sm border border-pink-500/50 text-white cursor-pointer hover:bg-red-500/50 transition-colors gap-2 px-3 py-2"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill} ⚡
                      <FaTimes className="text-xs" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Photo Gallery */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaImage /> Photo Gallery ({photos.length}/9)
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="url"
                    placeholder="Add photo URL"
                    className="input input-bordered flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={newPhoto}
                    onChange={(e) => setNewPhoto(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addPhoto())
                    }
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addPhoto}
                    disabled={photos.length >= 9}
                    className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-xl shadow-lg disabled:opacity-50"
                  >
                    <FaPlus />
                  </motion.button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-pink-500/50"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removePhoto(photo)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTimes className="text-xs" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Badges */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaCheckCircle /> Verification & Links
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 flex items-center gap-2">
                      <FaEnvelope /> Email Verified
                    </span>
                    <input
                      type="checkbox"
                      checked={verifications.email}
                      onChange={(e) =>
                        setVerifications({
                          ...verifications,
                          email: e.target.checked,
                        })
                      }
                      className="checkbox checkbox-primary"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 flex items-center gap-2">
                      <FaGithub /> GitHub
                    </span>
                    <input
                      type="url"
                      placeholder="https://github.com/username"
                      value={verificationLinks.github}
                      onChange={(e) =>
                        setVerificationLinks({
                          ...verificationLinks,
                          github: e.target.value,
                        })
                      }
                      className="input input-bordered flex-1 max-w-xs bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl text-sm ml-2"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 flex items-center gap-2">
                      <FaLinkedin /> LinkedIn
                    </span>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={verificationLinks.linkedin}
                      onChange={(e) =>
                        setVerificationLinks({
                          ...verificationLinks,
                          linkedin: e.target.value,
                        })
                      }
                      className="input input-bordered flex-1 max-w-xs bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl text-sm ml-2"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 flex items-center gap-2">
                      <FaGlobe /> Portfolio
                    </span>
                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={verificationLinks.portfolio}
                      onChange={(e) =>
                        setVerificationLinks({
                          ...verificationLinks,
                          portfolio: e.target.value,
                        })
                      }
                      className="input input-bordered flex-1 max-w-xs bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl text-sm ml-2"
                    />
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaHeart /> Interests & Preferences
                </label>
                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add interest (e.g., Open Source, Startups)"
                    className="input input-bordered flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/50 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addInterest())
                    }
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addInterest}
                    className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-xl shadow-lg"
                  >
                    <FaPlus />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/30 rounded-full text-white text-sm flex items-center gap-2"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => removeInterest(interest)}
                        className="hover:text-red-300"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects Showcase */}
              <div>
                <label className="block text-white/90 mb-2 font-semibold flex items-center gap-2">
                  <FaFolderOpen /> Projects Showcase
                </label>
                <div className="space-y-3 mb-3">
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    className="input input-bordered w-full bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl"
                  />
                  <textarea
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    className="textarea textarea-bordered w-full bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl"
                    rows="2"
                  />
                  <input
                    type="url"
                    placeholder="Project URL (GitHub/Live Demo)"
                    value={newProject.url}
                    onChange={(e) =>
                      setNewProject({ ...newProject, url: e.target.value })
                    }
                    className="input input-bordered w-full bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Tech Stack (e.g., React, Node.js)"
                    value={newProject.techStack}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        techStack: e.target.value,
                      })
                    }
                    className="input input-bordered w-full bg-white/20 border-white/30 text-white placeholder-white/50 rounded-xl"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={addProject}
                    className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none rounded-xl w-full"
                  >
                    <FaPlus className="mr-2" /> Add Project
                  </motion.button>
                </div>
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white/10 rounded-xl p-3 flex items-start justify-between"
                    >
                      <div className="flex-1">
                        <h4 className="text-white font-bold">
                          {project.title}
                        </h4>
                        <p className="text-white/70 text-sm">
                          {project.description}
                        </p>
                        {project.techStack && (
                          <p className="text-pink-300 text-xs mt-1">
                            {project.techStack}
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeProject(project.id)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn w-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 text-white border-none text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaSave className="mr-2" />
                Save Changes ✨
              </motion.button>
            </form>
          </motion.div>

          {/* Right - Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-start"
          >
            <div className="sticky top-24">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Live Preview 👀
              </h3>
              <UserCard
                user={{
                  firstName,
                  LastName,
                  profile: photos[0] || profile,
                  age,
                  gender,
                  about,
                  skills,
                  photos,
                  verifications,
                  interests,
                  projects,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
