import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserManagement = ({
  users,
  onAddUser,
  onDeleteUser,
  currentUser,
  onBackToNicks,
  deleteAccount,
}) => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // THÊM STATE CHO MODAL DANH SÁCH NICK
  const [showNicksModal, setShowNicksModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userNicks, setUserNicks] = useState([]);
  const [loadingNicks, setLoadingNicks] = useState(false);

  // CHỈ ADMIN ĐƯỢC TRUY CẬP
  if (currentUser?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gradient-to-br from-red-900 to-pink-800 rounded-2xl p-6 border-2 border-yellow-400 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            ⚠️ Không có quyền truy cập
          </h2>
          <p className="text-yellow-300">
            Chỉ quản trị viên mới được truy cập trang này.
          </p>
        </div>
      </div>
    );
  }

  const handleAddUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await onAddUser(newUsername, newPassword);

    if (result && result.success) {
      setNewUsername("");
      setNewPassword("");
      setShowAddForm(false);
    } else {
      setError(result?.error || "Lỗi khi thêm user");
    }

    setLoading(false);
  };

  const handleDeleteUser = async (userId, username) => {
    if (userId === 1) {
      alert("Không thể xóa tài khoản admin!");
      return;
    }

    if (window.confirm(`Bạn có chắc muốn xóa user "${username}"?`)) {
      const result = await onDeleteUser(userId);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  // HÀM MỚI: LẤY DANH SÁCH NICK CỦA USER
  const fetchUserNicks = async (userId, username) => {
    setLoadingNicks(true);
    setSelectedUser({ id: userId, username });

    try {
      const response = await fetch(
        `https://bebannickgam-deploy-2.onrender.com/api/users/${userId}/nicks`
      );
      const data = await response.json();
      setUserNicks(data.nicks || []);
      setShowNicksModal(true);
    } catch (error) {
      console.error("Error fetching user nicks:", error);
      alert("Lỗi khi lấy danh sách nick");
    } finally {
      setLoadingNicks(false);
    }
  };

  // HÀM MỚI: XÓA NICK TRONG MODAL
  const handleDeleteNick = async (nickId, nickTitle) => {
    if (window.confirm(`Bạn có chắc muốn xóa nick "${nickTitle}"?`)) {
      const success = await deleteAccount(nickId);
      if (success) {
        // CẬP NHẬT LẠI DANH SÁCH NICK SAU KHI XÓA
        setUserNicks(userNicks.filter((nick) => nick.id !== nickId));
        alert("Đã xóa nick thành công!");
      }
    }
  };

  // HÀM MỚI: ĐÓNG MODAL
  const handleCloseNicksModal = () => {
    setShowNicksModal(false);
    setSelectedUser(null);
    setUserNicks([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-400">
        {/* NÚT QUAY LẠI */}
        <div className="mb-6 text-center">
          <button
            onClick={onBackToNicks}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg border-2 border-white transform hover:scale-105"
          >
            ↩️ Quay lại Quản lý Nick
          </button>
        </div>

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            👥 Quản Lý Tài Khoản
          </h1>
          <p className="text-yellow-300 text-sm mt-2">
            Quản lý tất cả tài khoản người dùng trong hệ thống
          </p>
        </div>

        {/* ADD USER & DATABASE BUTTONS */}
        <div className="mb-6 text-center flex justify-center space-x-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-300 font-bold shadow-lg border-2 border-white transform hover:scale-105"
          >
            {showAddForm ? "❌ Hủy" : "➕ Thêm Tài Khoản Mới"}
          </button>

          {/* THÊM NÚT NÀY - CHỈ HIỆN CHO ADMIN GỐC */}
          {currentUser?.id === 1 && (
            <button
              onClick={() => navigate("/database")}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg border-2 border-white transform hover:scale-105"
            >
              🗃️ Cơ Sở Dữ Liệu
            </button>
          )}
        </div>

        {/* ADD USER FORM */}
        {showAddForm && (
          <div className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-lg p-6 mb-6 border-2 border-yellow-400">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">
              Thêm tài khoản mới
            </h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-yellow-300 font-medium mb-2">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-purple-900 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block text-yellow-300 font-medium mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-purple-900 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-500 text-white p-3 rounded-lg text-center">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "⏳ Đang thêm..." : "💾 Thêm Tài Khoản"}
              </button>
            </form>
          </div>
        )}

        {/* USERS LIST */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">
            Danh sách tài khoản ({users.length})
          </h3>

          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gradient-to-r from-purple-700 to-pink-600 rounded-lg p-4 border-2 border-yellow-400"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                      user.role === "admin"
                        ? "bg-gradient-to-r from-red-500 to-pink-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-600"
                    }`}
                  >
                    {user.role === "admin" ? "A" : "U"}
                  </div>
                  <div>
                    <p className="text-white font-bold">{user.username}</p>
                    <p
                      className={`text-sm ${
                        user.role === "admin" ? "text-red-300" : "text-blue-300"
                      }`}
                    >
                      {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                    </p>
                    <p className="text-gray-300 text-xs">
                      Đăng ký:{" "}
                      {new Date(user.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {/* NÚT MỚI: DANH SÁCH NICK */}
                  <button
                    onClick={() => fetchUserNicks(user.id, user.username)}
                    disabled={loadingNicks}
                    className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 text-sm font-bold border border-white disabled:opacity-50"
                    title="Xem danh sách nick"
                  >
                    {loadingNicks && selectedUser?.id === user.id ? "⏳" : "📋"}{" "}
                    Danh sách nick
                  </button>

                  {user.id !== 1 && (
                    <button
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-bold border border-white"
                      title="Xóa user"
                    >
                      🗑️ Xóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-yellow-300">
              <p>Chưa có tài khoản nào trong hệ thống</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DANH SÁCH NICK - THÊM MỚI */}
      {showNicksModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border-2 border-yellow-400 relative">
            {/* CLOSE BUTTON */}
            <button
              onClick={handleCloseNicksModal}
              className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg w-10 h-10 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-20 shadow-lg border border-white flex items-center justify-center"
            >
              ✕
            </button>

            <div className="relative z-10 p-6">
              {/* HEADER */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  📋 Danh sách nick của {selectedUser?.username}
                </h2>
                <p className="text-yellow-300 text-sm mt-2">
                  Tổng số: {userNicks.length} nick
                </p>
              </div>

              {/* DANH SÁCH NICK */}
              <div className="space-y-3">
                {userNicks.length > 0 ? (
                  userNicks.map((nick) => (
                    <div
                      key={nick.id}
                      className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-lg p-4 border-2 border-yellow-400"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg">
                            {nick.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-yellow-500 text-purple-900 text-xs px-2 py-1 rounded">
                              {nick.category}
                            </span>
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                              {nick.price.toLocaleString()} VNĐ
                            </span>
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              {new Date(nick.created_at).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteNick(nick.id, nick.title)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-bold border border-white ml-4"
                          title="Xóa nick"
                        >
                          🗑️ Xóa
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-yellow-300">
                    <p>User này chưa có nick game nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
