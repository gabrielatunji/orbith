import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-lg border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="w-[140px] h-[76px] flex items-center justify-center bg-black rounded-lg shadow-md">
            <img src={logo} alt="Orbith Logo" />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="px-6 py-4 border text-md border-gray-700 rounded-lg text-white hover:border-gray-500 transition-colors font-medium ">
              Connect Wallet
            </button>
            <button className="px-6 py-4 text-md font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg text-white transition-colors ">
              Get Started
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4">
          <button className="w-full px-6 py-4 border border-gray-700 rounded-lg mb-2">
            Connect Wallet
          </button>
          <button className="w-full px-6 py-4 bg-blue-700 rounded-lg">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}
