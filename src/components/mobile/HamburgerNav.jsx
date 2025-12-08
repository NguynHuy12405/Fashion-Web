
// export default function HamburgerNav() {
//   return (
//     <div
//         className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
//         ${openMenu ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="flex justify-between items-center px-4 py-3 border-b">
//           <span className="font-bold text-lg">Menu</span>
//           <button onClick={() => setOpenMenu(false)}>
//             <X size={24} />
//           </button>
//         </div>

//         <ul className="px-2 py-4 space-y-2 overflow-y-auto h-full">
//           <li>
//             <Link to="/" onClick={() => setOpenMenu(false)} className="block p-2 hover:bg-orange-100 rounded">
//               Trang chủ
//             </Link>
//           </li>

//           {loading && <li className="p-2 text-sm text-gray-500">Đang tải...</li>}
//           {!loading &&
//             Object.keys(categories).map((group) => {
//               const items = categories[group];
//               if (!Array.isArray(items) || items.length === 0) return null;
//               return (
//                 <li key={group}>
//                   <h4 className="text-gray-500 text-sm font-semibold mb-1 pl-1">{group}</h4>
//                   <ul>
//                     {items.map((cate) => (
//                       <li key={cate.id}>
//                         <Link
//                           to={`/category/${cate.slug}`}
//                           onClick={() => setOpenMenu(false)}
//                           className="block p-2 hover:bg-orange-100 rounded"
//                         >
//                           {cate.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               );
//             })}

//           <li>
//             <Link to="/about-us" onClick={() => setOpenMenu(false)} className="block p-2 hover:bg-orange-100 rounded">
//               Về chúng tôi
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact-us" onClick={() => setOpenMenu(false)} className="block p-2 hover:bg-orange-100 rounded">
//               Liên Hệ
//             </Link>
//           </li>
//         </ul>

//         {/* Overlay khi mở menu mobile */}
//       {openMenu && (
//         <div
//           className="fixed inset-0 bg-black opacity-30 z-40"
//           onClick={() => setOpenMenu(false)}
//         />
//       )}
//       </div>
//   )
// }
