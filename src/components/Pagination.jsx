export default function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Helper tạo danh sách trang với dấu "..."
  const getPageList = () => {
    let pages = [];

    if (totalPages <= 7) {
      // Nếu tổng trang ít → hiển thị hết
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // Trang đầu

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages); // Trang cuối
    }

    return pages;
  };

  const pageList = getPageList();

  return (
    <div className="flex justify-center mt-10 gap-2">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
        className={`px-3 py-1 rounded-lg border-[#ccc] text-sm cursor-pointer
        ${currentPage === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"}`}
      >
        Prev
      </button>

      {/* Page numbers */}
      {pageList.map((page, index) => (
        page === "..." ? (
          <div key={index} className="px-3 py-1 text-gray-400 select-none">...</div>
        ) : (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 cursor-pointer flex items-center justify-center
              ${currentPage === page
                ? "bg-orange-600 text-white shadow-md scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
          >
            {page}
          </button>
        )
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
        className={`px-3 py-1 rounded-lg border-[#ccc] text-sm cursor-pointer
        ${currentPage === totalPages ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50"}`}
      >
        Next
      </button>
    </div>
  );
}
