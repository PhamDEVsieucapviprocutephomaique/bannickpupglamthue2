import React from "react";
import imagetintuc from "../image/569752798_1187281479968395_8812982680074375271_n.png";

const News = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* TIÊU ĐỀ CHÍNH */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-1 shadow-xl inline-block">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-300">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                CÁCH THỨC GIAO DỊCH & UY TÍN CỦA SHOP
              </h1>
            </div>
          </div>
        </div>

        {/* THÔNG TIN CHÍNH */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-200 shadow-lg">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-blue-800 text-base leading-relaxed">
                <span className="font-bold text-blue-700">FZ104 SHOP</span> tự
                tin có nhiều năm mua & bán tài khoản ở cộng đồng PUBGPC Việt
                Nam, khách hàng có thể thoải mái kiểm tra uy tín trên toàn group
                PUBGPC Việt Nam.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-blue-800 text-base leading-relaxed">
                <span className="font-bold text-purple-700">
                  Group Facebook:
                </span>{" "}
                https://www.facebook.com/groups/fz104muabanaccount/
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-blue-800 text-base leading-relaxed">
                Khách hàng thanh toán 100% số tiền tài khoản cần mua, sau đó
                SHOP sẽ thay đổi thông tin STEAM ( SDT + EMAIL ). Có thể giao
                dịch trực tiếp tại nhà ở khu vực Bến Tre ( cũ ) nếu khách hàng
                yêu cầu.
              </p>
            </div>
          </div>
        </div>

        {/* QUY ĐỊNH BẢO HÀNH/THU LẠI ACC */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            CHẾ ĐỘ BẢO HÀNH & THU MUA
          </h2>
          <div className="space-y-3">
            {[
              "1. Tài khoản khách hàng mua lưu ý không được nạp Visa + Mastercard + Paypal và các loại thẻ tín dụng nội địa",
              "2. Không được tự ý gỡ bỏ SDT đã cài ở Steam, hoặc tự ý thay đổi SDT + Email Steam.",
              "3. Bảo hành vĩnh viễn những tài khoản từ WEBSITE bán ra, bảo hành 100% giá trị mua hàng",
              "4. Nếu khách hàng tự ý bán người khác bên SHOP sẽ không chịu trách nhiệm bảo hành hoặc cung cấp thông tin",
              "5. Không bảo hành những vấn đề BAN VĨNH VIỄN PUBG đối với những tài khoản đã được trao tới tay khách hàng trong vòng 5 ngày",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-green-500 bg-opacity-20 rounded-lg border border-green-400"
              >
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  •
                </div>
                <p className="text-green-100 text-sm leading-relaxed flex-1">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            QUAY ĐẦU TÀI KHOẢN
          </h2>
          <div className="space-y-3">
            {[
              "1. Khi khách hàng chơi chán, bán SHOP sẽ thu quay đầu 70% theo thời giá, tradeup 80% theo thời giá ( Không trade với những tài khoản không phải từ SHOP bán ra )",
              "2. Không từ chối quay đầu với bất cứ lý do gì",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-green-500 bg-opacity-20 rounded-lg border border-green-400"
              >
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                  •
                </div>
                <p className="text-green-100 text-sm leading-relaxed flex-1">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
