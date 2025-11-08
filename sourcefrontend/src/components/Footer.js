import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-800 via-purple-800 to-cyan-700 shadow-2xl border-t-4 border-cyan-400 mt-auto relative overflow-hidden">
      {/* TOP GLOW EFFECT */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BRAND INFO */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-white to-amber-300 bg-clip-text text-transparent mb-4">
              shopaccpubgpc.vn
            </h3>
            <p className="text-cyan-200 text-sm mb-4">
              Địa chỉ mua bán, trao đổi tài khoản PUBG PC uy tín, chất lượng
              hàng đầu Việt Nam
            </p>
            <div className="text-cyan-200 text-sm">
              <p> Hoạt động 24/7</p>
              <p> An toàn tuyệt đối</p>
            </div>
          </div>

          {/* CONTACT INFO */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-cyan-300 mb-4"> Liên Hệ</h4>
            <div className="space-y-2 text-cyan-200 text-sm">
              <p className="font-bold text-white text-xl">0922.010011</p>
              <p> Zalo: 0922.010011</p>
              <p> Email: fz101004xxx@gmail.com</p>
            </div>
          </div>

          {/* SERVICES */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-cyan-300 mb-4"> Dịch Vụ</h4>
            <div className="space-y-2 text-cyan-200 text-sm">
              <p> Mua bán nick PUBG PC</p>
              <p> Giao dịch nhanh chóng</p>
              <p> Bảo hành uy tín</p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-cyan-600 mt-8 pt-6 text-center">
          <p className="text-cyan-300 text-sm">
            © {currentYear} fz101004xxx@gmail.com. All rights reserved. |
            <span className="text-white"> Made with for PUBG Community</span>
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
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
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
    </footer>
  );
};

export default Footer;
