import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-red-900 border-t-4 border-yellow-400 mt-auto">
      {/* TOP GLOW EFFECT */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 animate-pulse"></div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BRAND INFO */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent mb-4">
              ChoDenPUBGPC
            </h3>
            <p className="text-white text-sm mb-4">
              🎮 Địa chỉ mua bán, trao đổi tài khoản PUBG PC uy tín, chất lượng
              hàng đầu Việt Nam
            </p>
            <div className="text-yellow-300 text-sm">
              <p>⏰ Hoạt động 24/7</p>
              <p>🔒 An toàn tuyệt đối</p>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-yellow-400 mb-4">
              📞 Liên Hệ
            </h4>
            <div className="space-y-2 text-white text-sm">
              <p className="font-bold text-yellow-300 text-xl">0922.010011</p>
              <p>💬 Zalo: 0922.010011</p>
              <p>📧 Email: chodenpubgpc@gmail.com</p>
              <p>🏠 Địa chỉ: Hà Nội, Việt Nam</p>
            </div>
          </div>

          {/* SERVICES */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-yellow-400 mb-4">
              🎯 Dịch Vụ
            </h4>
            <div className="space-y-2 text-white text-sm">
              <p>💰 Mua bán nick PUBG PC</p>
              <p>⚡ Giao dịch nhanh chóng</p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-yellow-400 mt-8 pt-6 text-center">
          <p className="text-yellow-300 text-sm">
            © {currentYear} ChoDenPUBGPC. All rights reserved. |
            <span className="text-white"> Made with ❤️ for PUBG Community</span>
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* BOTTOM GLOW EFFECT */}
      <div className="h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60 animate-pulse"></div>
    </footer>
  );
};

export default Footer;
