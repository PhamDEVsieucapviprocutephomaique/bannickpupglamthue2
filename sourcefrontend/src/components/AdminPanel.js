import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
const API_URL = "localhost backend  ";

const AdminPanel = ({
  addAccount,
  categories,
  addCategory,
  removeCategory,
  reorderCategory,
  isLoggedIn,
  currentUser,
  setIsLoggedIn,
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
    facebookLink: "https://www.facebook.com/letuan089",
    images: [], // GIỜ LÀ MẢNG FULL URLs
  });

  // CHECK LOGIN STATE
  useEffect(() => {
    if (isLoggedIn) {
      setShowAdminContent(true);
      setShowLogin(false);
    } else {
      setShowAdminContent(false);
      setShowLogin(true);
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setShowAdminContent(true);
    setShowLogin(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // UPLOAD ẢNH LÊN BE (BE SẼ UPLOAD FTP VÀ TRẢ VỀ URL)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${API_URL}/upload/`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            // THÊM FULL URL VÀO MẢNG IMAGES
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, result.url],
            }));
            console.log(`✅ Uploaded: ${result.url}`);
          }
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

  const handleRemoveCategory = async (categoryToRemove) => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa loại nick "${categoryToRemove}" không?`
      )
    ) {
      await removeCategory(categoryToRemove);
      if (formData.category === categoryToRemove) {
        setFormData({ ...formData, category: "" });
      }
    }
  };

  const handleReorderCategory = async (categoryId, direction) => {
    await reorderCategory(categoryId, direction);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAccount = {
      title: formData.title,
      category: formData.category,
      price: parseInt(formData.price) || 0,
      details: formData.details,
      facebookLink: formData.facebookLink,
      images: formData.images, // MẢNG FULL URLs
    };

    console.log("🚀 Submitting account:", newAccount);

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
      alert("🎉 Đã thêm nick thành công!");
    } else {
      alert("❌ Không thể thêm nick! Vui lòng thử lại.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* LOGIN MODAL */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLoginSuccess}
      />

      {/* ADMIN CONTENT */}
      {showAdminContent && (
        <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-400">
          {/* HEADER */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              ⚡ Quản Lý Nick Game
            </h1>
            <p className="text-yellow-300 text-sm mt-2">
              {currentUser?.role === "admin" ? "Quản trị viên" : "Thành viên"} -{" "}
              {currentUser?.username}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* FORM FIELDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-yellow-300 font-medium mb-2">
                  Tiêu đề nick
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-purple-300"
                  placeholder="Ví dụ: Nick VIP PUBG full skin..."
                />
              </div>

              <div>
                <label className="block text-yellow-300 font-medium mb-2">
                  Loại nick *
                </label>
                <div className="flex space-x-2">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    required
                  >
                    <option value="" className="text-purple-300">
                      Chọn loại nick
                    </option>
                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.name}
                        className="text-white"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowAddCategory(!showAddCategory)}
                    className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-3 py-2 rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-300 font-medium border border-white"
                  >
                    {showAddCategory ? "❌" : "➕"}
                  </button>
                </div>

                {showAddCategory && (
                  <div className="mt-2 flex space-x-2">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-purple-300"
                      placeholder="Nhập tên loại nick mới"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-2 rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-300 font-medium border border-white"
                    >
                      💾
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* CATEGORIES LIST WITH REORDER BUTTONS */}
            <div>
              <label className="block text-yellow-300 font-medium mb-2">
                Các loại nick hiện có (có thể sắp xếp thứ tự):
              </label>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className="bg-gradient-to-r from-purple-700 to-pink-600 text-yellow-300 px-4 py-3 rounded-lg flex items-center justify-between border border-yellow-400"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold bg-yellow-400 text-purple-900 w-6 h-6 rounded-full flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-sm">{category.name}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleReorderCategory(category.id, "up")}
                        disabled={index === 0}
                        className={`bg-gradient-to-r from-blue-400 to-purple-500 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:from-blue-500 hover:to-purple-600 transition-all duration-300 text-sm font-bold border border-white ${
                          index === 0
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:scale-110"
                        }`}
                        title="Chuyển lên trên"
                      >
                        ▲
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleReorderCategory(category.id, "down")
                        }
                        disabled={index === categories.length - 1}
                        className={`bg-gradient-to-r from-green-400 to-teal-500 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:from-green-500 hover:to-teal-600 transition-all duration-300 text-sm font-bold border border-white ${
                          index === categories.length - 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:scale-110"
                        }`}
                        title="Chuyển xuống dưới"
                      >
                        ▼
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category.name)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white w-8 h-8 rounded-lg flex items-center justify-center hover:from-red-600 hover:to-pink-700 transition-all duration-300 text-sm font-bold border border-white hover:scale-110"
                        title={`Xóa ${category.name}`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div>
              <label className="block text-yellow-300 font-medium mb-2">
                Giá (VNĐ) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-purple-300"
                placeholder="Nhập giá nick..."
                required
              />
            </div>

            {/* DETAILS */}
            <div>
              <label className="block text-yellow-300 font-medium mb-2">
                Thông tin chi tiết *
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-purple-300 resize-none"
                placeholder="Mô tả chi tiết về nick: cấp độ, nhân vật, trang bị, skin..."
                required
              ></textarea>
            </div>

            {/* FACEBOOK LINK */}
            <div>
              <label className="block text-yellow-300 font-medium mb-2">
                Link Facebook *
              </label>
              <input
                type="url"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-purple-300"
                placeholder="https://facebook.com/..."
                required
              />
            </div>

            {/* IMAGES UPLOAD - ĐÃ SỬA */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-yellow-300 font-medium">
                  Ảnh minh họa {uploading && "(Đang upload...)"}
                </label>
                <label className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-xl cursor-pointer hover:from-green-500 hover:to-blue-600 transition-all duration-300 font-medium border border-white">
                  📷 Chọn ảnh
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>

              {/* PREVIEW UPLOADED IMAGES - ĐÃ SỬA */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                {formData.images.map((imageUrl, index) => (
                  <div key={index} className="relative">
                    <img
                      src={imageUrl}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-yellow-400"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-yellow-300 text-sm text-center">
                ⚠️ Ảnh sẽ được tối ưu và upload lên host tự động
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold py-3 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg border border-white"
            >
              🚀 THÊM NICK MỚI
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
