import { useState, useEffect } from 'react';
import { X, UploadCloud, Save } from 'lucide-react';
import { useCategoryStore } from '../../../stores/useCategoryStore';

export default function EditProduct({ isOpen, onClose, product, onSave }) {
  const categories = useCategoryStore((s) => s.categories);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('active');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setStock(product.stock || '');
      setCategory(product.category || (categories[0] ? categories[0].id : ''));
      setStatus(product.status || 'active');
      setDescription(product.description || '');
      setImagePreview(product.img || null);
    }
  }, [product, categories]);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...product,
      name,
      price,
      stock,
      category,
      status,
      description,
      img: imagePreview
    };
    onSave(updatedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-800">Chỉnh sửa sản phẩm</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Avatar / Image */}
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
              <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán</label>
                <input 
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng kho</label>
                <input 
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm bg-white"
                >
                  <option value="active">Đang bán</option>
                  <option value="draft">Bản nháp</option>
                  <option value="out_stock">Hết hàng</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
              <textarea 
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none text-sm resize-none"
              />
            </div>
          </div>
        </form>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-lg hover:bg-gray-50 cursor-pointer">
            Hủy bỏ
          </button>
          <button onClick={handleSubmit} className="cursor-pointer px-4 py-2 text-sm text-white bg-blue-600 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <Save size={16} /> Lưu sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
