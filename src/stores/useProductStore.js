import { create } from "zustand";
import { categories, products as ProductData } from "../mockData/data";

export const useProductStore = create((set, get) => ({
  // STATE
  products: [],
  categories,
  productDetail: null,

  // ACTIONS
  // Lấy danh sách sản phẩm từ fake data
  loadProducts: () => {
    set({
      products: ProductData.products
    });
  },

  getCategoryName: (categoryId) => {
    const cat = get().categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Không xác định";
  },

  // Lấy chi tiết sản phẩm theo id
  loadProductDetail: (id) => {
    const product = ProductData.getSingleProduct(id);
    set({
      productDetail: product || null
    });
  },

  // Thêm sản phẩm
  addProduct: (newProduct) => {
    set((state) => ({
      products: [...state.products, newProduct],
    }));
  },

  // Xóa sản phẩm
  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  // Cập nhật sản phẩm
  updateProduct: (updatedProduct) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
    }));
  },
}));
