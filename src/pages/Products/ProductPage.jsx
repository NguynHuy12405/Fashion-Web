import { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Pagination from '../../components/Pagination';
import SideBarFilter from '../../components/SideBarFilter';
import ProductCard from '../../components/ProductCard';
import { useProductStore } from '../../stores/useProductStore';


export default function ProductPage() {
    const products = useProductStore((s) => s.products)
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    // Logic phân trang
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

  return (
    <>
        {/* Header */}
        <Header />
        
        {/* Breadcrumb & Title */}
        <div className="text-black mx-auto px-4 pt-[100px] pb-8 min-h-screen bg-white flex flex-col ">
            <div className="flex flex-col lg:flex-row gap-8">
                <aside className="w-full lg:w-1/4 shrink-0">
                    <SideBarFilter />
                </aside>

                <main className="w-full lg:w-3/4">
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tất cả sản phẩm</h1>
                        <p className="text-gray-500 mb-2">Tìm thấy {products.length} sản phẩm chất lượng cho bạn</p>
                    </div>
                    
                    {/* Thanh công cụ sắp xếp (Optional) */}
                    <div className="flex justify-between items-center mb-6 bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                        <span className="text-sm text-gray-500">Hiển thị {currentProducts.length} kết quả</span>
                        <select className="border-none text-sm font-medium focus:ring-0 cursor-pointer text-gray-700 bg-transparent">
                            <option>Mới nhất</option>
                            <option>Giá thấp đến cao</option>
                            <option>Giá cao đến thấp</option>
                            <option>Bán chạy</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <Pagination
                        productsPerPage={productsPerPage} 
                        totalProducts={products.length} 
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </main>
            </div>
        </div>

        {/* Footer */}
        <Footer />
    </>
  );
};