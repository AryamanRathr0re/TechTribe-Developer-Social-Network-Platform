import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";
import {
  FaUser,
  FaInfo,
  FaCode,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
} from "react-icons/fa";

const SUGGESTED_SKILLS = [
  "React",
  "Node.js",
  "TypeScript",
  "Python",
  "Next.js",
  "MongoDB",
  "Express",
  "Tailwind CSS",
  "DevOps",
  "UI/UX",
];

const SUGGESTED_INTERESTS = [
  "Open Source",
  "Hackathons",
  "Startups",
  "AI/ML",
  "Web3",
  "Mobile Apps",
  "Competitive Programming",
  "Freelancing",
];

const steps = [
  { id: 0, label: "Basic Info", icon: <FaUser /> },
  { id: 1, label: "About You", icon: <FaInfo /> },
  { id: 2, label: "Skills", icon: <FaCode /> },
  { id: 3, label: "Interests", icon: <FaHeart /> },
  { id: 4, label: "Preview", icon: <FaCheck /> },
];

const Onboarding = () => {
  const user = useSelector((store) => store.user) || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [LastName, setLastName] = useState(user.LastName || "");
  const [profile, setProfile] = useState(
    user.profile ||
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=400"
  );
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(
    user.about ||
      "Tech enthusiast ready to collaborate on exciting projects! 🚀"
  );
  const [skills, setSkills] = useState(user.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [interests, setInterests] = useState(user.interests || []);
  const [newInterest, setNewInterest] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const progress = ((step + 1) / steps.length) * 100;

  const addSkill = (value) => {
    const skill = (value ?? newSkill).trim();
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const addInterest = (value) => {
    const interest = (value ?? newInterest).trim();
    if (interest && !interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
    setNewInterest("");
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter((i) => i !== interestToRemove));
  };

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = async () => {
    try {
      setSaving(true);
      setError("");
      const payload = {
        firstName,
        LastName,
        profile,
        about,
        skills,
        interests,
      };
      if (age) payload.age = age;
      // Only send gender if user actually selected a valid option
      if (gender) payload.gender = gender;

      const res = await axios.post(`${BASE_URL}/profile/edit`, payload, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (err) {
      console.error("Onboarding save error:", err);
      setError(
        err?.response?.data?.message ||
          "❌ Could not save your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
            Let's set up your{" "}
            <span className="tinder-gradient">TechTribe profile</span> ✨
          </h1>
          <p className="text-white/70">
            Just a few quick steps so we can show you the best matches.
          </p>
        </motion.div>

        {/* Stepper */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <span className="font-semibold">
                Step {step + 1} of {steps.length}
              </span>
              <span>•</span>
              <span>{steps[step].label}</span>
            </div>
            <span className="text-white/60 text-xs">
              You can change this later from your profile
            </span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-xs text-white/50">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`flex flex-col items-center gap-1 ${
                  step === s.id ? "text-white" : ""
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                    step >= s.id
                      ? "bg-gradient-to-r from-pink-500 to-red-500 text-white"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  {s.icon}
                </div>
                <span className="hidden md:block">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 text-white px-4 py-2 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left: Form steps */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/15 p-6 md:p-8 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-3">
                    Basic Info
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-1">
                        First Name
                      </label>
                      <input
                        className="input input-bordered w-full bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">
                        Last Name
                      </label>
                      <input
                        className="input input-bordered w-full bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-1">
                        Age
                      </label>
                      <input
                        type="number"
                        min={18}
                        max={100}
                        className="input input-bordered w-full bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="24"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">
                        Gender
                      </label>
                      <select
                        className="select select-bordered w-full bg-white/15 border-white/30 text-white rounded-xl"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="" className="bg-gray-800">
                          Prefer not to say
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
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-1">
                      Profile Photo URL
                    </label>
                    <input
                      className="input input-bordered w-full bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                      value={profile}
                      onChange={(e) => setProfile(e.target.value)}
                      placeholder="https://..."
                    />
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-3">
                    About You
                  </h2>
                  <p className="text-white/60 text-sm">
                    Share a short intro so others know what you're looking for.
                  </p>
                  <textarea
                    rows="5"
                    className="textarea textarea-bordered w-full bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="I'm a React dev interested in building cool side projects with other learners..."
                  />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-3">
                    Skills
                  </h2>
                  <p className="text-white/60 text-sm">
                    Pick your main tech skills. This helps us match you better.
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      className="input input-bordered flex-1 bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addSkill())
                      }
                      placeholder="Add a skill (e.g., React, Python)"
                    />
                    <button
                      type="button"
                      onClick={() => addSkill()}
                      className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {SUGGESTED_SKILLS.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => addSkill(skill)}
                        className={`px-3 py-1 rounded-full text-xs md:text-sm border ${
                          skills.includes(skill)
                            ? "bg-pink-500 text-white border-pink-400"
                            : "bg-white/5 text-white/80 border-white/20 hover:bg-white/15"
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-pink-500/30 rounded-full text-white text-xs flex items-center gap-2"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-3">
                    Interests
                  </h2>
                  <p className="text-white/60 text-sm">
                    What are you most excited about in tech or collaboration?
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      className="input input-bordered flex-1 bg-white/15 border-white/30 text-white placeholder-white/50 rounded-xl"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addInterest())
                      }
                      placeholder="Add an interest (e.g., Open Source)"
                    />
                    <button
                      type="button"
                      onClick={() => addInterest()}
                      className="btn bg-gradient-to-r from-pink-500 to-red-500 text-white border-none rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {SUGGESTED_INTERESTS.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => addInterest(interest)}
                        className={`px-3 py-1 rounded-full text-xs md:text-sm border ${
                          interests.includes(interest)
                            ? "bg-purple-500 text-white border-purple-400"
                            : "bg-white/5 text-white/80 border-white/20 hover:bg-white/15"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1 bg-purple-500/30 rounded-full text-white text-xs flex items-center gap-2"
                      >
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="hover:text-red-300"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-2">
                    You're all set! 🎉
                  </h2>
                  <p className="text-white/70 text-sm mb-2">
                    Here's how your profile will look to others. You can still
                    edit everything later.
                  </p>
                  <ul className="list-disc list-inside text-white/70 text-sm space-y-1">
                    <li>We’ll use your skills and interests to recommend matches.</li>
                    <li>You can refine your profile anytime from the Profile page.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm border ${
                  step === 0
                    ? "border-white/10 text-white/40 cursor-not-allowed"
                    : "border-white/30 text-white hover:bg-white/10"
                }`}
              >
                <FaChevronLeft /> Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:shadow-xl"
                >
                  Next <FaChevronRight />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Finish & See Matches"}
                </button>
              )}
            </div>
          </motion.div>

          {/* Right: Live preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden lg:block"
          >
            <h3 className="text-white/80 text-sm mb-3 text-center">
              Live Preview 👀
            </h3>
            <div className="sticky top-24">
              <UserCard
                user={{
                  firstName,
                  LastName,
                  profile,
                  age,
                  gender,
                  about,
                  skills,
                  interests,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;




