import React, { useState, useEffect } from "react";
import AdminPanel from "../components/AdminPanel";
import UserManagement from "../components/UserManagement";
import LoginModal from "../components/LoginModal";

const Admin = ({
  addAccount,
  categories,
  addCategory,
  removeCategory,
  reorderCategory,
  addUser,
  deleteUser,
  users,
  fetchUsers,
  onLogin,
  onLogout,
  isLoggedIn,
  currentUser,
  deleteAccount,
}) => {
  const [currentView, setCurrentView] = useState("nicks");
  const [showLoginModal, setShowLoginModal] = useState(!isLoggedIn);

  useEffect(() => {
    setShowLoginModal(!isLoggedIn);
  }, [isLoggedIn]);

  const handleLoginSubmit = async (username, password) => {
    const result = await onLogin(username, password);
    if (result && result.success) {
      setShowLoginModal(false);
    }
    return result;
  };

  const handleLogoutClick = () => {
    onLogout();
    setCurrentView("nicks");
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  if (!isLoggedIn) {
    return (
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLoginModal}
        onLogin={handleLoginSubmit}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* HEADER - CHỈ CÒN TITLE */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-2 shadow-2xl">
            <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-cyan-200 backdrop-blur-sm">
              <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Trang Quản Trị
                </h1>
                <div className="mt-2 text-blue-700">
                  <p>
                    Xin chào,{" "}
                    <span className="font-bold">{currentUser?.username}</span>
                  </p>
                  <p className="text-sm text-blue-600">
                    {currentUser?.role === "admin"
                      ? "Quản trị viên"
                      : "Thành viên"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT - SIDEBAR + CONTENT */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* SIDEBAR - BÊN TRÁI */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-cyan-200 shadow-xl backdrop-blur-sm">
              <h3 className="text-lg font-bold text-blue-800 mb-4 text-center">
                Điều hướng
              </h3>

              {/* NAVIGATION BUTTONS - TẤT CẢ TRONG MỘT KHỐI */}
              <div className="space-y-3">
                <button
                  onClick={() => setCurrentView("nicks")}
                  className={`w-full text-left font-bold px-4 py-3 rounded-xl transition-all duration-300 border-2 transform hover:scale-105 ${
                    currentView === "nicks"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl border-cyan-400 scale-105"
                      : "bg-white text-blue-800 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                  }`}
                >
                  Quản Lý Nick Game
                </button>

                {currentUser?.role === "admin" && (
                  <button
                    onClick={() => setCurrentView("users")}
                    className={`w-full text-left font-bold px-4 py-3 rounded-xl transition-all duration-300 border-2 transform hover:scale-105 ${
                      currentView === "users"
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-2xl border-cyan-400 scale-105"
                        : "bg-white text-blue-800 border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    👥 Quản Lý Tài Khoản
                  </button>
                )}

                {/* LOGOUT BUTTON - NGAY DƯỚI QUẢN LÝ TÀI KHOẢN */}
                <button
                  onClick={handleLogoutClick}
                  className="w-full font-bold px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-300 border-2 border-red-400 transform hover:scale-105 shadow-lg text-center"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>

          {/* CONTENT - BÊN PHẢI */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-cyan-200 shadow-xl backdrop-blur-sm min-h-[600px]">
              {currentView === "nicks" ? (
                <AdminPanel
                  addAccount={addAccount}
                  categories={categories}
                  addCategory={addCategory}
                  removeCategory={removeCategory}
                  reorderCategory={reorderCategory}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
              ) : (
                <UserManagement
                  users={users}
                  onAddUser={addUser}
                  onDeleteUser={deleteUser}
                  currentUser={currentUser}
                  onBackToNicks={() => setCurrentView("nicks")}
                  deleteAccount={deleteAccount}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
