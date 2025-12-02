import { useEffect, useMemo } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import { useProductStore } from "../stores/useProductStore";
import ProductCard from "./ProductCard";

export default function ProductList({ titleProducts }) {
  const products = useProductStore((s) => s.products);
  const loadProducts = useProductStore((s) => s.loadProducts);
  const categories = useCategoryStore((s) => s.categories);

  useEffect(() => {
    loadProducts();
  }, []);

  const productsWithCategory = useMemo(() => {
    return products.map((p) => {
      const cate = categories.find((c) => c.id === p.categoryId);
      return {
        ...p,
        categoryName: cate?.categoryName || "Không có",
      };
    });
  }, [products, categories]);

  return (
    <section className="pt-12 bg-gray-50">
      <h1 className="text-center text-4xl text-[#333] font-bold leading-6 mb-8">
        {titleProducts}
      </h1>

      <div className="mx-auto px-4 w-full">
        <div className="grid min-[465px]:grid-cols-2 min-[768px]:grid-cols-3 min-[1024px]:grid-cols-4 min-[1240px]:grid-cols-5 gap-6 ">
          {productsWithCategory.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
