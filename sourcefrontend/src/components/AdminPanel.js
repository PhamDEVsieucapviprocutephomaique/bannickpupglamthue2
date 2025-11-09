import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";

const API_URL = "https://api.shopaccpubgpc.vn/api";

const AdminPanel = ({
  addAccount,
  categories,
  addCategory,
  removeCategory,
  reorderCategory,
  isLoggedIn,
  currentUser,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAdminContent, setShowAdminContent] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    details: "",
    facebookLink: "https://www.facebook.com/phuongfzvinh/",
    images: [],
  });

  const compressImage = (file, maxWidth = 1200, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      // Nếu file nhỏ hơn 1MB, không cần nén
      if (file.size < 1024 * 1024) {
        resolve(file);
        return;
      }

      const reader = new FileReader();

      reader.onerror = () => reject(new Error("FileReader error"));

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();

        img.onerror = () => {
          console.warn("Image compression failed, using original file");
          resolve(file); // Nếu lỗi thì dùng file gốc
        };

        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Resize nếu ảnh quá lớn
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          // Đảm bảo chất lượng khi vẽ
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);

          // Xác định output type - ưu tiên WebP, fallback về JPEG
          const outputType =
            file.type === "image/png" ? "image/png" : "image/jpeg";
          const outputQuality =
            file.type === "image/png" ? Math.min(quality, 0.9) : quality;

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                console.warn("Canvas toBlob failed, using original file");
                resolve(file);
                return;
              }

              // Nếu blob lớn hơn file gốc thì dùng file gốc
              if (blob.size >= file.size) {
                resolve(file);
                return;
              }

              const compressedFile = new File([blob], file.name, {
                type: outputType,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            },
            outputType,
            outputQuality
          );
        };
      };
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      setShowAdminContent(true);
      setShowLogin(false);
    } else {
      setShowAdminContent(false);
      setShowLogin(true);
    }
  }, [isLoggedIn]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      try {
        // Kiểm tra file type
        if (!file.type.startsWith("image/")) {
          alert(`File ${file.name} không phải là ảnh!`);
          continue;
        }

        console.log(
          `📦 Original: ${file.name} (${(file.size / 1024 / 1024).toFixed(
            2
          )}MB) - Type: ${file.type}`
        );

        let fileToUpload = file;

        // Nén ảnh (tự động fallback nếu lỗi)
        try {
          fileToUpload = await compressImage(file);
          console.log(
            `✅ Compressed: ${fileToUpload.name} (${(
              fileToUpload.size /
              1024 /
              1024
            ).toFixed(2)}MB) - Type: ${fileToUpload.type}`
          );
        } catch (compressError) {
          console.warn(
            "Compression failed, using original file:",
            compressError
          );
          fileToUpload = file;
        }

        const formData = new FormData();
        formData.append("file", fileToUpload);

        const response = await fetch(`${API_URL}/upload/`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, result.url],
            }));
            console.log(`✅ Uploaded: ${result.url}`);
          } else {
            console.error("Upload failed:", result);
            alert(`Upload thất bại: ${result.message || "Lỗi không xác định"}`);
          }
        } else {
          const errorText = await response.text();
          console.error("Server error:", response.status, errorText);
          alert(`Lỗi server: ${response.status}`);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert(`Lỗi upload ảnh: ${error.message}`);
      }
    }

    setUploading(false);
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  const handleAddCategory = async () => {
    if (
      newCategoryName.trim() &&
      !categories.find((cat) => cat.name === newCategoryName.trim())
    ) {
      await addCategory(newCategoryName.trim());
      setFormData({
        ...formData,
        category: newCategoryName.trim(),
      });
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAccount = {
      title: formData.title,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      details: formData.details,
      facebookLink: formData.facebookLink,
      images: formData.images,
    };

    const success = await addAccount(newAccount);
    if (success) {
      setFormData({
        title: "",
        category: "",
        price: "",
        details: "",
        facebookLink: "https://www.facebook.com/letuan089",
        images: [],
      });
      alert("Đã thêm nick thành công!");
    } else {
      alert("Không thể thêm nick! Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={() => setShowAdminContent(true)}
      />

      {showAdminContent && (
        <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-3xl shadow-2xl p-6 border-2 border-cyan-200 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              ⚡ Quản Lý Nick Game
            </h1>
            <p className="text-blue-600 text-sm mt-2">
              {currentUser?.username} •{" "}
              {currentUser?.role === "admin" ? "Quản trị viên" : "Thành viên"}
            </p>
          </div>

          {/* COMPACT FORM - 3 COLUMNS KHÔNG CẦN SCROLL */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* COLUMN 1 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 font-bold mb-2 text-sm">
                    Mã tài khoản *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-sm bg-white"
                    placeholder="Tên nick..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-blue-700 font-bold mb-2 text-sm">
                    Giá Tài Khoản (VNĐ) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-sm bg-white"
                    placeholder="1000000"
                    required
                  />
                </div>
              </div>

              {/* COLUMN 2 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 font-bold mb-2 text-sm">
                    Loại Tài Khoản *
                  </label>
                  <div className="flex space-x-2">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-sm bg-white"
                      required
                    >
                      <option value="">Chọn loại</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(!showAddCategory)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-xl hover:from-cyan-600 hover:to-blue-700 text-sm border-2 border-cyan-400 shadow-lg transform hover:scale-105"
                    >
                      {showAddCategory ? "✕" : "+"}
                    </button>
                  </div>

                  {showAddCategory && (
                    <div className="mt-2 flex space-x-2">
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border-2 border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white"
                        placeholder="Tên loại mới"
                      />
                      <button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-2 rounded-xl hover:from-green-600 hover:to-emerald-700 text-sm border-2 border-green-400 shadow-lg"
                      >
                        💾
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* COLUMN 3 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-blue-700 font-bold mb-2 text-sm">
                    Ảnh minh họa {uploading && "(🔄)"}
                  </label>
                  <div className="flex space-x-2">
                    <label className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-3 py-2 rounded-xl hover:from-purple-600 hover:to-pink-700 cursor-pointer text-sm text-center border-2 border-purple-400 shadow-lg transform hover:scale-105 transition-all">
                      Chọn ảnh
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Image previews - compact */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {formData.images.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-16 object-cover rounded-lg border-2 border-cyan-300 shadow-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border-2 border-white shadow-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DETAILS - Full width nhưng nhỏ gọn */}
            <div>
              <label className="block text-blue-700 font-bold mb-2 text-sm">
                Thông Tin Tài Khoản*
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows="2"
                className="w-full px-3 py-2 rounded-xl border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-400 text-sm bg-white resize-none"
                placeholder="Mô tả chi tiết về nick..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl border-2 border-cyan-400 transform hover:scale-105 text-lg"
            >
              THÊM NICK MỚI
            </button>
          </form>

          {/* CATEGORIES MANAGEMENT - Compact */}
          <div className="mt-6">
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center">
              Quản lý loại nick
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-3 flex items-center justify-between border-2 border-blue-200 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                      {index + 1}
                    </span>
                    <span className="text-blue-800 font-medium text-sm">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => reorderCategory(category.id, "up")}
                      disabled={index === 0}
                      className={`bg-gradient-to-r from-cyan-500 to-blue-500 text-white w-6 h-6 rounded text-xs font-bold ${
                        index === 0
                          ? "opacity-50"
                          : "hover:from-cyan-600 hover:to-blue-600 transform hover:scale-110"
                      }`}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => reorderCategory(category.id, "down")}
                      disabled={index === categories.length - 1}
                      className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white w-6 h-6 rounded text-xs font-bold ${
                        index === categories.length - 1
                          ? "opacity-50"
                          : "hover:from-purple-600 hover:to-pink-600 transform hover:scale-110"
                      }`}
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => removeCategory(category.name)}
                      className="bg-gradient-to-r from-red-500 to-pink-600 text-white w-6 h-6 rounded text-xs font-bold hover:from-red-600 hover:to-pink-700 transform hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
