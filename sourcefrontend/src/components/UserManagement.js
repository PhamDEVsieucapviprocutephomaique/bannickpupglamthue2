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

  const [showNicksModal, setShowNicksModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userNicks, setUserNicks] = useState([]);
  const [loadingNicks, setLoadingNicks] = useState(false);

  if (currentUser?.role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 border-2 border-red-400 text-center shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-4">
            ⚠️ Không có quyền truy cập
          </h2>
          <p className="text-red-100">
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

  const fetchUserNicks = async (userId, username) => {
    setLoadingNicks(true);
    setSelectedUser({ id: userId, username });

    try {
      const response = await fetch(
        `http://api.shopaccpubgpc.vn/api/users/${userId}/nicks`
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

  const handleDeleteNick = async (nickId, nickTitle) => {
    if (window.confirm(`Bạn có chắc muốn xóa nick "${nickTitle}"?`)) {
      const success = await deleteAccount(nickId);
      if (success) {
        setUserNicks(userNicks.filter((nick) => nick.id !== nickId));
        alert("Đã xóa nick thành công!");
      }
    }
  };

  const handleCloseNicksModal = () => {
    setShowNicksModal(false);
    setSelectedUser(null);
    setUserNicks([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-3xl shadow-2xl p-6 border-2 border-cyan-200 backdrop-blur-sm">
        {/* NÚT QUAY LẠI */}
        {/* <div className="mb-6 text-center">
          <button
            onClick={onBackToNicks}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 font-bold shadow-lg border-2 border-cyan-400 transform hover:scale-105"
          >
            ↩️ Quay lại Quản lý Nick
          </button>
        </div> */}

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
            👥 Quản Lý Tài Khoản
          </h1>
          <p className="text-blue-600 text-sm mt-2">
            Quản lý tất cả tài khoản người dùng trong hệ thống
          </p>
        </div>

        {/* ADD USER & DATABASE BUTTONS */}
        <div className="mb-6 text-center flex justify-center space-x-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg border-2 border-green-400 transform hover:scale-105"
          >
            {showAddForm ? " Hủy" : " Thêm Tài Khoản Mới"}
          </button>
        </div>

        {/* ADD USER FORM */}
        {showAddForm && (
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-6 mb-6 border-2 border-blue-200 shadow-lg">
            <h3 className="text-lg font-bold text-blue-800 mb-4">
              Thêm tài khoản mới
            </h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-blue-700 font-bold mb-2">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block text-blue-700 font-bold mb-2">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border-2 border-blue-200 text-blue-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400"
                  required
                />
              </div>
              {error && (
                <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-3 rounded-xl text-center border-2 border-red-400">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 border-2 border-cyan-400 transform hover:scale-105"
              >
                {loading ? " Đang thêm..." : "Thêm Tài Khoản"}
              </button>
            </form>
          </div>
        )}

        {/* USERS LIST */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-blue-800 mb-4">
            Danh sách tài khoản ({users.length})
          </h3>

          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                      user.role === "admin"
                        ? "bg-gradient-to-r from-purple-500 to-pink-600"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600"
                    }`}
                  >
                    {user.role === "admin" ? "A" : "U"}
                  </div>
                  <div>
                    <p className="text-blue-800 font-bold">{user.username}</p>
                    <p
                      className={`text-sm font-medium ${
                        user.role === "admin"
                          ? "text-purple-600"
                          : "text-cyan-600"
                      }`}
                    >
                      {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                    </p>
                    <p className="text-blue-600 text-xs">
                      Đăng ký:{" "}
                      {new Date(user.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => fetchUserNicks(user.id, user.username)}
                    disabled={loadingNicks}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-sm font-bold border-2 border-cyan-400 shadow-lg transform hover:scale-105 disabled:opacity-50"
                  >
                    {loadingNicks && selectedUser?.id === user.id ? "⏳" : "📋"}{" "}
                    Danh sách nick
                  </button>

                  {user.id !== 1 && (
                    <button
                      onClick={() => handleDeleteUser(user.id, user.username)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-bold border-2 border-red-400 shadow-lg transform hover:scale-105"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {users.length === 0 && (
            <div className="text-center py-8 text-blue-600">
              <p>Chưa có tài khoản nào trong hệ thống</p>
            </div>
          )}
        </div>
      </div>

      {/* MODAL DANH SÁCH NICK */}
      {showNicksModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border-2 border-cyan-300 relative backdrop-blur-sm">
            <button
              onClick={handleCloseNicksModal}
              className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg w-10 h-10 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-20 shadow-lg border-2 border-white flex items-center justify-center transform hover:scale-110"
            >
              ✕
            </button>

            <div className="relative z-10 p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Danh sách nick của {selectedUser?.username}
                </h2>
                <p className="text-blue-600 text-sm mt-2">
                  Tổng số: {userNicks.length} nick
                </p>
              </div>

              <div className="space-y-3">
                {userNicks.length > 0 ? (
                  userNicks.map((nick) => (
                    <div
                      key={nick.id}
                      className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-200 shadow-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="text-blue-800 font-bold text-lg">
                            {nick.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs px-2 py-1 rounded-lg">
                              {nick.category}
                            </span>
                            <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-2 py-1 rounded-lg">
                              {nick.price.toLocaleString()} VNĐ
                            </span>
                            <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white text-xs px-2 py-1 rounded-lg">
                              {new Date(nick.created_at).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteNick(nick.id, nick.title)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-xl hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-bold border-2 border-red-400 shadow-lg transform hover:scale-105 ml-4"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-blue-600">
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
