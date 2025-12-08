import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import categoryApi from "../api/categoryApi";

export const useCategoryStore = create(
  devtools(
    persist(
      (set, get) => ({
        categories: {
          "Thời Trang Nam": [],
          "Thời Trang Nữ": [],
          "Thời Trang Trẻ Em": [],
          "Mỹ Phẩm & Làm Đẹp": [],
          "Điện Tử & Công Nghệ": [],
          "Nhà Cửa & Đời Sống": [],
          "Thể Thao & Giải Trí": [],
          "Sức Khỏe": [],
          "Phụ Kiện": [],
          "Khác": [],
        },
        loading: false,

        // ===== LOAD Categories =====
        loadCategories: async () => {
          set({ loading: true });
          try {
            const res = await categoryApi.getAll();

            const items = Array.isArray(res) ? res : res?.data ?? [];
            const formatted = items.map((c, i) => {
              if (typeof c === "string") {
                return {
                  id: i + 1,
                  slug: c,
                  name: c.replace(/-/g, " ").replace(/\b\w/g, (s) => s.toUpperCase()),
                };
              } else {
                return {
                  id: c.id ?? i + 1,
                  slug: c.slug ?? "",
                  name: c.name ?? "",
                  url: c.url ?? "",
                };
              }
            });

            const grouped = {
              "Thời Trang Nam": [],
              "Thời Trang Nữ": [],
              "Thời Trang Trẻ Em": [],
              "Mỹ Phẩm & Làm Đẹp": [],
              "Điện Tử & Công Nghệ": [],
              "Nhà Cửa & Đời Sống": [],
              "Thể Thao & Giải Trí": [],
              "Sức Khỏe": [],
              "Phụ Kiện": [],
              "Khác": [],
            };

            formatted.forEach((cate) => {
              const slug = (cate.slug || "").toLowerCase();
              const name = (cate.name || "").toLowerCase();

              // Thời Trang Nam
              if (
                slug.includes("mens") ||
                slug.includes("men-") ||
                name.includes("nam") ||
                slug.match(/\b(shirts?|pants?|suits?|ties?)\b/)
              ) {
                grouped["Thời Trang Nam"].push(cate);
              }
              // Thời Trang Nữ
              else if (
                slug.includes("womens") ||
                slug.includes("women-") ||
                name.includes("nữ") ||
                slug.match(/\b(dresses?|skirts?|blouses?)\b/)
              ) {
                grouped["Thời Trang Nữ"].push(cate);
              }
              // Trẻ Em
              else if (
                slug.includes("kids") ||
                slug.includes("children") ||
                slug.includes("baby") ||
                name.includes("trẻ em") ||
                name.includes("bé")
              ) {
                grouped["Thời Trang Trẻ Em"].push(cate);
              }
              // Mỹ Phẩm & Làm Đẹp
              else if (
                slug.match(/\b(beauty|cosmetic|makeup|skincare|fragrance|perfume)\b/) ||
                name.match(/\b(mỹ phẩm|làm đẹp|son|phấn|nước hoa|dưỡng da)\b/)
              ) {
                grouped["Mỹ Phẩm & Làm Đẹp"].push(cate);
              }
              // Điện Tử & Công Nghệ
              else if (
                slug.match(/\b(electronic|tech|phone|laptop|computer|gadget|camera)\b/) ||
                name.match(/\b(điện thoại|máy tính|laptop|camera|tai nghe)\b/)
              ) {
                grouped["Điện Tử & Công Nghệ"].push(cate);
              }
              // Nhà Cửa & Đời Sống
              else if (
                slug.match(/\b(home|furniture|kitchen|decor|garden)\b/) ||
                name.match(/\b(nhà cửa|nội thất|bếp|trang trí|vườn)\b/)
              ) {
                grouped["Nhà Cửa & Đời Sống"].push(cate);
              }
              // Thể Thao & Giải Trí
              else if (
                slug.match(/\b(sport|fitness|outdoor|game|toy)\b/) ||
                name.match(/\b(thể thao|gym|dụng cụ|đồ chơi)\b/)
              ) {
                grouped["Thể Thao & Giải Trí"].push(cate);
              }
              // Sức Khỏe
              else if (
                slug.match(/\b(health|medical|vitamin|supplement|wellness)\b/) ||
                name.match(/\b(sức khỏe|y tế|thuốc|vitamin)\b/)
              ) {
                grouped["Sức Khỏe"].push(cate);
              }
              // Phụ Kiện
              else if (
                slug.match(/\b(accessory|accessories|bag|wallet|belt|jewelry|watch)\b/) ||
                name.match(/\b(phụ kiện|túi|ví|dây nịt|đồng hồ|trang sức)\b/)
              ) {
                grouped["Phụ Kiện"].push(cate);
              }
              // Khác
              else {
                grouped["Khác"].push(cate);
              }
            });

            // Xóa các group rỗng để UI gọn gàng hơn
            const cleanedGroups = {};
            Object.keys(grouped).forEach((key) => {
              if (grouped[key].length > 0) {
                cleanedGroups[key] = grouped[key];
              }
            });

            set({ categories: cleanedGroups });
          } catch (err) {
            console.error("❌ Load categories error:", err);
            set({ categories: {} });
          } finally {
            set({ loading: false });
          }
        },

        // ===== ADD CATEGORY =====
        addCategory: (newCategory, group = "Khác") => {
          set((state) => ({
            categories: {
              ...state.categories,
              [group]: [...(state.categories[group] || []), newCategory],
            },
          }));
        },

        // ===== UPDATE CATEGORY =====
        updateCategory: (id, updatedData) => {
          const groups = get().categories;
          const newGroups = {};

          Object.keys(groups).forEach((group) => {
            newGroups[group] = groups[group].map((cat) =>
              cat.id === id ? { ...cat, ...updatedData } : cat
            );
          });

          set({ categories: newGroups });
        },

        // ===== REMOVE CATEGORY =====
        removeCategory: (id) => {
          const groups = get().categories;
          const newGroups = {};

          Object.keys(groups).forEach((group) => {
            newGroups[group] = groups[group].filter((cat) => cat.id !== id);
          });

          set({ categories: newGroups });
        },

        // ===== MOVE CATEGORY TO ANOTHER GROUP =====
        moveCategoryToGroup: (id, newGroup) => {
          const groups = get().categories;
          let categoryToMove = null;
          const newGroups = {};

          // Tìm và xóa category khỏi group hiện tại
          Object.keys(groups).forEach((group) => {
            newGroups[group] = groups[group].filter((cat) => {
              if (cat.id === id) {
                categoryToMove = cat;
                return false;
              }
              return true;
            });
          });

          // Thêm vào group mới
          if (categoryToMove) {
            if (!newGroups[newGroup]) {
              newGroups[newGroup] = [];
            }
            newGroups[newGroup].push(categoryToMove);
          }

          set({ categories: newGroups });
        },

        // ===== SELECTORS =====
        getCategoryById: (id) => {
          const groups = get().categories;
          for (let group of Object.keys(groups)) {
            const found = groups[group].find((cat) => cat.id === id);
            if (found) return found;
          }
          return null;
        },

        getCategoryBySlug: (slug) => {
          const groups = get().categories;
          for (let group of Object.keys(groups)) {
            const found = groups[group].find((cat) => cat.slug === slug);
            if (found) return found;
          }
          return null;
        },

        searchCategories: (keyword) => {
          const groups = get().categories;
          let result = [];
          Object.keys(groups).forEach((group) => {
            result = result.concat(
              groups[group].filter((cat) =>
                cat.name.toLowerCase().includes(keyword.toLowerCase())
              )
            );
          });
          return result;
        },

        getCategoriesByGroup: (groupName) => {
          return get().categories[groupName] || [];
        },

        getAllGroups: () => {
          return Object.keys(get().categories);
        },
      }),
      {
        name: "category-store",
      }
    )
  )
);