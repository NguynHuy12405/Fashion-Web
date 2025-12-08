import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductList({ titleProducts }) {
  const { products, loadProducts } = useProductStore();
  const [index, setIndex] = useState(0);
  const showCount = 5;

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const maxIndex = Math.max(products.length - showCount, 0);

  const next = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleProducts = products.slice(index, index + showCount);

  return (
    <section className="pt-12 pb-4 bg-gray-50 text-black">
      <h1 className="text-center text-4xl text-[#333] font-bold leading-6 mb-8">
        {titleProducts}
      </h1>

      <div className="relative w-full px-4 mx-auto">
        {/* BUTTON PREV */}
        <button
          onClick={prev}
          className="absolute -left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-100 z-10 hidden min-[768px]:block cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>

        {/* PRODUCT LIST */}
        <div className="grid min-[465px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1240px]:grid-cols-5 gap-6 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
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

        {/* BUTTON NEXT */}
        <button
          onClick={next}
          className="absolute -right-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow hover:bg-gray-100 z-10 hidden min-[768px]:block cursor-pointer"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
