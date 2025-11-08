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
                QUY CÁCH - HƯỚNG DẪN MUA TÀI KHOẢN GAME PUBG CHINA
              </h1>
            </div>
          </div>
        </div>

        {/* ẢNH LỚN */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-1 shadow-lg">
            <img
              src={imagetintuc}
              alt="Hướng dẫn mua tài khoản PUBG China"
              className="w-full h-auto rounded-lg border-2 border-blue-300 shadow-md"
            />
          </div>
        </div>

        {/* THÔNG TIN CHÍNH */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-blue-200 shadow-lg">
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-blue-800 text-base leading-relaxed">
                <span className="font-bold text-blue-700">NÊN MUA</span> vì đa
                dạng đủ loại item súng, phụ kiện theo yêu cầu, không phải lo quá
                nhiều đến việc bị back như "Acc mail gốc Việt aka gmail".
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-4 border-l-4 border-purple-500">
              <p className="text-blue-800 text-base leading-relaxed">
                <span className="font-bold text-purple-700">
                  LUẬT PHÁP TRUNG QUỐC
                </span>{" "}
                quy định chặt chẽ định danh CCCD và mail cũng như cấm mua bán
                mail nên việc mail gốc chỉ tồn tại ở các tài khoản clone (nick
                trắng). Nên sẽ không có email ban đầu nhưng việc bảo mật cao hơn
                việc mua tài khoản có email gốc vì những lý do sau:
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                title: "Tất cả các tài khoản",
                content:
                  "đều được mua bán qua sàn giao dịch (công ty lớn top đầu TQ). Tài khoản mua hàng của shopaccpubgpc.vn Shop đều level max - đã giao dịch > 10 triệu tệ (hơn 40 tỷ VNĐ) được sàn bảo kê tuyệt đối (có thể bán acc sang cả TQ với hợp đồng điện tử chính chủ).",
              },
              {
                title: "Người bán/mua phải trên 18 tuổi",
                content:
                  "và khi đặt lệnh mua/bán phải ký hợp đồng điện tử gửi đến số điện thoại chính chủ. Sau đó trình báo CCCD người TQ và quét faceid.",
              },
              {
                title: "Hạn chế tối đa 99,99%",
                content:
                  "việc back lại account vì ở TQ việc phạt và check pháp lý công dân cực kỳ mạnh mẽ và chặt chẽ.",
              },
              {
                title: "100% tài khoản bán",
                content:
                  "trên shopaccpubgpc.vn shop không bị cảnh báo đỏ, cấm chợ hay hack/cheat.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-1">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-blue-700 text-sm leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUY CÁCH GIAO DỊCH */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 mb-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 text-center">
            QUY CÁCH GIAO DỊCH
          </h2>
          <div className="bg-white bg-opacity-20 rounded-lg p-4 border border-orange-300">
            <p className="text-white text-base text-center leading-relaxed">
              <strong>Người mua bank 100% tiền</strong> và nhận tài khoản, sau
              đó thay đổi toàn bộ thông tin bao gồm mật khẩu steam, mail steam
              và số điện thoại (nếu có cài).
            </p>
          </div>
        </div>

        {/* QUY ĐỊNH BẢO HÀNH/THU LẠI ACC */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-6 text-center">
            QUY ĐỊNH BẢO HÀNH/THU LẠI ACC
          </h2>
          <div className="space-y-3">
            {[
              "Vì account tạo khác location và loại tiền tệ nên quý khách nên nạp steam/gcoin bằng code nhanh gọn và an toàn hơn. Tuyệt đối không sử dụng thẻ VISA vì sẽ có xác xuất khóa steam (khi bị khóa không mua thay đổi được email và sđt).",
              "100% tài khoản bán trên shopaccpubgpc.vn shop không bị cảnh báo đỏ, cấm chợ hay hack/cheat. Quý khách có thể check thoải mái.",
              "Sau khi giao dịch thành công, mọi vấn đề về hack/cheat chúng tôi từ chối mọi nghĩa vụ bảo hành và trả lời.",
              "shopaccpubgpc.vn shop bán tài khoản PUBG China 2 năm nay chưa có trường hợp tài khoản bị back lại. Nếu có các bạn hoàn toàn có thể yên tâm, chính sách bảo hành/đền bù của chúng tôi là bảo hành 1:1 vĩnh viễn.",
              "Nếu sau vài tháng mua cần pass lại, bán acc. shopaccpubgpc.vn shop sẽ nhận thu lại / đổi acc mới bù trừ giá hợp lý (60-80% tùy acc).",
              "Tài khoản Trung Quốc chỉ thay đổi Email và Số Điện Thoại 1 lần cho khách hàng. Nếu khách hàng tự động thay đổi Email và Số Điện Thoại, hoặc tự ý bán acc ra thị trường, chúng tôi sẽ từ chối bảo hành và không còn trách nhiệm về tài khoản đó.",
              "Lưu ý chúng tôi chỉ nhận thu lại những tài khoản do đối tác hoặc chúng tôi bán ra, không nhận thu mua lại acc mua của nguồn khác.",
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
