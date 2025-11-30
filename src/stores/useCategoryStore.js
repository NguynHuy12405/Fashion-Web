import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { categories } from "../mockData/data";

export const useCategoryStore = create(
  devtools(
    persist(
      (set, get) => ({
        categories: categories,

        // ===== CRUD =====

        addCategory: (category) =>
          set((state) => ({
            categories: [...state.categories, category],
          })),

        updateCategory: (id, newData) =>
          set((state) => ({
            categories: state.categories.map((cat) =>
              cat.id === id ? { ...cat, ...newData } : cat
            ),
          })),

        removeCategory: (id) =>
          set((state) => ({
            categories: state.categories.filter((cat) => cat.id !== id),
          })),

        clearCategories: () => set({ categories: [] }),

        // ===== SELECTORS =====

        getCategoryById: (id) => {
          return get().categories.find((cat) => cat.id === id);
        },

        getCategoryCount: () => get().categories.length,

        // Lọc category chứa tên (ví dụ cho search)
        searchCategories: (keyword) => {
          return get().categories.filter((c) =>
            c.name.toLowerCase().includes(keyword.toLowerCase())
          );
        },
      }),
      {
        name: "category-store", // key của localStorage
      }
    )
  )
);
