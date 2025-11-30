import { create } from 'zustand';
import { categories, products } from '../mockData/data';

export const useProductStore = create((set, get) => ({
  products: products,
  categories: categories,
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
  removeProduct: (id) => set((state) => ({
    products: state.products.filter(p => p.id !== id)
  })),

  getCategoryName: (categoryId) => {
    const categories = get().categories || [];
    const category = categories.find(c => c.id === categoryId);
    return category ? category.categoryName : 'Unknown';
  },

}));
