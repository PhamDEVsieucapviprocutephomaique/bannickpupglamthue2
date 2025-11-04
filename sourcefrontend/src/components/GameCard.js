import React from "react";

const GameCard = ({
  account,
  onViewDetail,
  onDelete,
  isLoggedIn,
  currentUser,
}) => {
  // Check permission: chỉ owner hoặc admin được xóa
  const canDelete =
    isLoggedIn &&
    (currentUser?.role === "admin" || currentUser?.id === account.ownerId);

  // Get image URL - ĐÃ SỬA: DÙNG URL TRỰC TIẾP TỪ BE
  const getImageUrl = () => {
    if (account.images && account.images.length > 0) {
      return account.images[0]; // URL TRỰC TIẾP
    }
    return `https://picsum.photos/300/200?random=${account.id}`;
  };

  return (
    <div className="group relative bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-yellow-400">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>

      <div className="relative z-10">
        {/* IMAGE SECTION - ĐÃ SỬA */}
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl()}
            alt={account.title || account.category}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500 border-b-2 border-yellow-400"
          />

          {/* PRICE BADGE */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold px-3 py-2 rounded-xl shadow-lg transform group-hover:scale-105 transition-all duration-300 border border-white">
            {account.price.toLocaleString()} VNĐ
          </div>

          {/* CATEGORY BADGE */}
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-yellow-300 text-xs px-2 py-1 rounded-lg backdrop-blur-sm border border-yellow-400">
            {account.category}
          </div>

          {/* OWNER BADGE - chỉ hiện nếu là admin */}
          {currentUser?.role === "admin" && (
            <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm border border-white">
              ID: {account.ownerId}
            </div>
          )}
        </div>

        {/* CONTENT SECTION */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-white font-bold text-lg truncate flex-1 mr-2 group-hover:text-yellow-300 transition-colors duration-300">
              {account.title || `Nick ${account.category}`}
            </h3>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-between space-x-2">
            <button
              onClick={() => onViewDetail(account)}
              className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-2 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-300 font-medium shadow-lg transform hover:scale-105 border border-green-300 text-sm"
            >
              💎 Xem Chi Tiết
            </button>

            {canDelete && (
              <button
                onClick={() => onDelete(account.id)}
                className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg transform hover:scale-105 border border-red-300 text-sm"
                title="Xóa nick"
              >
                🗑️
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
