import React from "react";
import imagetintuc from "../image/569752798_1187281479968395_8812982680074375271_n.png";

const News = () => {
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl relative z-10">
        {/* TIÊU ĐỀ CHÍNH */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-2 rounded-3xl inline-block">
            <div className="bg-black bg-opacity-90 rounded-2xl p-8 border-4 border-yellow-400">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-glow">
                QUY CÁCH - HƯỚNG DẪN MUA TÀI KHOẢN GAME PUBG CHINA
              </h1>
            </div>
          </div>
        </div>

        {/* ẢNH LỚN */}
        <div className="mb-12 transform hover:scale-105 transition-all duration-500">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-3xl">
            <img
              src={imagetintuc}
              alt="Hướng dẫn mua tài khoản PUBG China"
              className="w-full h-auto rounded-2xl border-4 border-yellow-400 shadow-2xl"
            />
          </div>
        </div>

        {/* THÔNG TIN CHÍNH */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 mb-8 border-4 border-yellow-400 shadow-2xl backdrop-blur-sm">
          <p className="text-white text-xl leading-relaxed mb-6">
            <span className="text-yellow-400 font-bold text-2xl">Nên mua</span>{" "}
            vì đa dạng đủ loại item súng, phụ kiện theo yêu cầu, không phải lo
            quá nhiều đến việc bị back như "Acc mail gốc Việt aka gmail).
          </p>
          <p className="text-white text-xl leading-relaxed mb-8">
            <span className="text-yellow-400 font-bold text-2xl">
              Luật pháp TQ
            </span>{" "}
            quy định chặt trẽ định danh CCCD và mail cũng như cấm mua bán mail
            nên việc mail gốc chỉ tồn tại ở các tài khoản clone (nick trắng).
            Nên sẽ không có email ban đầu nhưng việc bảo mật cao hơn việc mua
            tài khoản có email gốc vì những lý do sau:
          </p>
          <ul className="text-white text-xl leading-relaxed space-y-4">
            <li className="flex items-start">
              <span className="text-yellow-400 text-2xl mr-3">🎯</span>
              <span>
                <strong>Tất cả các tài khoản</strong> đều được mua bán qua sàn
                giao dịch (công ty lớn top đầu TQ). Tài khoản mua hàng của
                ChoDenPubgPc Shop đều level max - đã giao dịch &gt; 10 triệu tệ
                (hơn 40 tỷ VNĐ) được sàn bảo kê tuyệt đối (có thể bán acc sang
                cả TQ với hợp đồng điện tử chính chủ).
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 text-2xl mr-3">🔐</span>
              <span>
                <strong>Người bán/mua phải trên 18 tuổi</strong> và khi đặt lệnh
                mua/bán phải ký hợp đồng điện tử gửi đến số điện thoại chính
                chủ. Sau đó trình báo CCCD người TQ và quét faceid.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 text-2xl mr-3">🛡️</span>
              <span>
                <strong>Hạn chế tối đa 99,99%</strong> việc back lại account vì
                ở TQ việc phạt và check pháp lý công dân cực kỳ mạnh mẽ và chặt
                trẽ.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-400 text-2xl mr-3">✅</span>
              <span>
                <strong>100% tài khoản bán</strong> trên ChoDenPUBGPC shop không
                bị cảnh báo đỏ, cấm chợ hay hack/cheat.
              </span>
            </li>
          </ul>
        </div>

        {/* QUY CÁCH GIAO DỊCH */}
        <div className="bg-gradient-to-br from-yellow-600 to-orange-600 rounded-3xl p-8 mb-8 border-4 border-white shadow-2xl transform hover:scale-105 transition-all duration-300">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            🚀 QUY CÁCH GIAO DỊCH
          </h2>
          <p className="text-white text-xl text-center bg-black bg-opacity-40 rounded-2xl p-6 border-2 border-yellow-300">
            <strong>Người mua bank 100% tiền</strong> và nhận tài khoản, sau đó
            thay đổi toàn bộ thông tin bao gồm mật khẩu steam, mail steam và số
            điện thoại (nếu có cài).
          </p>
        </div>

        {/* QUY ĐỊNH BẢO HÀNH/THU LẠI ACC */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl p-8 border-4 border-yellow-400 shadow-2xl backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            📜 QUY ĐỊNH BẢO HÀNH/THU LẠI ACC
          </h2>
          <div className="space-y-6">
            {[
              "- Vì accout tạo khác location và loại tiền tệ nên quý khách nên nạp steam/gcoin bằng code nhanh gọn và an toàn hơn. Tuyệt đối không sử dụng thẻ VISA vì sẽ có xác xuất khóa steam (khi bị khóa không mua thay đổi được email và sđt ).",
              "- 100% tài khoản bán trên ChoDenPUBGPC shop không bị cảnh báo đỏ, cấm chợ hay hack/cheat. Quý khách có thể check thoải mái.",
              "- Sau khi giao dịch thành công, mọi vấn đề về hack/cheat chúng tôi từ chối mọi nghĩa vụ bảo hành và trả lời.",
              "- ChoDenPUBGPC shop bán tài khoản PUBG China 2 năm nay chưa có trường hợp tài khoản bị back lại. Nếu có các bạn hoàn toàn có thể yên tâm, chính sách bảo hành/ đền bù của chúng tôi là bảo hành 1:1 vĩnh viễn.",
              "- Nếu sau vài tháng mua cần pass lại, bán acc. ChoDenPUBGPC shop sẽ nhận thu lại / đổi acc mới bù trừ giá hợp lý (60-80% tùy acc).",
              "- Tài khoản Trung Quốc chỉ thay đổi Email và Số Điện Thoại 1 lần cho khách hàng, Nếu khách hàng tự động thay đổi Email và Số Điện Thoại, hoặc tự ý bán acc ra thị trường, chúng tôi sẽ từ chối bảo hành và không còn trách nhiệm về tài khoản đó.",
              "- Lưu ý chúng tôi chỉ nhận thu lại những tài khoản do đối tác hoặc chúng tôi bán ra, không nhận thu mua lại acc mua của nguồn khác.",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-black bg-opacity-40 rounded-2xl p-4 border-2 border-green-300 transform hover:scale-105 transition-all duration-300"
              >
                <p className="text-white text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
