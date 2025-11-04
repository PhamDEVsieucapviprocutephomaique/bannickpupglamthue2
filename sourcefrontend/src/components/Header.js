import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import logoImageaa from "../image/anhlogo.png";

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
    { path: "/", label: "🏠 Trang Chủ" },
    { path: "/news", label: "📰 Tin Tức" },
    { path: "/admin", label: "⚡ Quản Lý Nick" },
  ];

  // ĐÃ XÓA PHẦN THÊM "QUẢN LÝ TÀI KHOẢN" VÀO HEADER

  return (
    <>
      <header className="relative z-50 bg-gradient-to-r from-purple-900 via-pink-800 to-red-900 shadow-2xl border-b-4 border-yellow-400">
        {/* ANIMATED TOP BAR */}
        <div className="bg-gradient-to-r from-yellow-400 to-pink-500 h-1 animate-pulse"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <img
                  src={logoImageaa}
                  alt="ChoDenPUBGPC Logo"
                  className="h-16 sm:h-20 lg:h-24 w-auto object-contain transform group-hover:scale-110 transition-all duration-300 border-4 border-yellow-400 rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-glow">
                  ChoDen<span className="text-white">PUBG</span>PC
                </h1>
                <p className="text-yellow-300 text-sm font-bold animate-pulse">
                  🎮 UY TÍN - CHẤT LƯỢNG - BẢO HÀNH 🎮
                </p>
              </div>
            </Link>

            {/* NAVIGATION & USER INFO */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* USER INFO */}
              {isLoggedIn && currentUser && (
                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg border-2 border-yellow-400 text-center">
                  <p className="font-bold">👋 {currentUser.username}</p>
                  <p className="text-xs">
                    {currentUser.role === "admin"
                      ? "Quản trị viên"
                      : "Thành viên"}
                  </p>
                </div>
              )}

              {/* NAVIGATION - CHỈ CÒN 3 MỤC */}
              <nav className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`font-bold px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-base sm:text-lg lg:text-xl border-2 transform hover:scale-110 ${
                      location.pathname === item.path
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 shadow-2xl scale-105 border-white"
                        : "bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:from-purple-600 hover:to-pink-500 shadow-lg border-yellow-400"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* BOTTOM GLOW EFFECT */}
        <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 animate-pulse"></div>
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
