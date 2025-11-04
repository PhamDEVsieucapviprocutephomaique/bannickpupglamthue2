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
  deleteAccount, // THÊM PROP NÀY
}) => {
  const [currentView, setCurrentView] = useState("nicks");
  const [showLoginModal, setShowLoginModal] = useState(!isLoggedIn);

  // THEO DÕI isLoggedIn ĐỂ ẨN/HIỆN MODAL
  useEffect(() => {
    setShowLoginModal(!isLoggedIn);
  }, [isLoggedIn]);

  // HANDLE LOGIN
  const handleLoginSubmit = async (username, password) => {
    const result = await onLogin(username, password);
    if (result && result.success) {
      setShowLoginModal(false);
    }
    return result;
  };

  // HANDLE LOGOUT
  const handleLogoutClick = () => {
    onLogout();
    setCurrentView("nicks");
  };

  // THÊM HÀM NÀY - CHO PHÉP ĐÓNG MODAL
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
    <div className="min-h-screen py-8 relative">
      <div className="relative z-10">
        {/* HEADER SWITCHER */}
        <div className="max-w-4xl mx-auto mb-6 text-center">
          <div className="bg-gradient-to-r from-purple-900 via-pink-800 to-red-900 rounded-2xl p-4 border-2 border-yellow-400 inline-block">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("nicks")}
                className={`font-bold px-6 py-3 rounded-2xl transition-all duration-300 text-lg border-2 ${
                  currentView === "nicks"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 shadow-2xl border-white"
                    : "bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:from-purple-600 hover:to-pink-500 border-yellow-400"
                }`}
              >
                ⚡ Quản Lý Nick Game
              </button>

              {/* CHỈ ADMIN GỐC MỚI THẤY NÚT QUẢN LÝ TÀI KHOẢN */}
              {currentUser?.role === "admin" && (
                <button
                  onClick={() => setCurrentView("users")}
                  className={`font-bold px-6 py-3 rounded-2xl transition-all duration-300 text-lg border-2 ${
                    currentView === "users"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 shadow-2xl border-white"
                      : "bg-gradient-to-r from-purple-700 to-pink-600 text-white hover:from-purple-600 hover:to-pink-500 border-yellow-400"
                  }`}
                >
                  👥 Quản Lý Tài Khoản
                </button>
              )}

              {/* LOGOUT BUTTON */}
              <button
                onClick={handleLogoutClick}
                className="font-bold px-4 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 transition-all duration-300 border-2 border-white"
                title="Đăng xuất"
              >
                Đăng xuất
              </button>
            </div>

            {/* USER INFO */}
            <div className="mt-3 text-yellow-300">
              <p>
                Xin chào,{" "}
                <span className="font-bold">{currentUser?.username}</span> (
                {currentUser?.role === "admin" ? "Quản trị viên" : "Thành viên"}
                )
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
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
            deleteAccount={deleteAccount} // TRUYỀN HÀM XÓA XUỐNG
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
