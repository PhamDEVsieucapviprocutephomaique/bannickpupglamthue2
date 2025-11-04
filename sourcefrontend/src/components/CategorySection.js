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
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-1 rounded-xl">
          <div className="bg-black bg-opacity-80 rounded-lg p-3">
            <h2 className="text-xl font-bold text-white">
              {category}{" "}
              <span className="text-yellow-400">
                ({categoryAccounts.length})
              </span>
            </h2>
          </div>
        </div>

        {categoryAccounts.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-purple-900 font-bold px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-lg border border-white text-sm"
          >
            {showAll ? "Thu gọn" : `Xem tất cả (${categoryAccounts.length})`}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
