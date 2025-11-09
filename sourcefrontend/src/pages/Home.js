import React, { useState, useEffect, useRef } from "react";
import CategorySection from "../components/CategorySection";
import GameDetailModal from "../components/GameDetailModal";
import VisitorCounter from "../components/VisitorCounter";

// Import ảnh - giả sử bạn có 10 ảnh với tên anh1.png đến anh10.png
import anh1 from "../image/anhcoin.png";
import anh2 from "../image/anhcoin.png";
import anh3 from "../image/anhcoin.png";
import anh4 from "../image/anhcoin.png";
import anh5 from "../image/anhcoin.png";
import anh6 from "../image/anh6.png";
import anh7 from "../image/anh7.png";
import anh8 from "../image/anh8.png";
import anh9 from "../image/anh9.png";
import anh10 from "../image/anh10.png";

const Home = ({
  accounts,
  categories,
  deleteAccount,
  isLoggedIn,
  currentUser,
  pageViews,
  onIncrementPageViews,
}) => {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleAnimation, setTitleAnimation] = useState(false);
  const [phoneAnimation, setPhoneAnimation] = useState(false);
  const [activeSection, setActiveSection] = useState("taikhoan"); // "taikhoan", "naptien", "trangphuc"
  const hasIncremented = useRef(false);

  // Dữ liệu mẫu cho code nạp tiền
  const napTienCodes = [
    { id: 1, name: "510GCOIN", price: "GIÁ 125-130K", image: anh1 },
    { id: 2, name: "1050GCOIN", price: "GIÁ 240-250K", image: anh2 },
    { id: 3, name: "2700GCOIN", price: "GIÁ 600-630K", image: anh3 },
    { id: 4, name: "12500GCOIN", price: "GIÁ 1100-1250K", image: anh4 },
    { id: 5, name: "11200GCOIN", price: "GIÁ 2100-2500K", image: anh5 },
  ];

  // Dữ liệu mẫu cho code trang phục
  const trangPhucCodes = [
    { id: 1, name: "PIGFF", price: "260-695k", image: anh6 },
    { id: 2, name: "LFLONG NAM", price: "260k", image: anh7 },
    { id: 3, name: "SET NH", price: " 1700K", image: anh8 },
    { id: 4, name: "MŨ RAZER", price: "1650K", image: anh9 },
    { id: 5, name: "ALITHEFOX FULL SET", price: "1500K", image: anh10 },
  ];

  useEffect(() => {
    if (!hasIncremented.current) {
      onIncrementPageViews();
      hasIncremented.current = true;
    }

    setTimeout(() => {
      setTitleAnimation(true);
    }, 100);

    setTimeout(() => {
      setPhoneAnimation(true);
    }, 500);
  }, [onIncrementPageViews]);

  const handleViewDetail = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  const handleNavigationClick = (section) => {
    setActiveSection(section);
    // Scroll đến section tương ứng
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCodeClick = () => {
    window.open("https://www.facebook.com/phuongfzvinh/", "_blank");
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* HERO SECTION */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
            {/* TÊN WEBSITE - CHIẾM 3 CỘT */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-3xl p-6 shadow-2xl border-2 border-white border-opacity-30 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-pulse"></div>

                <div className="text-center relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-cyan-200 via-white to-amber-100 blur-lg opacity-0 ${
                      titleAnimation ? "animate-pulse" : ""
                    }`}
                    style={{
                      animationDuration: "3s",
                      animationIterationCount: "infinite",
                      opacity: titleAnimation ? 0.3 : 0,
                    }}
                  ></div>

                  <h1
                    className={`text-4xl md:text-5xl font-bold text-white text-center mb-4 transform transition-all duration-700 relative z-10 ${
                      titleAnimation
                        ? "translate-y-0 opacity-100 animate-bounce"
                        : "translate-y-10 opacity-0"
                    }`}
                    style={{
                      animationIterationCount: 3,
                      textShadow: `
                        0 0 5px #ffffff,
                        0 0 10px #ffffff, 
                        0 0 15px #00ffff,
                        0 0 20px #00ffff,
                        0 0 25px #00ffff
                      `,
                      filter: "brightness(1.2)",
                    }}
                  >
                    <a
                      href={"https://www.facebook.com/phuongfzvinh/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {" "}
                      FZ104 PUBGVN
                    </a>
                  </h1>
                  <div className="bg-white bg-opacity-20 rounded-2xl p-4 border border-white border-opacity-30 backdrop-blur-sm relative z-10">
                    <p className="text-white text-xl text-center font-bold">
                      MUA BÁN TRAO ĐỔI TÀI KHOẢN PUBG PC
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* THÔNG TIN LIÊN HỆ - CHIẾM 2 CỘT */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-3xl p-6 shadow-2xl border-2 border-white border-opacity-30 h-full">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-4 border border-white border-opacity-30 backdrop-blur-sm relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-green-100 to-amber-100 blur-md opacity-0 ${
                        phoneAnimation ? "animate-pulse" : ""
                      }`}
                      style={{
                        animationDuration: "4s",
                        animationIterationCount: "infinite",
                        opacity: phoneAnimation ? 0.15 : 0,
                      }}
                    ></div>

                    <p className="text-white text-base font-bold mb-2 relative z-10">
                      LIÊN HỆ NGAY
                    </p>
                    <p
                      className={`text-white text-2xl font-bold transform transition-all duration-1000 relative z-10 ${
                        phoneAnimation ? "animate-pulse scale-105" : "scale-100"
                      }`}
                      style={{
                        textShadow: `
                          0 0 2px #ffffff,
                          0 0 4px #ffffff,
                          0 0 6px #00ff00,
                          0 0 8px #00ff00
                        `,
                        animationDuration: "2s",
                        animationIterationCount: "infinite",
                      }}
                    >
                      0838.71.2222
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-3 border-2 border-white">
                    <p className="text-white text-xs font-bold">
                      HỖ TRỢ 24/7 - BẢO HÀNH UY TÍN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VISITOR COUNTER */}
          <div className="flex justify-center mb-8">
            <VisitorCounter count={pageViews} />
          </div>

          {/* 3 Ô CHUYỂN HƯỚNG */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <button
              onClick={() => handleNavigationClick("taikhoan")}
              className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white font-bold text-lg shadow-lg border-2 border-white border-opacity-30 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                activeSection === "taikhoan" ? "ring-4 ring-cyan-400" : ""
              }`}
            >
              TÀI KHOẢN PUBG
            </button>
            <button
              onClick={() => handleNavigationClick("naptien")}
              className={`bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white font-bold text-lg shadow-lg border-2 border-white border-opacity-30 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                activeSection === "naptien" ? "ring-4 ring-green-400" : ""
              }`}
            >
              CODE NẠP TIỀN
            </button>
            <button
              onClick={() => handleNavigationClick("trangphuc")}
              className={`bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white font-bold text-lg shadow-lg border-2 border-white border-opacity-30 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                activeSection === "trangphuc" ? "ring-4 ring-orange-400" : ""
              }`}
            >
              CODE TRANG PHỤC
            </button>
          </div>

          {/* SECTION CODE NẠP TIỀN */}
          <div id="naptien" className="mb-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              CODE NẠP TIỀN
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {napTienCodes.map((code) => (
                <div
                  key={code.id}
                  onClick={handleCodeClick}
                  className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg border-2 border-white border-opacity-30 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={code.image}
                    alt={code.name}
                    className="w-full h-32 object-cover rounded-xl mb-3 border border-white"
                  />
                  <h3 className="text-white font-bold text-center mb-2">
                    {code.name}
                  </h3>
                  <p className="text-yellow-300 font-bold text-center text-lg">
                    {code.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION CODE TRANG PHỤC */}
          <div id="trangphuc" className="mb-12">
            <h2 className="text-3xl font-bold text-center text-white mb-8 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              CODE TRANG PHỤC
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {trangPhucCodes.map((code) => (
                <div
                  key={code.id}
                  onClick={handleCodeClick}
                  className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 shadow-lg border-2 border-white border-opacity-30 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={code.image}
                    alt={code.name}
                    className="w-full h-32 object-cover rounded-xl mb-3 border border-white"
                  />
                  <h3 className="text-white font-bold text-center mb-2">
                    {code.name}
                  </h3>
                  <p className="text-yellow-300 font-bold text-center text-lg">
                    {code.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION TÀI KHOẢN PUBG */}
        <div id="taikhoan">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category.name}
              accounts={accounts}
              onViewDetail={handleViewDetail}
              onDelete={deleteAccount}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
            />
          ))}

          {accounts.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 max-w-md mx-auto border-2 border-white border-opacity-30 shadow-2xl backdrop-blur-sm">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white border-opacity-30">
                  <div className="w-10 h-10 bg-cyan-400 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  ĐANG CẬP NHẬT NICK
                </h3>
                <p className="text-blue-100 text-lg">
                  Chúng tôi đang bổ sung thêm nick game chất lượng!
                </p>
              </div>
            </div>
          )}
        </div>

        <GameDetailModal
          account={selectedAccount}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default Home;
