import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-2">Về chúng tôi</h4>
            <p className="text-gray-400">CC Store - Nơi mua sắm trực tuyến uy tín và chất lượng.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/*" className="hover:text-white transition">Liên hệ</Link></li>
              <li><Link to="/*" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/*" className="hover:text-white transition">Chính sách</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-2">Liên hệ</h4>
            <p className="text-gray-400">Email: info@banhang.com</p>
            <p className="text-gray-400">Điện thoại: 0123 456 789</p>
            <p className="text-gray-400">Địa chỉ: Ở đâu còn lâu mới nói</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; 2024 BanHang Store. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
}

