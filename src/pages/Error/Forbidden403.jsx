import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Forbidden403() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg text-center max-w-lg w-full border border-gray-100">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="text-red-500 w-10 h-10" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-800 mb-2">403</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Truy cập bị từ chối</h2>
        <p className="text-gray-500 mb-8">
          Xin lỗi, bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên hoặc quay lại trang chủ.
        </p>

        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <ArrowLeft size={20} />
          Quay lại trang trước
        </button>
      </div>
    </div>
  );
};