import { useState } from 'react';
import { X, UploadCloud, Save } from 'lucide-react';
import { useProductStore } from '../../../stores/useProductStore';

export default function AddProduct({ isOpen, onClose }) {
  const { categories, addProduct } = useProductStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    status: 'active',
    description: '',
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: Number(formData.price),
      avatar: imagePreview,
    };
    addProduct(newProduct);
    onClose();
    setFormData({ name: '', price: '', stock: '', categoryId: '', status: 'active', description: '' });
    setImagePreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">Thêm sản phẩm mới</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmitForm} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Hình ảnh sản phẩm</label>
            <label className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all ${imagePreview ? 'border-blue-500 bg-blue-50/30' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}>
              {imagePreview ? (
                <div className="relative w-full h-full p-2">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                  <button type="button" onClick={(e) => { e.stopPropagation(); setImagePreview(null); }} className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full shadow-sm hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="bg-blue-50 p-3 rounded-full mb-3 text-blue-600 transition-transform">
                    <UploadCloud size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">Nhấn để tải ảnh lên</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG (Tối đa 5MB)</p>
                </>
              )}
              <input 
                type="file" 
                className="hidden" 
                onChange={handleImageChange} 
                accept="image/*" 
              />
            </label>
          </div>


          {/* Thông tin sản phẩm */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nhập Tên Sản Phẩm..." className="w-full px-4 py-2 border rounded-lg text-sm" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0" className="w-full px-4 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                  <option value="">Chọn danh mục</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.categoryName}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng kho</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="0" className="w-full px-4 py-2 border rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg text-sm bg-white">
                  <option value="active">Đang bán</option>
                  <option value="draft">Bản nháp</option>
                  <option value="out_stock">Hết hàng</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Nhập mô tả..." className="w-full px-4 py-2 border rounded-lg text-sm resize-none"></textarea>
            </div>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium bg-white border rounded-lg hover:bg-gray-50 cursor-pointer" >Hủy bỏ</button>
          <button onClick={handleSubmitForm} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 cursor-pointer rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Save size={16} /> Lưu sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
