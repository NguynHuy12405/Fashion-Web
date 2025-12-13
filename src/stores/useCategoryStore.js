import { create } from "zustand";
import categoryApi from "../api/categoryApi";
import { formatCategories } from "../services/categoryFormatter";
import { groupCategories } from "../services/categoryGrouper";

export const useCategoryStore = create((set, get) => ({
  categories: {},
  loading: false,

  loadCategories: async () => {
    if (Object.keys(get().categories).length) return;

    set({ loading: true });
    try {
      const res = await categoryApi.getAll();
      const raw = Array.isArray(res) ? res : res?.data ?? [];
      const formatted = formatCategories(raw);
      const grouped = groupCategories(formatted);

      set({ categories: grouped });
    } catch (e) {
      console.error(e);
      set({ categories: {} });
    } finally {
      set({ loading: false });
    }
  },

  getFlatCategories: () => {
    const grouped = get().categories;
    return Object.values(grouped).flat();
  },

  moveCategoryToGroup: (id, targetGroup) => {
    const groups = structuredClone(get().categories);
    let found;

    Object.keys(groups).forEach((g) => {
      groups[g] = groups[g].filter((c) => {
        if (c.id === id) {
          found = c;
          return false;
        }
        return true;
      });
    });

    if (found) {
      groups[targetGroup] ||= [];
      groups[targetGroup].push(found);
    }

    set({ categories: groups });
  },

  
}));
