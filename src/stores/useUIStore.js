import { create } from "zustand";

export const useUIStore = create((set) => ({
  // ===== MODAL =====
  isAddOpen: false,
  isEditOpen: false,
  selectedProduct: null,

  toggleAddModal: (open) => set({ isAddOpen: open }),
  toggleEditModal: (open) => set({ isEditOpen: open }),
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  // ===== FILTER =====
  productFilter: "Tất cả",
  searchKeyword: "",

  setProductFilter: (filter) => set({ productFilter: filter }),
  setSearchKeyword: (value) => set({ searchKeyword: value }),

  // ===== PAGINATION =====
  currentPage: 1,
  pageSize: 12,

  setCurrentPage: (page) => set({ currentPage: page }),
  setPageSize: (size) => set({ pageSize: size }),
  resetPage: () => set({ currentPage: 1 }),
}));
