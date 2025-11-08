import React, { useState } from "react";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);

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
        onClose();
      } else {
        setError(result?.error || "Đăng nhập thất bại");
      }
    } catch (error) {
      setError("Lỗi kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setShowPromotion(true);
    }
  };

  const handleClosePromotion = () => {
    setShowPromotion(false);
    onClose();
  };

  const handleBackToLogin = () => {
    setShowPromotion(false);
  };

  if (!isOpen) return null;

  // TRANG QUẢNG BÁ
  if (showPromotion) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-auto border border-blue-200">
          <div className="relative">
            {/* HEADER */}
            <div className="flex justify-between items-center p-4 border-b border-blue-200">
              <h2 className="text-lg font-bold text-blue-800">
                Dịch Vụ cho thuê treo nick
              </h2>
              <button
                onClick={handleClosePromotion}
                className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-base font-bold text-blue-800 mb-2">
                  Bạn muốn bán được nhiều nick ?
                </h3>
              </div>

              <div className="space-y-3 mb-4">
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                  <h4 className="text-sm font-bold text-blue-800 mb-1">
                    Dịch vụ của chúng tôi
                  </h4>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• Cho thuê web up nick</li>
                    <li>• quản lý các loại nick danh mục</li>
                    <li>• Thống kê theo dõi số lượng người dùng</li>
                    <li>• phân tích xu hướng các loại nick thịnh hành</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                  <h4 className="text-sm font-bold text-purple-800 mb-1">
                    Tính năng nổi bật
                  </h4>
                  <ul className="text-purple-700 text-xs space-y-1">
                    <li>• Quản lý nick game thông minh</li>
                    <li>• lượng</li>
                    <li>• Upload ảnh tự động</li>
                    <li>• Phân loại danh mục</li>
                  </ul>
                </div>
              </div>

              {/* CONTACT INFO */}
              <div className="bg-blue-600 rounded-lg p-3 text-center border border-blue-500">
                <h4 className="text-sm font-bold text-white mb-1">
                  Liên hệ ngay
                </h4>
                <div className="bg-blue-500 rounded p-2">
                  <p className="text-white text-base font-bold">0922.010011</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handleBackToLogin}
                  className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 rounded hover:bg-blue-700 transition-colors border border-blue-500"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleClosePromotion}
                  className="flex-1 bg-green-600 text-white text-sm font-medium py-2 rounded hover:bg-green-700 transition-colors border border-green-500"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MODAL ĐĂNG NHẬP
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm mx-auto border border-blue-200">
        <div className="relative">
          <div className="flex justify-between items-center p-4 border-b border-blue-200">
            <h2 className="text-lg font-bold text-blue-800">
              Đăng Nhập Quản Trị
            </h2>
            <button
              onClick={handleClose}
              className="bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-blue-700 font-medium text-sm mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Nhập tên đăng nhập"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-blue-700 font-medium text-sm mb-1">
                  Mật khẩu
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                  placeholder="Nhập mật khẩu"
                  required
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-500 text-white p-2 rounded text-center text-sm border border-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-blue-500 text-sm"
              >
                {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
              </button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-blue-600 text-xs font-medium">
                Liên hệ admin để lấy tài khoản đăng nhập
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
