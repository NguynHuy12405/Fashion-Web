import { create } from "zustand";

export const usePaginationStore = create((set) => ({
  page: 1,
  limit: 10,
  total: 0,

  setPage: (page) => set({ page }),
  setTotal: (total) => set({ total }),
  resetPage: () => set({ page: 1 }),
}));
