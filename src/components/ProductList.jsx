import { useCategoryStore } from "../stores/useCategoryStore";
import { useProductStore } from "../stores/useProductStore"
import ProductCard from './ProductCard';

export default function ProductList({titleProducts}) {
  const products = useProductStore((state) => state.products);
  const categories = useCategoryStore((state) => state.categories);
  const productsWithCategory = products.map(p => ({
    ...p,
    categoryName: categories.find(c => c.id === p.categoryId)?.categoryName || "Không có"
  }));

  return (
    <section className="pt-12 bg-gray-50">
        <h1 className="text-center text-4xl text-[#333] font-bold leading-6 mb-8">{titleProducts}</h1>
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
