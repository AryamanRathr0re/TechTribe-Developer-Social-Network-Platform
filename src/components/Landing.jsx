import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/tech.png";

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
      <main className="flex-grow">
        <section
          className="relative flex flex-col md:flex-row items-center justify-between w-full px-0 md:px-8 py-20 overflow-hidden rounded-none animate-fade-in"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,41,59,0.7),rgba(30,41,59,0.7)), url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-base-300/80 to-transparent z-0"></div>
          <div className="md:w-1/2 space-y-6 relative z-10 animate-slide-in-left">
            <h2 className="text-5xl font-bold text-base-content leading-tight">
              Welcome to{" "}
              <span className="text-primary glow-text">TechTribe</span>
            </h2>
            <p className="text-lg text-base-content/80">
              A vibrant tech community built to connect, share knowledge, and
              grow together. Join us in reshaping the future of technology.
            </p>
            <div className="space-x-4 flex flex-wrap">
              <Link to="/feed">
                <button className="btn btn-primary rounded-xl transition-transform duration-300 hover:scale-110 animate-bounce-short">
                  Join Now
                </button>
              </Link>
              <button className="btn btn-outline rounded-xl border-base-content text-base-content transition-transform duration-300 hover:scale-105 animate-fade-in delay-200">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10 animate-slide-in-right">
            <img
              src={heroImg}
              alt="TechTribe illustration"
              className="w-full max-w-xs md:max-w-sm rounded-3xl border-4 border-primary shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-primary/40 animate-fade-in"
            />
          </div>
        </section>

        <section
          id="features"
          className="bg-base-100 py-16 animate-fade-in delay-200"
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-base-content mb-8">
              Why Join TechTribe?
            </h3>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="p-8 bg-base-200 rounded-2xl shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105 animate-slide-in-up">
                {/* Connect Icon */}
                <div className="mb-4 bg-primary/10 rounded-full p-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.5 6.75A2.25 2.25 0 1120 9a2.25 2.25 0 01-2.5-2.25zM6.5 17.25A2.25 2.25 0 114 15a2.25 2.25 0 012.5 2.25zM15.75 9.75l-7.5 4.5"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-primary mb-2">
                  Connect
                </h4>
                <p className="text-base-content/80">
                  Meet developers, designers, and creators from across the
                  world.
                </p>
              </div>
              <div className="p-8 bg-base-200 rounded-2xl shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105 animate-slide-in-up delay-100">
                {/* Learn Icon */}
                <div className="mb-4 bg-primary/10 rounded-full p-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-primary mb-2">
                  Learn
                </h4>
                <p className="text-base-content/80">
                  Stay updated with the latest trends, tools, and technologies.
                </p>
              </div>
              <div className="p-8 bg-base-200 rounded-2xl shadow-md flex flex-col items-center transition-transform duration-300 hover:scale-105 animate-slide-in-up delay-200">
                {/* Grow Icon */}
                <div className="mb-4 bg-primary/10 rounded-full p-4 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-primary mb-2">
                  Grow
                </h4>
                <p className="text-base-content/80">
                  Enhance your skills and boost your career with real
                  opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="join"
          className="py-20 bg-base-300 text-center animate-fade-in delay-300"
        >
          <h3 className="text-3xl font-bold text-base-content mb-4">
            Become a part of TechTribe
          </h3>
          <p className="text-base-content/80 mb-8">
            It takes less than a minute to get started
          </p>
          <Link to="/feed">
            <button className="btn btn-primary px-10 py-3 text-lg rounded-xl transition-transform duration-300 hover:scale-110 animate-bounce-short">
              Join the Tribe
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Landing;
