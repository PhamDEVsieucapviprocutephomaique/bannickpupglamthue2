import React, { useState } from "react";

const GameDetailModal = ({ account, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);

  if (!isOpen || !account) return null;

  const getImageUrl = (imageUrl) => {
    return imageUrl;
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
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-300 relative">
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white w-8 h-8 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-20 shadow-lg border border-white flex items-center justify-center transform hover:scale-110 text-sm"
          >
            ✕
          </button>

          <div className="relative z-10 p-6">
            {/* HEADER */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-cyan-700 bg-clip-text text-transparent">
                {account.title || `Nick ${account.category}`}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* IMAGES SECTION - CHIẾM 2/3 */}
              <div className="lg:col-span-2">
                <h3 className="text-base font-semibold text-blue-800 mb-3">
                  Hình ảnh minh họa
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                          className="w-full h-28 object-cover rounded-lg border-2 border-blue-300 transform group-hover:scale-105 transition-all duration-300 shadow-md"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-lg transition-all duration-300 flex items-center justify-center">
                          <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                            XEM
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <img
                      src={`https://picsum.photos/300/200?random=${account.id}`}
                      alt={account.title}
                      className="w-full h-28 object-cover rounded-lg border-2 border-blue-300"
                    />
                  )}
                </div>
              </div>

              {/* DETAILS SECTION - CHIẾM 1/3 */}
              <div className="space-y-4">
                {/* PRICE BOX */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-4 text-center border-2 border-amber-400 shadow-lg">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {account.price.toLocaleString()} VNĐ
                  </h3>
                  <p className="text-amber-100 text-sm">
                    Loại: {account.category}
                  </p>
                </div>

                {/* INFO BOX */}
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 border-2 border-blue-200">
                  <h3 className="text-base font-semibold text-blue-800 mb-2">
                    Thông tin chi tiết
                  </h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {account.details}
                  </p>
                </div>
              </div>
            </div>

            {/* CONTACT SECTION - FULL WIDTH */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-5 text-center border-2 border-blue-400 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-3">
                LIÊN HỆ MUA NICK
              </h3>
              <a
                href={"https://www.facebook.com/phuongfzvinh/"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-base px-6 py-3 rounded-lg transition-all duration-300 shadow-xl transform hover:scale-105 border-2 border-emerald-400"
              >
                LIÊN HỆ FACEBOOK
              </a>
              <p className="text-blue-200 mt-2 text-xs">
                Nhấn vào nút trên để chuyển đến Facebook người bán
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE VIEWER OVERLAY */}
      {showImageViewer && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-[9999] flex items-center justify-center p-4">
          {/* CLOSE BUTTON */}
          <button
            onClick={closeImageViewer}
            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white w-10 h-10 rounded-full hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-50 border border-white flex items-center justify-center transform hover:scale-110 text-base"
          >
            ✕
          </button>

          {/* PREVIOUS BUTTON */}
          {selectedImageIndex > 0 && (
            <button
              onClick={goToPrevImage}
              className="absolute left-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white w-10 h-10 rounded-full hover:from-blue-700 hover:to-purple-800 transition-all duration-300 z-50 border border-white flex items-center justify-center transform hover:scale-110 font-bold"
            >
              ‹
            </button>
          )}

          {/* NEXT BUTTON */}
          {selectedImageIndex < account.images.length - 1 && (
            <button
              onClick={goToNextImage}
              className="absolute right-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white w-10 h-10 rounded-full hover:from-blue-700 hover:to-purple-800 transition-all duration-300 z-50 border border-white flex items-center justify-center transform hover:scale-110 font-bold"
            >
              ›
            </button>
          )}

          {/* IMAGE CONTAINER */}
          <div
            className="max-w-4xl max-h-full flex items-center justify-center p-4 z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-2 rounded-lg">
              <img
                src={getImageUrl(account.images[selectedImageIndex])}
                className="max-w-full max-h-[70vh] object-contain rounded-lg border-2 border-blue-400 shadow-2xl"
                alt={`${account.title} ${selectedImageIndex + 1}`}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* IMAGE COUNTER */}
          <div className="absolute bottom-4 bg-black bg-opacity-70 text-white text-xs px-3 py-2 rounded border border-blue-400 z-50">
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
