export const categories = [
  { id: 0, categoryName: "Tất cả" },
  { id: 1, categoryName: "Áo Thun" },
  { id: 2, categoryName: "Giày" },
  { id: 3, categoryName: "Quần dài" },
  { id: 4, categoryName: "Áo Hoodie" },
  { id: 5, categoryName: "Áo Jacket" },
  { id: 6, categoryName: "Mũ" },
];

// Products
export const products = (() => {
  const products = Array.from({ length: 24 }, (_, i) => {
    const stock = Math.floor(Math.random() * 21);
    let status = "Còn hàng";
    if (stock === 0) status = "Hết hàng";
    else if (stock <= 5) status = "Sắp hết";

    return {
      id: i + 1,
      name: `Sản phẩm cao cấp ${i + 1}`,
      categoryId: (i % 6) + 1,
      price: Math.floor(Math.random() * 1000000 + 100000),
      image: `https://picsum.photos/300/300?random=${i + 1}`,
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      reviews: Math.floor(Math.random() * 100),
      stock,
      status,
      description: `Mô tả chi tiết cho sản phẩm cao cấp ${i + 1}. Sản phẩm chất lượng cao, được nhiều người tin dùng.`,
      images: Array.from({ length: 4 }, (_, j) => `https://picsum.photos/600/600?random=${i * 10 + j}`),
    };
  });

  const getSingleProduct = (id) => {
    return products.find((p) => p.id === id) || null;
  };

  return {
    products,
    singleProduct: getSingleProduct(1),
    getSingleProduct,
  };
})();

// Orders
export const orders = [
  {
    id: "#ORD-7782",
    userId: 1,
    customer: "Nguyễn Văn A",
    date: "2023-10-25", 
    items: [
      {
        id: 1,
        nameItem: "Áo Thun Xanh",
        quantity: 2,
      },
      {
        id: 2,
        nameItem: "Áo Thun Đỏ",
        quantity: 1,
      },
    ],
    total: 32500000,
    status: "Hoàn thành",
  },
  { 
    id: "#ORD-7783",
    userId: 3,
    customer: "Trần Thị B",
    date: "2023-10-26", 
    items: [
      {
        id: 1,
        nameItem: "Áo Thun Xanh",
        quantity: 2,
      },
      {
        id: 2,
        nameItem: "Áo Thun Đỏ",
        quantity: 1,
      },
    ], total: 1200000,
    status: "Đang xử lý"
  },
  { 
    id: "#ORD-7784",
    userId: 4,
    customer: "Lê Hoàng C",
    date: "2023-10-26",
    items: [
      {
        id: 1,
        nameItem: "Áo Thun Trắng",
        quantity: 2,
      },
      {
        id: 2,
        nameItem: "Áo Thun Vàng",
        quantity: 1,
      },
    ],
    total: 15800000,
    status: "Đang giao"
  },
  {
    id: "#ORD-7785",
    customer: "Phạm Nhật D",
    date: "2023-10-27",
    items: [
      {
        id: 1,
        nameItem: "Áo Thun Tím",
        quantity: 2,
      },
      {
        id: 2,
        nameItem: "Áo Thun Hồng",
        quantity: 1,
      },
    ],
    total: 550000,
    status: "Đã hủy"
  },
];

// Users
export const users = [
  { id: 1, name: "Admin", email: "admin@gmail.com", password: "1", role: "admin", status: "Active", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Trần Thị B", email: "tranthib@example.com", password: "0", role: "user", status: "Active", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Lê Văn C", email: "levanc@example.com", password: "2", role: "editor", status: "Inactive", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Phạm Thị D", email: "phamthid@example.com", password: "0", role: "user", status: "Active", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Hoàng Văn E", email: "hoangvane@example.com", password: "0", role: "user", status: "Suspended", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "Nguyễn Văn A", email: "nguyenvana@example.com", password: "1", role: "admin", status: "Active", avatar: "https://i.pravatar.cc/150?u=6" },
];

// Slider
export const slider = [
  { id: 1, img: "./img/slider.png", title: "Giảm giá iPhone 17 Pro Max", subtitle: "Giảm đến 20% – số lượng có hạn!" },
  { id: 2, img: "./img/slider.png", title: "Samsung Galaxy S25 Ultra", subtitle: "Công nghệ vượt trội – camera AI siêu nét" },
  { id: 3, img: "./img/slider.png", title: "Xiaomi 15 Ultra", subtitle: "Pin 2 ngày – sạc 120W – hiệu năng khủng" },
];

// Stats
export const stats = [
  { label: "Tổng Users", value: users.length },
  { label: "Doanh thu hôm nay", value: 120000000 },
  { label: "Đơn hàng mới", value: orders.length },
];

// Chart
export const chartData = [
  { name: "T2", sale: 100 },
  { name: "T3", sale: 300 },
  { name: "T4", sale: 250 },
  { name: "T5", sale: 500 },
  { name: "T6", sale: 400 },
  { name: "T7", sale: 520 },
];
