công nghệ sử dụng
backend : fastapi, phương thức ftp, cloudinary
frontend : reactjs(javascript, taiwinlcss,...), kỹ thuật lazy loading
database: postgresql
deploy : cloud hosting

note : web không có bảo mật hay gì hết vì đã hỏi qua khách hàng không cần, sẽ liên hệ mở rộng thành web lớn nma trong tương lại :Đ

web bán nick pupg đơn giản và quản lý các loại tài khoản cho admin gốc , quản lý các admin, cộng tác viên phụ, báo cáo lưu lượng web ,....

cách chạy :
1 : ftp_client.py sửa lại thành các thông số host ,password ứng với host(cpanel,......)
2 : database.py sửa lại chay với local hoặc neon,... hoặc host(nếu hỗ trợ)
3 : python -m venv myenv -> source myenv/bin/activate ->
myenv\Scripts\activate.bat
4 : fastapi dev main.py ( tự chọn post hoặc deploy lên render)
frontendt:
5 : npm install
6 : npm start =))
