import { create } from 'zustand';
import { categories as initialCategories, products as initialProducts } from '../mockData/data';

export const useProductStore = create((set, get) => ({
  products: initialProducts,
  categories: initialCategories,

  // Thêm sản phẩm
  addProduct: (product) => set((state) => ({
    products: [...state.products, product],
  })),

  // Xóa sản phẩm theo id
  removeProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id),
  })),

  // Cập nhật sản phẩm theo id
  updateProduct: (updatedProduct) =>
  set((state) => ({
    products: state.products.map(p => p.id === updatedProduct.id ? updatedProduct : p)
  })),

  // Lấy tên category từ categoryId
  getCategoryName: (categoryId) => {
    const category = get().categories.find(c => c.id === categoryId);
    return category?.categoryName || 'Unknown';
  },
}));
