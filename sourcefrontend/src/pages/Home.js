import React, { useState, useEffect, useRef } from "react";
import CategorySection from "../components/CategorySection";
import GameDetailModal from "../components/GameDetailModal";
import VisitorCounter from "../components/VisitorCounter";

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
  const hasIncremented = useRef(false); // 👈 THÊM DÒNG NÀY

  useEffect(() => {
    // CHỈ GỌI 1 LẦN DUY NHẤT
    if (!hasIncremented.current) {
      onIncrementPageViews();
      hasIncremented.current = true;
    }

    // Kích hoạt animation cho title sau 100ms
    setTimeout(() => {
      setTitleAnimation(true);
    }, 100);

    // Kích hoạt animation cho số điện thoại sau 500ms
    setTimeout(() => {
      setPhoneAnimation(true);
    }, 500);
  }, [onIncrementPageViews]); // 👈 THÊM DEPENDENCY

  const handleViewDetail = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
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

                {/* TITLE WITH GLOW AND BOUNCE ANIMATION */}
                <div className="text-center relative">
                  {/* GLOW EFFECT - VỪA PHẢI */}
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
                    SHOPACCPUBGPC
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
                    {/* PHONE GLOW EFFECT - RẤT NHẸ */}
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
                      0922.010011
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

          {/* VISITOR COUNTER - STANDALONE PROGRESS BAR */}
          <div className="flex justify-center mb-8">
            <VisitorCounter count={pageViews} />
          </div>
        </div>

        {/* CATEGORIES */}
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
