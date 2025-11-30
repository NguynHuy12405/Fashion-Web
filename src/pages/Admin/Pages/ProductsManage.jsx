import { useState } from 'react';
import { Search, Plus, Filter, Edit2, Trash } from 'lucide-react';
import { useProductStore } from '../../../stores/useProductStore';
import AddProduct from '../componentAdmin/AddProduct';
import EditProduct from '../componentAdmin/EditProduct';
import StatusBadge from '../../../components/StatusBadge';

export default function ManageProducts() {
  const products = useProductStore((s) => s.products);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleSaveProduct = (updatedProduct) => {
    updateProduct(updatedProduct); // cần implement updateProduct trong store
    setIsEditOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sản phẩm</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý kho hàng và danh mục sản phẩm</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-sm transition-all text-sm font-medium cursor-pointer">
          <Plus size={18} /> Thêm sản phẩm
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
              <th className="px-6 py-4">Tên sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Giá bán</th>
              <th className="px-6 py-4 text-center">Kho</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.img} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-100" />
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">{item.category}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.price}</td>
                <td className="px-6 py-4 text-center text-gray-600">{item.stock}</td>
                <td className="px-6 py-4"><StatusBadge status={item.status} /></td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditClick(item)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddProduct isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <EditProduct
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        product={selectedProduct} 
        onSave={handleSaveProduct} 
      />
    </div>
  );
};
