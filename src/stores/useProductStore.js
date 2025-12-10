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

  // GET CATEGORY NAME
getCategoryName: (slug) => {
  if (!slug) return "Chưa phân loại";

  const cat = get().categories.find((c) => c.slug === slug);
  return cat ? cat.name : "Chưa phân loại";
},

// LOAD PRODUCTS
loadProducts: async () => {
  try {
    const data = await productApi.getAll();

    const mapped = data.products.map(p => ({
      id: p.id,
      name: p.title,
      price: Number(p.price) || 0,
      stock: p.stock ?? 10,
      category: p.category ?? "",
      categoryId: p.category ?? "",
      status:
        p.stock === 0 ? "Hết hàng" :
        p.stock <= 5 ? "Sắp hết" : "Còn hàng",
      image: p.thumbnail,
      images: p.images,
      description: p.description,
      rating: Number(p.rating) || 0,
      discountPercentage: Number(p.discountPercentage) || 0,
      reviewCount: Array.isArray(p.reviews) ? p.reviews.length : 0,
      reviews: Array.isArray(p.reviews) || [],
    }));

    set({ products: mapped });
  } catch (err) {
    console.error("Load products error:", err);
  }
},

  loadCategories: async () => {
  try {
    const data = await categoryApi.getAll();

    const mapped = data.map((slug, index) => ({
      id: index + 1,
      slug: slug,
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
    }));

    set({ categories: mapped });
  } catch (err) {
    console.error("Load categories error:", err);
  }
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
        reviewCount: p.reviews.length,
        reviews: p.reviews,
      };

      set({ productDetail: mapped });
    } catch (err) {
      console.error("Load detail error:", err);
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
