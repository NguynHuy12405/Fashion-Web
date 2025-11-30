import { FileQuestion, Home } from 'lucide-react';

export default function NotFound404() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
      
      {/* Animation/Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 animate-pulse" />
        <FileQuestion className="relative text-indigo-600 w-32 h-32" strokeWidth={1.5} />
      </div>

      <h1 className="text-8xl font-black text-gray-900 mb-4 tracking-tighter">404</h1>
      
      <p className="text-2xl font-bold text-gray-800 mb-2">Oops! Không tìm thấy trang</p>
      
      <p className="text-gray-500 max-w-md mx-auto mb-8">
        Trang bạn đang tìm kiếm có thể đã bị xóa, thay đổi tên hoặc tạm thời không khả dụng.
      </p>

      <a href="/" className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
        <Home size={20} />
        Về Trang Chủ
      </a>
    </div>
  );
};

 NotFound404;