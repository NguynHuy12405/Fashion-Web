export default function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const getPageList = () => {
    let pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pageList = getPageList();

  return (
    <div className="flex justify-center mt-10 gap-2">

      <button
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
        className={`
          px-4 py-2 rounded-xl text-sm border border-black/20 
          transition-all duration-200
          ${currentPage === 1 
            ? "opacity-30 cursor-not-allowed" 
            : "hover:bg-[#D2B48C]/20"
          }
        `}
      >
        Trước
      </button>

      {pageList.map((page, index) =>
        page === "..." ? (
          <div
            key={`dots-${index}`}
            className="px-3 py-2 text-black/40 select-none"
          >
            ...
          </div>
        ) : (
          <button
            key={`page-${page}`}
            onClick={() => paginate(page)}
            className={`
              w-10 h-10 rounded-xl font-medium transition-all duration-200 flex items-center justify-center border
              ${
                currentPage === page
                  ? "bg-black text-[#D2B48C] border-black shadow-[0_4px_10px_rgba(0,0,0,0.25)] scale-105"
                  : "bg-white text-black border-black/20 hover:bg-[#D2B48C]/20"
              }
            `}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
        className={`
          px-4 py-2 rounded-xl text-sm border border-black/20
          transition-all duration-200
          ${currentPage === totalPages 
            ? "opacity-30 cursor-not-allowed" 
            : "hover:bg-[#D2B48C]/20"
          }
        `}
      >
        Sau
      </button>
    </div>
  );
}
