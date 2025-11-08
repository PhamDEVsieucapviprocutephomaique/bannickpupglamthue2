import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import News from "./pages/News";
import Header from "./components/Header";
import Footer from "./components/Footer";

import bg1 from "./image/anh1.jpg";
import bg2 from "./image/anh2.jpg";
import bg3 from "./image/anh3.jpg";
import bg4 from "./image/anh4.jpg";
import bg5 from "./image/anh5.jpg";
import bg6 from "./image/anh6.jpg";
import bg7 from "./image/anh7.jpg";
import bg8 from "./image/anh8.jpg";
import bg9 from "./image/anh9.jpg";

// const API_URL = "http://localhost:8000/api";
const API_URL = "https://api.shopaccpubgpc.vn/api";

function AdminWrapper(props) {
  const location = useLocation();
  return <Admin key={location.pathname + location.key} {...props} />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [pageViews, setPageViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentBg, setCurrentBg] = useState(0);
  const [nextBg, setNextBg] = useState(1);

  const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9];

  // BACKGROUND TRANSITION
  useEffect(() => {
    let currentIndex = 0;
    const changeBackground = () => {
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      setNextBg(nextIndex);
      setTimeout(() => {
        setCurrentBg(nextIndex);
        currentIndex = nextIndex;
      }, 50);
    };
    setNextBg(1);
    const interval = setInterval(changeBackground, 8000);
    return () => clearInterval(interval);
  }, []);

  // CHECK LOGIN STATE KHI APP MOUNT
  useEffect(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("currentUser");

    if (savedLoginState === "true" && savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
    }

    fetchCategories();
    fetchAccounts();
    fetchPageViews();
    fetchUsers();
  }, []);

  // LẤY DANH SÁCH CATEGORIES
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/categories/`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // LẤY DANH SÁCH GAME NICKS
  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/game-nicks/`);
      const data = await response.json();

      const formattedAccounts = data.map((nick) => ({
        id: nick.id,
        title: nick.title,
        category: nick.category,
        price: nick.price,
        details: nick.details,
        facebookLink: nick.facebook_link,
        images: nick.images || [],
        ownerId: nick.owner_id,
      }));

      setAccounts(formattedAccounts);
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setAccounts([]);
    } finally {
      setLoading(false);
    }
  };

  // LẤY DANH SÁCH USERS
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users/`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // LẤY PAGE VIEWS
  const fetchPageViews = async () => {
    try {
      const response = await fetch(`${API_URL}/page-views/`);
      const data = await response.json();
      setPageViews(data.count);
    } catch (error) {
      console.error("Error fetching page views:", error);
    }
  };

  // TĂNG PAGE VIEWS
  const incrementPageViews = async () => {
    try {
      await fetch(`${API_URL}/page-views/increment`, { method: "POST" });
      await fetchPageViews();
    } catch (error) {
      console.error("Error incrementing page views:", error);
    }
  };

  // ĐĂNG NHẬP
  const handleLogin = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const user = {
          id: data.user_id,
          username: data.username,
          role: data.role,
        };

        setIsLoggedIn(true);
        setCurrentUser(user);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        await fetchUsers();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail || "Đăng nhập thất bại" };
      }
    } catch (error) {
      return { success: false, error: "Lỗi kết nối đến server" };
    }
  };

  // ĐĂNG XUẤT
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
  };

  // THÊM TÀI KHOẢN MỚI
  const addAccount = async (newAccount) => {
    try {
      const accountData = {
        ...newAccount,
        owner_id: currentUser?.id || 1,
      };

      const response = await fetch(`${API_URL}/game-nicks/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      });

      if (response.ok) {
        await fetchAccounts();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding account:", error);
      return false;
    }
  };

  // XÓA TÀI KHOẢN
  const deleteAccount = async (id) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để xóa nick!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/game-nicks/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchAccounts();
        return true;
      } else {
        const error = await response.json();
        alert(error.detail || "Không thể xóa nick!");
        return false;
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Lỗi khi xóa nick!");
      return false;
    }
  };

  // THÊM CATEGORY
  const addCategory = async (newCategory) => {
    if (!newCategory || categories.find((cat) => cat.name === newCategory))
      return;

    try {
      const response = await fetch(`${API_URL}/categories/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        const error = await response.json();
        alert(error.detail || "Không thể thêm category!");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Lỗi khi thêm category!");
    }
  };

  // XÓA CATEGORY
  const removeCategory = async (categoryToRemove) => {
    try {
      const category = categories.find((cat) => cat.name === categoryToRemove);
      if (!category) {
        alert("Không tìm thấy category!");
        return;
      }

      const response = await fetch(`${API_URL}/categories/${category.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        const error = await response.json();
        alert(error.detail || "Không thể xóa category!");
      }
    } catch (error) {
      console.error("Error removing category:", error);
      alert("Lỗi khi xóa category!");
    }
  };

  // SẮP XẾP CATEGORY
  const reorderCategory = async (categoryId, direction) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để sắp xếp categories!");
      return;
    }

    try {
      const endpoint =
        direction === "up"
          ? `${API_URL}/categories/${categoryId}/move-up`
          : `${API_URL}/categories/${categoryId}/move-down`;

      const response = await fetch(endpoint, { method: "PUT" });

      if (response.ok) {
        await fetchCategories();
      } else {
        const error = await response.json();
        alert(error.detail || "Không thể sắp xếp category!");
      }
    } catch (error) {
      console.error("Error reordering category:", error);
      alert("Lỗi khi sắp xếp category!");
    }
  };

  // QUẢN LÝ USERS
  const addUser = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        await fetchUsers();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail };
      }
    } catch (error) {
      return { success: false, error: "Lỗi kết nối" };
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUsers();
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.detail };
      }
    } catch (error) {
      return { success: false, error: "Lỗi kết nối" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl animate-pulse">
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        {/* BACKGROUND SLIDESHOW - KHÔNG CÓ LỚP TRẮNG MỜ */}
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${backgrounds[currentBg]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              opacity: 1,
            }}
          ></div>

          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${backgrounds[nextBg]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              opacity: 0,
            }}
          ></div>
        </div>

        {/* GLITTER EFFECT */}
        <div className="fixed inset-0 z-1 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            >
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full blur-sm opacity-60 shadow-lg"></div>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header
            isLoggedIn={isLoggedIn}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />

          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    accounts={accounts}
                    categories={categories}
                    deleteAccount={deleteAccount}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    pageViews={pageViews}
                    onIncrementPageViews={incrementPageViews}
                  />
                }
              />
              <Route path="/news" element={<News />} />
              <Route
                path="/admin"
                element={
                  <AdminWrapper
                    addAccount={addAccount}
                    categories={categories}
                    addCategory={addCategory}
                    removeCategory={removeCategory}
                    reorderCategory={reorderCategory}
                    addUser={addUser}
                    deleteUser={deleteUser}
                    users={users}
                    fetchUsers={fetchUsers}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    deleteAccount={deleteAccount}
                  />
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
