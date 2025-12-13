import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProductStore } from "../../stores/useProductStore";
import SideBarFilter from "../../components/filter/SideBarFilter";
import Pagination from "../../components/pagination/Pagination";
import ProductCard from "../../components/card/ProductCard";

export default function ProductPage() {
  const {
    products,
    loadProducts,
    page,
    limit,
    total,
    setPage,
    loading,
  } = useProductStore();

  useEffect(() => {
    loadProducts({ page, limit });
    }, [page, limit]);

    const totalPages = limit ? Math.ceil(total / limit) : 0;

    const handlePaginate = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <div className="text-black mx-auto px-4 pt-[30px] pb-8 min-h-screen bg-white flex flex-col">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-1/4 shrink-0">
          <SideBarFilter />
        </aside>

        {/* MAIN */}
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              Tất cả sản phẩm
            </h1>
          </div>

          {/* TOOLBAR */}
          <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
            <span className="text-sm text-gray-500">
              Hiển thị {products.length} / {total} sản phẩm
            </span>

            <select className="border-none text-sm font-medium focus:ring-0 cursor-pointer text-gray-700 bg-transparent">
              <option value="newest">Mới nhất</option>
              <option value="price_asc">Giá thấp đến cao</option>
              <option value="price_desc">Giá cao đến thấp</option>
              <option value="best">Bán chạy</option>
            </select>
          </div>

          {/* PRODUCT GRID */}
          {loading ? (
            <p className="text-center py-10">Đang tải sản phẩm...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* PAGINATION */}
            <span className="text-sm text-gray-500">
                Hiển thị {products.length} / {total || 0} sản phẩm
            </span>

            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePaginate}
                />
            )}

        </main>
      </div>
    </div>
  );
}
