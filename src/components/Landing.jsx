import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-300 flex flex-col">
  

      <main className="flex-grow">
        <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-20">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-5xl font-bold text-base-content leading-tight">
              Welcome to <span className="text-primary">TechTribe</span>
            </h2>
            <p className="text-lg text-base-content/80">
              A vibrant tech community built to connect, share knowledge, and
              grow together. Join us in reshaping the future of technology.
            </p>
            <div className="space-x-4">
              <button className="btn btn-primary rounded-xl"> <Link to="/feed">
            Join Now
            </Link></button>
              <button className="btn btn-outline rounded-xl border-base-content text-base-content">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://illustrations.popsy.co/gray/website-launch.svg"
              alt="TechTribe illustration"
              className="w-full max-w-md"
            />
          </div>
        </section>

        <section id="features" className="bg-base-100 py-16">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3  className="text-3xl font-bold text-base-content mb-8">
                
              Why Join TechTribe?
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="p-6 bg-base-200 rounded-2xl shadow-md">
                <h4 className="text-xl font-semibold text-primary mb-2">
                  Connect
                </h4>
                <p className="text-base-content/80">
                  Meet developers, designers, and creators from across the
                  world.
                </p>
              </div>
              <div className="p-6 bg-base-200 rounded-2xl shadow-md">
                <h4 className="text-xl font-semibold text-primary mb-2">
                  Learn
                </h4>
                <p className="text-base-content/80">
                  Stay updated with the latest trends, tools, and technologies.
                </p>
              </div>
              <div className="p-6 bg-base-200 rounded-2xl shadow-md">
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

        <section id="join" className="py-20 bg-base-300 text-center">
          <h3 className="text-3xl font-bold text-base-content mb-4">
            Become a part of TechTribe
          </h3>
          <p className="text-base-content/80 mb-8">
            It takes less than a minute to get started
          </p>
          <button className="btn btn-primary px-10 py-3 text-lg rounded-xl">
            <Link to="/feed">
            Join the Tribe
            </Link>
          </button>
        </section>
      </main>

    
    </div>
  );
};

export default Landing;
