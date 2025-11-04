import React, { useState } from "react";

const GameDetailModal = ({ account, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  if (!isOpen || !account) return null;

  // Get image URL - ĐÃ SỬA: DÙNG URL TRỰC TIẾP TỪ BE
  const getImageUrl = (imageUrl) => {
    return imageUrl; // URL TRỰC TIẾP
  };

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
    setShowImageViewer(true);
  };

  const closeImageViewer = () => {
    setShowImageViewer(false);
    setSelectedImageIndex(null);
  };

  const goToNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev < account.images.length - 1 ? prev + 1 : prev
    );
  };

  const goToPrevImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-400 relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-lg w-10 h-10 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-20 shadow-lg border border-white"
          >
            ✕
          </button>

          <div className="relative z-10 p-6">
            {/* HEADER */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {account.title || `Nick ${account.category}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* IMAGES SECTION - ĐÃ SỬA */}
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-3">
                  Ảnh minh họa
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {account.images && account.images.length > 0 ? (
                    account.images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative group cursor-pointer"
                        onClick={() => openImageViewer(index)}
                      >
                        <img
                          src={getImageUrl(imageUrl)}
                          alt={`${account.title} ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-yellow-400 transform group-hover:scale-105 transition-all duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            👁️
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <img
                      src={`https://picsum.photos/300/200?random=${account.id}`}
                      alt={account.title}
                      className="w-full h-32 object-cover rounded-lg border-2 border-yellow-400"
                    />
                  )}
                </div>
              </div>

              {/* DETAILS SECTION */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-lg p-4 border-2 border-yellow-400">
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">
                    Thông tin chi tiết
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {account.details}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-center border-2 border-white shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-2">
                    Giá: {account.price.toLocaleString()} VNĐ
                  </h3>
                  <p className="text-white">Loại: {account.category}</p>
                </div>
              </div>
            </div>

            {/* CONTACT SECTION */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-center border-2 border-yellow-400 shadow-lg">
              <h3 className="text-xl font-bold text-white mb-4">
                LIÊN HỆ MUA NICK
              </h3>
              <a
                href={account.facebookLink || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-green-600 font-bold text-lg px-6 py-3 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg transform hover:scale-105 border-2 border-yellow-400"
              >
                📱 NHẤN VÀO ĐÂY ĐỂ LIÊN HỆ FACEBOOK
              </a>
              <p className="text-white mt-2 text-sm">
                Click vào nút trên để được chuyển đến Facebook người bán
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE VIEWER OVERLAY - ĐÃ SỬA */}
      {showImageViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4">
          {/* CLOSE BUTTON */}
          <button
            onClick={closeImageViewer}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xl w-12 h-12 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-50 border-2 border-white flex items-center justify-center"
          >
            ✕
          </button>

          {/* PREVIOUS BUTTON */}
          {selectedImageIndex > 0 && (
            <button
              onClick={goToPrevImage}
              className="absolute left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 text-2xl w-12 h-12 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 z-50 border-2 border-white flex items-center justify-center"
            >
              ‹
            </button>
          )}

          {/* NEXT BUTTON */}
          {selectedImageIndex < account.images.length - 1 && (
            <button
              onClick={goToNextImage}
              className="absolute right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 text-2xl w-12 h-12 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 z-50 border-2 border-white flex items-center justify-center"
            >
              ›
            </button>
          )}

          {/* IMAGE CONTAINER - ĐÃ SỬA */}
          <div
            className="max-w-4xl max-h-full flex items-center justify-center p-4 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg">
              <img
                src={getImageUrl(account.images[selectedImageIndex])}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border-2 border-yellow-400 shadow-lg"
                alt={`${account.title} ${selectedImageIndex + 1}`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* IMAGE COUNTER */}
          <div className="absolute bottom-4 bg-black bg-opacity-70 text-white text-sm px-4 py-2 rounded-lg border border-yellow-400 z-50">
            {selectedImageIndex + 1} / {account.images.length}
          </div>

          {/* BACKDROP CLICK AREA */}
          <div
            className="absolute inset-0 z-30"
            onClick={closeImageViewer}
          ></div>
        </div>
      )}
    </>
  );
};

export default GameDetailModal;
