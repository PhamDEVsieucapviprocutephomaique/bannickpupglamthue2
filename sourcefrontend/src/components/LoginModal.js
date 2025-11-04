import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await onLogin(username, password);

      if (result && result.success) {
        setError("");
        setUsername("");
        setPassword("");
        onClose(); // ĐÓNG MODAL KHI ĐĂNG NHẬP THÀNH CÔNG
      } else {
        setError(result?.error || "Đăng nhập thất bại");
      }
    } catch (error) {
      setError("Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  // THÊM HÀM XỬ LÝ ĐÓNG MODAL
  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 rounded-3xl shadow-3xl w-full max-w-md mx-auto border-4 border-yellow-400 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-3xl opacity-20 blur-xl animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center p-6 border-b-2 border-yellow-400">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
              🔐 Đăng Nhập Quản Trị
            </h2>
            {/* NÚT X ĐÃ SỬA - HOẠT ĐỘNG BÌNH THƯỜNG */}
            <button
              onClick={handleClose}
              className="bg-red-500 text-white text-xl w-10 h-10 rounded-full hover:bg-red-600 transition-all duration-300 border-2 border-white flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-yellow-300 font-bold text-lg mb-3">
                  👤 Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg placeholder-purple-300 transition-all duration-200"
                  placeholder="Nhập tên đăng nhập"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-yellow-300 font-bold text-lg mb-3">
                  🔒 Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 rounded-2xl bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-4 focus:ring-yellow-400 text-lg placeholder-purple-300 transition-all duration-200"
                  placeholder="Nhập mật khẩu"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-500 text-white p-4 rounded-2xl text-center animate-pulse border-2 border-white">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold py-4 rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl text-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-white"
              >
                {loading ? "⏳ Đang đăng nhập..." : "🚀 Đăng Nhập"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-yellow-300 text-lg font-bold">
                📞 Liên hệ admin để lấy tài khoản đăng nhập
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
