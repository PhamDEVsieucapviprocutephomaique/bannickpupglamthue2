import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import logoImageaa from "../image/anhlogo.jpeg";

const Header = ({ isLoggedIn, currentUser, onLogin, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = async (username, password) => {
    const result = await onLogin(username, password);
    if (result.success) {
      setShowLoginModal(false);
    }
    return result;
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Trang Chủ" },
    { path: "/news", label: "Chi tiết và bảo hành" },
    { path: "/admin", label: "Quản Lý Nick" },
  ];

  return (
    <>
      <header className="bg-gradient-to-r from-blue-800 via-purple-800 to-cyan-700 shadow-2xl border-b-4 border-cyan-400 relative overflow-hidden">
        {/* ANIMATED BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between py-3 space-y-3 sm:space-y-0">
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <img
                  src={logoImageaa}
                  alt="ChoDenPUBGPC Logo"
                  className="h-12 sm:h-14 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300 border-2 border-cyan-400 rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 bg-cyan-400 rounded-xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 via-white to-amber-300 bg-clip-text text-transparent">
                  shopaccpubgpc.vn
                </h1>
                <p className="text-cyan-200 text-xs font-medium">
                  UY TÍN - CHẤT LƯỢNG - BẢO HÀNH
                </p>
              </div>
            </Link>

            {/* NAVIGATION & USER INFO */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* USER INFO - COMPACT VERSION */}
              {isLoggedIn && currentUser && (
                <div className="flex items-center space-x-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1 border border-cyan-300 border-opacity-50">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      currentUser.role === "admin"
                        ? "bg-green-400"
                        : "bg-blue-400"
                    }`}
                  ></div>
                  <div>
                    <p className="text-cyan-100 text-sm font-medium">
                      {currentUser.username}
                    </p>
                  </div>
                </div>
              )}

              {/* NAVIGATION */}
              <nav className="flex items-center space-x-1 sm:space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 border-2 transform hover:scale-105 ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg border-cyan-300 scale-105"
                        : "bg-white bg-opacity-20 text-cyan-100 border-cyan-400 border-opacity-50 hover:bg-opacity-30 hover:border-cyan-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM GLOW */}
        <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
      </header>

      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </>
  );
};

export default Header;
