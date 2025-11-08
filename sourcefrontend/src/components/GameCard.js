import React from "react";

const GameCard = ({
  account,
  onViewDetail,
  onDelete,
  isLoggedIn,
  currentUser,
}) => {
  const canDelete =
    isLoggedIn &&
    (currentUser?.role === "admin" || currentUser?.id === account.ownerId);

  const getImageUrl = () => {
    if (account.images && account.images.length > 0) {
      return account.images[0];
    }
    return `https://picsum.photos/300/200?random=${account.id}`;
  };

  return (
    <div className="group relative bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-cyan-200 backdrop-blur-sm">
      {/* GLOW EFFECT */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>

      {/* SPARKLE EFFECT */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
        <div
          className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full animate-ping"
          style={{ animationDelay: "0.6s" }}
        ></div>
      </div>

      {/* ANIMATED BORDER */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      <div className="absolute inset-[2px] rounded-2xl bg-white -z-10"></div>

      <div className="relative z-10">
        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden">
          <img
            src={getImageUrl()}
            alt={account.title || account.category}
            className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 border-b-2 border-cyan-200"
          />

          {/* PRICE BADGE - THIẾT KẾ MỚI NỔI BẬT */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-bold px-4 py-2 rounded-xl shadow-2xl transform group-hover:scale-110 transition-all duration-300 border-2 border-amber-300 animate-pulse">
            {account.price.toLocaleString()} VNĐ
          </div>

          {/* CATEGORY BADGE - THIẾT KẾ MỚI */}
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-sm font-semibold px-3 py-2 rounded-lg backdrop-blur-sm border border-white border-opacity-40 shadow-xl">
            {account.category}
          </div>

          {/* OWNER BADGE - chỉ hiện nếu là admin */}
          {currentUser?.role === "admin" && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-pink-700 text-white text-xs px-3 py-1 rounded-lg backdrop-blur-sm border border-white border-opacity-40 shadow-lg">
              ID: {account.ownerId}
            </div>
          )}

          {/* OVERLAY EFFECT */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-blue-800 font-bold text-lg flex-1 mr-2 group-hover:text-cyan-700 transition-colors duration-300 line-clamp-2">
              {account.title || `Nick ${account.category}`}
            </h3>
          </div>

          {/* BUTTONS - THIẾT KẾ MỚI NỔI BẬT */}
          <div className="flex justify-between space-x-2">
            <button
              onClick={() => onViewDetail(account)}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-3 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg transform hover:scale-105 border-2 border-cyan-400 text-sm relative overflow-hidden group"
            >
              {/* SHINE EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
              <span className="relative">XEM CHI TIẾT</span>
            </button>

            {canDelete && (
              <button
                onClick={() => onDelete(account.id)}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 py-3 rounded-xl transition-all duration-300 font-bold shadow-lg transform hover:scale-105 border-2 border-red-400 text-sm relative overflow-hidden group"
                title="Xóa nick"
              >
                {/* SHINE EFFECT */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 -skew-x-12 group-hover:translate-x-full transition-all duration-1000"></div>
                <span className="relative">XÓA</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CORNER ACCENTS */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default GameCard;
