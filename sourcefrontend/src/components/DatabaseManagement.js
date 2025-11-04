import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "localhost backend  ";

const DatabaseManagement = ({ currentUser }) => {
  const navigate = useNavigate();
  const [tablesData, setTablesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedTable, setSelectedTable] = useState("game_nicks");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // KIỂM TRA QUYỀN TRƯỚC KHI GỌI API
    if (currentUser?.id === 1) {
      setIsAuthorized(true);
      fetchTablesData();
    } else {
      setIsAuthorized(false);
      setLoading(false);
    }
  }, [currentUser]);

  const fetchTablesData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/database/tables`);
      const data = await response.json();
      setTablesData(data);
    } catch (error) {
      console.error("Error fetching tables data:", error);
      alert("Lỗi khi tải dữ liệu database");
    } finally {
      setLoading(false);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIds = tablesData[selectedTable]?.map((row) => row.id) || [];
      setSelectedRows(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleBulkDelete = async () => {
    if (selectedRows.length === 0) {
      alert("Vui lòng chọn ít nhất một bản ghi để xóa");
      return;
    }

    if (
      !window.confirm(
        `Bạn có chắc muốn xóa ${selectedRows.length} bản ghi từ bảng ${selectedTable}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/database/bulk-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table_name: selectedTable,
          ids: selectedRows,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setSelectedRows([]);
        setSelectAll(false);
        await fetchTablesData();
      } else {
        alert(result.detail || "Lỗi khi xóa dữ liệu");
      }
    } catch (error) {
      console.error("Error deleting records:", error);
      alert("Lỗi khi xóa dữ liệu");
    }
  };

  const handleClearTable = async () => {
    if (
      !window.confirm(
        `Bạn có CHẮC CHẮN muốn xóa TOÀN BỘ dữ liệu trong bảng ${selectedTable}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/database/clear-table/${selectedTable}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        await fetchTablesData();
      } else {
        alert(result.detail || "Lỗi khi xóa bảng");
      }
    } catch (error) {
      console.error("Error clearing table:", error);
      alert("Lỗi khi xóa bảng");
    }
  };

  const renderTableData = () => {
    const data = tablesData[selectedTable] || [];

    if (data.length === 0) {
      return (
        <div className="text-center py-8 text-yellow-300">
          <p>Không có dữ liệu trong bảng này</p>
        </div>
      );
    }

    const columns = Object.keys(data[0] || {});

    return (
      <div className="overflow-x-auto">
        <table className="w-full bg-purple-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-purple-700 to-pink-600">
              <th className="p-3 text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col}
                  className="p-3 text-left text-yellow-300 font-bold"
                >
                  {col.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                className={`border-b border-purple-600 ${
                  index % 2 === 0 ? "bg-purple-900" : "bg-purple-800"
                } hover:bg-purple-700`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                    className="w-4 h-4"
                  />
                </td>
                {columns.map((col) => (
                  <td
                    key={col}
                    className="p-3 text-white text-sm max-w-xs truncate"
                  >
                    {Array.isArray(row[col])
                      ? `[${row[col].length} items]`
                      : String(row[col] || "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // CHỈ ADMIN GỐC ĐƯỢC TRUY CẬP
  if (!isAuthorized) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-gradient-to-br from-red-900 to-pink-800 rounded-2xl p-6 border-2 border-yellow-400 text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            ⚠️ Không có quyền truy cập
          </h2>
          <p className="text-yellow-300">
            Chỉ admin gốc mới được truy cập trang này.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center text-yellow-300">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 rounded-2xl shadow-xl p-6 border-2 border-yellow-400">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            🗃️ Quản Lý Cơ Sở Dữ Liệu
          </h1>
          <p className="text-yellow-300 text-sm mt-2">
            Quản lý và xóa dữ liệu từ tất cả các bảng
          </p>
        </div>

        {/* BACK BUTTON */}
        <div className="mb-6 text-center">
          <button
            onClick={() => navigate("/admin")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg border-2 border-white transform hover:scale-105"
          >
            ↩️ Quay lại Quản lý
          </button>
        </div>

        {/* TABLE SELECTOR */}
        <div className="mb-6">
          <label className="block text-yellow-300 font-medium mb-2">
            Chọn bảng:
          </label>
          <select
            value={selectedTable}
            onChange={(e) => {
              setSelectedTable(e.target.value);
              setSelectedRows([]);
              setSelectAll(false);
            }}
            className="w-full px-3 py-2 rounded-lg bg-purple-800 border-2 border-yellow-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="game_nicks">
              Game Nicks ({tablesData.game_nicks?.length || 0})
            </option>
            <option value="categories">
              Categories ({tablesData.categories?.length || 0})
            </option>
            <option value="accounts">
              Accounts ({tablesData.accounts?.length || 0})
            </option>
            <option value="page_views">
              Page Views ({tablesData.page_views?.length || 0})
            </option>
          </select>
        </div>

        {/* ACTION BUTTONS */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={handleBulkDelete}
            disabled={selectedRows.length === 0}
            className={`px-4 py-2 rounded-lg font-bold border-2 ${
              selectedRows.length === 0
                ? "bg-gray-500 text-gray-300 border-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 border-white transform hover:scale-105"
            } transition-all duration-300`}
          >
            🗑️ Xóa {selectedRows.length} bản ghi đã chọn
          </button>

          <button
            onClick={handleClearTable}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 font-bold border-2 border-white transform hover:scale-105"
          >
            💥 Xóa toàn bộ bảng
          </button>
        </div>

        {/* TABLE DATA */}
        {renderTableData()}

        {/* SELECTED COUNT */}
        {selectedRows.length > 0 && (
          <div className="mt-4 text-yellow-300 text-center">
            Đã chọn {selectedRows.length} bản ghi
          </div>
        )}
      </div>
    </div>
  );
};

export default DatabaseManagement;
