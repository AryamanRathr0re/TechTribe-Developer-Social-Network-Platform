import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaTimes,
  FaComment,
  FaHandshake,
  FaRocket,
  FaStar,
  FaCode,
} from "react-icons/fa";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col overflow-hidden">
      <main className="flex-grow relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 bg-pink-500/20 rounded-full blur-3xl top-20 left-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-20 right-20"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-12 py-20 md:py-32 min-h-screen">
          {/* Left: Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 space-y-8 px-6 z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4">
              <FaRocket className="text-pink-400 animate-bounce" />
              <span className="text-white/90 text-sm font-semibold">
                TechTribe 🚀
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              <span className="tinder-gradient">Swipe.</span>
              <br />
              <span className="text-white">Match.</span>
              <br />
              <span className="tinder-gradient">Connect. 💫</span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed">
              Find your perfect tech match! Discover developers, designers, and
              innovators nearby. Start building amazing projects together! 🎯✨
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/feed">
                  <button className="tinder-btn bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 text-white text-lg font-bold px-8 py-4 shadow-lg hover:shadow-xl">
                    🚀 Get Started Free
                  </button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#features">
                  <button className="tinder-btn bg-white/10 backdrop-blur-md text-white border-2 border-white/30 text-lg font-bold px-8 py-4 hover:bg-white/20">
                    📖 Learn More
                  </button>
                </a>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white/70 text-sm">Active Users 🎉</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">5K+</div>
                <div className="text-white/70 text-sm">Matches Made ❤️</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-white/70 text-sm">Projects Started 🚀</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Card Stack Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10"
          >
            <div className="relative w-80 h-[500px]">
              {/* Card 1 - Back */}
              <motion.div
                className="absolute inset-0 -rotate-6 rounded-3xl border-4 border-pink-500/30 shadow-2xl overflow-hidden bg-white"
                animate={{ rotate: [-6, -8, -6] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                  <div className="font-bold text-xl">Alex, 24</div>
                  <div className="text-sm">Frontend Dev ⚡</div>
                </div>
              </motion.div>

              {/* Card 2 - Middle */}
              <motion.div
                className="absolute inset-0 -rotate-3 translate-y-2 rounded-3xl border-4 border-purple-500/30 shadow-2xl overflow-hidden bg-white"
                animate={{ rotate: [-3, -5, -3], y: [8, 12, 8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
                  <div className="font-bold text-xl">Sam, 22</div>
                  <div className="text-sm">UI Designer 🎨</div>
                </div>
              </motion.div>

              {/* Card 3 - Top */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-4 border-pink-500 shadow-2xl overflow-hidden bg-white"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                  <div className="font-bold text-2xl mb-1">Jordan, 26</div>
                  <div className="text-base mb-4">Data Scientist 📊</div>
                </div>

                {/* Action Buttons */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center"
                  >
                    <FaTimes className="text-2xl text-red-500" />
                  </motion.button>
                  <Link to="/feed">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-14 h-14 rounded-full bg-white shadow-xl flex items-center justify-center"
                    >
                      <FaHeart className="text-2xl text-green-500" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="relative z-10 bg-black/40 backdrop-blur-sm py-24 px-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                <span className="tinder-gradient">How It Works</span>{" "}
                <FaStar className="inline text-pink-400" />
              </h2>
              <p className="text-xl text-white/70">
                Connect with tech talent in three simple steps! 🎯
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Swipe */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative group"
              >
                <div className="p-8 bg-gradient-to-br from-pink-500/20 to-red-500/20 backdrop-blur-md rounded-3xl border border-pink-500/30 shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 h-full">
                  <div className="mb-6 w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <FaHeart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    1. Swipe 💫
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Swipe right to like, left to pass. It's that simple! Find
                    profiles that catch your eye. 👀✨
                  </p>
                </div>
              </motion.div>

              {/* Match */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl border border-purple-500/30 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 h-full">
                  <div className="mb-6 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <FaHandshake className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    2. Match 🎉
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    When both swipe right, it's a match! Start building
                    connections that matter. ❤️🚀
                  </p>
                </div>
              </motion.div>

              {/* Chat */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative group"
              >
                <div className="p-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md rounded-3xl border border-blue-500/30 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 h-full">
                  <div className="mb-6 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                    <FaComment className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    3. Chat 💬
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    Start chatting and build something amazing together!
                    Collaborate on projects and grow. 🚀💡
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="relative z-10 py-24 px-6 bg-gradient-to-br from-purple-900/50 to-pink-900/50">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-white">
                Built for{" "}
                <span className="tinder-gradient">Tech Enthusiasts</span>{" "}
                <FaCode className="inline text-pink-400" />
              </h2>
              <div className="flex flex-wrap justify-center gap-4 text-4xl">
                {[
                  "⚛️",
                  "⚡",
                  "🔥",
                  "🚀",
                  "💻",
                  "🎨",
                  "📱",
                  "🌐",
                  "🔧",
                  "✨",
                ].map((emoji, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="text-5xl animate-float"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Premium Pricing Section */}
        <section className="relative z-10 py-24 px-4 md:px-6 bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 backdrop-blur-md rounded-full mb-4 border border-pink-500/30">
                <span className="text-2xl">💎</span>
                <span className="text-white/90 text-sm font-semibold">
                  Premium Plans
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-4">
                <span className="tinder-gradient">Unlock Premium</span> ✨
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Get unlimited swipes, see who likes you, and boost your profile!
                Choose the perfect plan for your tech journey! 🚀
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 h-full flex flex-col hover:border-pink-500/50 transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full mb-4">
                      <span className="text-3xl">🌱</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      Basic
                    </h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-black text-white">$9</span>
                      <span className="text-white/70">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 flex-grow mb-8">
                    {[
                      "✅ Unlimited daily swipes",
                      "✅ See who liked you",
                      "✅ Basic profile boost",
                      "✅ 5 super likes per day",
                      "✅ Priority support",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <span className="text-green-400 text-lg mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Get Started 🚀
                  </motion.button>
                </div>
              </motion.div>

              {/* Pro Plan - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                    ⭐ MOST POPULAR
                  </div>
                </div>

                <div className="bg-gradient-to-br from-pink-500/20 via-red-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl border-2 border-pink-500 p-8 h-full flex flex-col relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl"></div>

                  <div className="text-center mb-6 relative z-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mb-4 shadow-lg">
                      <span className="text-3xl">🔥</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">Pro</h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-black text-white">
                        $19
                      </span>
                      <span className="text-white/70">/month</span>
                    </div>
                    <p className="text-sm text-white/70 mt-2">
                      Save $10/month with annual billing
                    </p>
                  </div>

                  <ul className="space-y-4 flex-grow mb-8 relative z-10">
                    {[
                      "✅ Everything in Basic",
                      "✅ Unlimited super likes",
                      "✅ See read receipts",
                      "✅ Rewind last swipe",
                      "✅ Boost profile 3x/week",
                      "✅ Advanced filters",
                      "✅ Ad-free experience",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-white">
                        <span className="text-yellow-300 text-lg mt-0.5">
                          ⭐
                        </span>
                        <span className="font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-pink-600 text-white font-bold py-4 rounded-xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 relative z-10"
                  >
                    Upgrade to Pro 💎
                  </motion.button>
                </div>
              </motion.div>

              {/* Premium Plan */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 h-full flex flex-col hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full mb-4">
                      <span className="text-3xl">👑</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      Premium
                    </h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-black text-white">
                        $29
                      </span>
                      <span className="text-white/70">/month</span>
                    </div>
                  </div>

                  <ul className="space-y-4 flex-grow mb-8">
                    {[
                      "✅ Everything in Pro",
                      "✅ Unlimited boosts",
                      "✅ See all likes at once",
                      "✅ Top picks daily",
                      "✅ Message before match",
                      "✅ Travel mode (global)",
                      "✅ Priority in matches",
                      "✅ 24/7 VIP support",
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-white/90"
                      >
                        <span className="text-purple-400 text-lg mt-0.5">
                          👑
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Go Premium 👑
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <p className="text-white/60 text-sm mb-4">
                💳 All plans include a 7-day free trial • Cancel anytime •
                Secure payment
              </p>
              <p className="text-white/80">
                🔒 Your payment is secure and encrypted. We never store your
                card details.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="relative z-10 py-24 px-4 md:px-16 bg-black/40 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white">
              Frequently Asked{" "}
              <span className="tinder-gradient">Questions</span> ❓
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What is TechTribe about? 💡",
                  a: "TechTribe is a platform that helps tech enthusiasts connect, collaborate, and build amazing projects together. Swipe, match, and start coding!",
                },
                {
                  q: "How do I send an interest to someone? ❤️",
                  a: "Simply swipe right on their profile or tap the heart button! If they're interested too, it's a match! 🎉",
                },
                {
                  q: "Can I undo a request? ↩️",
                  a: "Currently, there's no undo option once you've swiped, but don't worry - there are plenty of amazing people to connect with!",
                },
                {
                  q: "What does 'Ignore' do? 👋",
                  a: "Ignoring someone removes them from your feed, so you won't see them again. Perfect for focusing on the connections that matter!",
                },
                {
                  q: "Is TechTribe free to use? 🆓",
                  a: "Yes! TechTribe is completely free with no hidden charges. Start connecting and building today! 🚀",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="collapse collapse-arrow bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg"
                >
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-bold text-white">
                    {faq.q}
                  </div>
                  <div className="collapse-content text-white/80">{faq.a}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-24 px-6 bg-gradient-to-r from-pink-600 via-red-500 to-pink-600">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ready to Find Your{" "}
              <span className="text-yellow-300">Tech Match?</span> 🚀
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of developers and start building amazing things
              together! 💫
            </p>
            <Link to="/feed">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-600 text-xl font-bold px-12 py-5 rounded-full shadow-2xl hover:shadow-white/50 transition-all"
              >
                🎯 Join the Tribe Now - It's Free!
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
