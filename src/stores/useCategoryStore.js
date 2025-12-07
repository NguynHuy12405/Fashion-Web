import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import categoryApi from "../api/categoryApi";

export const useCategoryStore = create(
  devtools(
    persist(
      (set, get) => ({
        categories: [],
        loading: false,

        // ===== LOAD FROM API =====
        loadCategories: async () => {
          set({ loading: true });
          try {
            const res = await categoryApi.getAll();

            const formatted = res.map((c, i) => ({
              id: i + 1,
              slug: c.slug,
              name: c.name,
              url: c.url
            }));

            set({ categories: formatted });
          } catch (err) {
            console.error("❌ Load categories error:", err);
          } finally {
            set({ loading: false });
          }
        },

        addCategory: async (newCategory) => {
          try {
            // await categoryApi.create(newCategory) ← API thật
            set((state) => ({
              categories: [...state.categories, newCategory],
            }));
          } catch (err) {
            console.error("❌ Add category error:", err);
          }
        },

        updateCategory: async (id, updatedData) => {
          try {
            // await categoryApi.update(id, updatedData)
            set((state) => ({
              categories: state.categories.map((cat) =>
                cat.id === id ? { ...cat, ...updatedData } : cat
              ),
            }));
          } catch (err) {
            console.error("❌ Update category error:", err);
          }
        },

        removeCategory: async (id) => {
          try {
            // await categoryApi.delete(id)
            set((state) => ({
              categories: state.categories.filter((cat) => cat.id !== id),
            }));
          } catch (err) {
            console.error("❌ Delete category error:", err);
          }
        },

        // ===== SELECTORS =====
        getCategoryById: (id) => {
          return get().categories.find((cat) => cat.id === id);
        },

        searchCategories: (keyword) => {
          return get().categories.filter((c) =>
            c.name.toLowerCase().includes(keyword.toLowerCase())
          );
        },
      }),
      {
        name: "category-store",
      }
    )
  )
);
