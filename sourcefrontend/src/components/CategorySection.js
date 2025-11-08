import React, { useState } from "react";
import GameCard from "./GameCard";

const CategorySection = ({
  category,
  accounts,
  onViewDetail,
  onDelete,
  isLoggedIn,
  currentUser,
}) => {
  const [showAll, setShowAll] = useState(false);

  const categoryAccounts = accounts.filter(
    (account) => account.category === category
  );
  const displayedAccounts = showAll
    ? categoryAccounts
    : categoryAccounts.slice(0, 4);

  if (categoryAccounts.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 rounded-2xl p-1 shadow-2xl">
          <div className="bg-gradient-to-br from-white via-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-cyan-200">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              {category}{" "}
              <span className="text-blue-500">({categoryAccounts.length})</span>
            </h2>
          </div>
        </div>

        {categoryAccounts.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-2xl border-2 border-cyan-400 transform hover:scale-105"
          >
            {showAll
              ? "📦 Thu gọn"
              : `📂 Xem tất cả (${categoryAccounts.length})`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedAccounts.map((account) => (
          <GameCard
            key={account.id}
            account={account}
            onViewDetail={onViewDetail}
            onDelete={onDelete}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
