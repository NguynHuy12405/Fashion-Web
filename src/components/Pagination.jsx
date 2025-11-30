
export default function Pagination({ productsPerPage, totalProducts, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

  return (
    <div className="flex justify-center mt-10 gap-2">
        {pageNumbers.map(number => (
        <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 
            ${currentPage === number 
                ? 'bg-indigo-600 text-white shadow-md scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
        >
            {number}
        </button>
        ))}
    </div>
  )
}
