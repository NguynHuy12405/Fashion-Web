import { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/card/ProductCard";

export default function ProductList({ titleProducts }) {
  const { products, loadProducts } = useProductStore();
  const [index, setIndex] = useState(0);
  const showCount = 5;

  useEffect(() => {
    loadProducts();
  }, []);

  const maxIndex = Math.max(products.length - showCount, 0);

  const next = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const visibleProducts = products.slice(index, index + showCount);

  return (
    <section className="pt-12 pb-4 bg-white text-black">
      <h1 className="text-center text-4xl font-bold mb-10 text-black tracking-tight">
        {titleProducts}
      </h1>

      <div className="relative w-full px-4 mx-auto">

        {/* BUTTON PREV */}
        <button
          onClick={prev}
          className="
            absolute -left-3 top-1/2 -translate-y-1/2 
            bg-white border border-black/20 text-black
            w-12 h-12 rounded-full
            flex items-center justify-center
            shadow-md hover:bg-[#D2B48C]/30 transition 
            hidden min-[768px]:flex z-10 cursor-pointer
          "
        >
          <ChevronLeft size={22} />
        </button>

        {/* PRODUCT LIST */}
        <div className="grid min-[465px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1240px]:grid-cols-5 gap-6 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 70 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -70 }}
                transition={{ duration: 0.38, ease: "easeOut" }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* BUTTON NEXT */}
        <button
          onClick={next}
          className="
            absolute -right-3 top-1/2 -translate-y-1/2 
            bg-white border border-black/20 text-black
            w-12 h-12 rounded-full
            flex items-center justify-center
            shadow-md hover:bg-[#D2B48C]/30 transition 
            hidden min-[768px]:flex z-10 cursor-pointer
          "
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}
