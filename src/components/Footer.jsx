import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaHeart, FaCode, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 border-t border-white/10 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="flex items-center gap-2 mb-4"
            >
              <FaRocket className="text-3xl text-pink-400" />
              <h3 className="text-2xl font-black">TechTribe</h3>
            </motion.div>
            <p className="text-white/70">
              Connect with tech talent. Build amazing projects together. 🚀✨
            </p>
          </div>

          {/* Quick Links */}
          <nav>
            <h6 className="footer-title text-white font-bold text-lg mb-4">
              Quick Links 🔗
            </h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Discover 💖
                </a>
              </li>
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Matches 💬
                </a>
              </li>
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Profile 👤
                </a>
              </li>
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  About Us 📖
                </a>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <nav>
            <h6 className="footer-title text-white font-bold text-lg mb-4">
              Support 💬
            </h6>
            <ul className="space-y-2">
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Help Center ❓
                </a>
              </li>
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Privacy Policy 🔒
                </a>
              </li>
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Terms of Service 📜
                </a>
              </li>
              <li>
                <a className="link link-hover text-white/70 hover:text-pink-400 transition-colors">
                  Contact Us 📧
                </a>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div>
            <h6 className="footer-title text-white font-bold text-lg mb-4">
              Stay Updated 📬
            </h6>
            <p className="text-white/70 mb-4 text-sm">
              Get the latest updates and tech tips! 💡
            </p>
            <div className="join w-full">
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered join-item w-full bg-white/10 border-white/30 text-white placeholder-white/50 focus:border-pink-500"
              />
              <button className="btn join-item bg-gradient-to-r from-pink-500 to-red-500 text-white border-none hover:shadow-lg">
                Subscribe 🚀
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 TechTribe. Made with{" "}
            <FaHeart className="inline text-pink-400 mx-1" /> for tech
            enthusiasts. 🚀
          </p>
          <div className="flex gap-4 text-2xl">
            {["🔵", "⚫", "🔴", "💙"].map((emoji, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="hover:text-pink-400 transition-colors"
              >
                {emoji}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
