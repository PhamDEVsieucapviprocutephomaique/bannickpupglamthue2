import React, { useState, useEffect } from "react";
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

  // Tăng page views khi component mount
  useEffect(() => {
    onIncrementPageViews();
  }, []);

  const handleViewDetail = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* HERO SECTION */}
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-2 rounded-3xl mb-8 animate-pulse shadow-2xl">
              <div className="bg-black bg-opacity-80 rounded-2xl p-6 border-4 border-yellow-400">
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-glow">
                  CHỢ ĐEN <span className="text-white">PUBG PC</span>
                </h1>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900 to-indigo-900 border-4 border-yellow-400 rounded-3xl p-8 max-w-2xl mx-auto shadow-3xl transform hover:scale-105 transition-all duration-500 backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                🎮 MUA BÁN TRAO ĐỔI TÀI KHOẢN PUBG PC 🎮
              </p>
              <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-4 mt-4 animate-bounce border-2 border-white">
                <p className="text-white text-xl font-bold">
                  📞 LIÊN HỆ:{" "}
                  <span className="text-yellow-300 text-2xl">0922.010011</span>
                </p>
              </div>
            </div>

            {/* VISITOR COUNTER */}
            <VisitorCounter count={pageViews} />
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
              <div className="bg-gradient-to-br from-purple-900 to-pink-800 border-4 border-yellow-400 rounded-3xl p-12 max-w-md mx-auto transform hover:scale-105 transition-all duration-500 backdrop-blur-sm">
                <div className="text-8xl mb-6 animate-bounce">🎯</div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  ĐANG CẬP NHẬT NICK
                </h3>
                <p className="text-purple-200 text-xl">
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
    </div>
  );
};

export default Home;
