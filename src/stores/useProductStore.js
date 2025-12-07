import { create } from "zustand";
import productApi from "../api/productApi";
import categoryApi from "../api/categoryApi";

export const useProductStore = create((set, get) => ({
  // STATE
  products: [],
  categories: [],
  productDetail: null,

  isAddOpen: false,
  isEditOpen: false,
  selectedProduct: null,
  productFilter: "Tất cả",
  currentPage: 1,

  formData: {
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    status: "Còn hàng",
    description: "",
  },
  images: [],

  // LOAD PRODUCTS
  loadProducts: async () => {
    try {
      const data = await productApi.getAll();

      const mapped = data.products.map(p => ({
        id: p.id,
        name: p.title,
        price: p.price,
        stock: p.stock ?? 10,
        category: p.category,
        categoryId: p.category,
        status:
          p.stock === 0 ? "Hết hàng" :
          p.stock <= 5 ? "Sắp hết" :
          "Còn hàng",
        image: p.thumbnail,
        images: p.images,
        description: p.description,
      }));

      set({ products: mapped });
    } catch (err) {
      console.error("❌ Load products error:", err);
    }
  },

  // LOAD CATEGORIES
  loadCategories: async () => {
    try {
      const data = await categoryApi.getAll();

      const mapped = data.map((name, index) => ({
        id: index + 1,
        categoryName: name,
      }));

      set({ categories: mapped });
    } catch (err) {
      console.error("❌ Load categories error:", err);
    }
  },

  // GET CATEGORY NAME
  getCategoryName: (categoryId) => {
    const cat = get().categories.find((c) => c.categoryName === categoryId);
    return cat ? cat.categoryName : "Không xác định";
  },

  // LOAD DETAIL
  loadProductDetail: async (id) => {
    try {
      const p = await productApi.getById(id);

      const mapped = {
        id: p.id,
        name: p.title,
        price: p.price,
        stock: p.stock ?? 10,
        category: p.category,
        categoryId: p.category,
        image: p.thumbnail,
        images: p.images,
        description: p.description,
      };

      set({ productDetail: mapped });
    } catch (err) {
      console.error("❌ Load detail error:", err);
    }
  },

  // CRUD Local (Demo)
  addProduct: (newProduct) =>
    set((state) => ({
      products: [...state.products, newProduct],
    })),

  removeProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      ),
    })),

  // UI STATE
  toggleAddModal: (open) => set({ isAddOpen: open }),
  toggleEditModal: (open) => set({ isEditOpen: open }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  setProductFilter: (filter) => set({ productFilter: filter }),
  setCurrentPage: (page) => set({ currentPage: page }),

  // FORM
  setFormData: (data) =>
    set({
      formData: { ...get().formData, ...data },
    }),

  updateFormField: (field, value) =>
    set({
      formData: { ...get().formData, [field]: value },
    }),

  resetForm: () =>
    set({
      formData: {
        name: "",
        price: "",
        stock: "",
        categoryId: "",
        status: "active",
        description: "",
      },
      images: [],
    }),

  // IMAGES
  setImages: (imgs) => set({ images: imgs }),
  addImage: (img) =>
    set((state) => ({ images: [...state.images, img] })),
  removeImage: (index) => {
    const imgs = [...get().images];
    imgs.splice(index, 1);
    set({ images: imgs });
  },
}));
