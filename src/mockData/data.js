export const products = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Sản phẩm cao cấp ${i + 1}`,
  categoryId: (i % 3) + 1,
  price: Math.floor(Math.random() * 1000000 + 100000).toString(),
  image: `https://picsum.photos/300/300?random=${i}`,
  rating: Number((Math.random() * 2 + 3).toFixed(1)),
  reviews: Math.floor(Math.random() * 100),
}));

export const product = {
  name: "Tai nghe chống ồn Sony WH-1000XM5",
  price: 8490000,
  originalPrice: 9990000,
  rating: 4.8,
  reviews: 128,
  description:
    "Tai nghe over-ear chống ồn hàng đầu với công nghệ Auto NC Optimizer, thời lượng pin 30 giờ và thiết kế siêu nhẹ mang lại cảm giác thoải mái suốt ngày dài.",
  images: [
    "https://picsum.photos/600/600?random=1",
    "https://picsum.photos/600/600?random=2",
    "https://picsum.photos/600/600?random=3",
    "https://picsum.photos/600/600?random=4",
  ],
};

export const categories = [
  { id: 0, categoryName: 'Tất Cả', },
  { id: 1, categoryName: 'Áo Thun', },
  { id: 2, categoryName: 'Giày', },
  { id: 3, categoryName: 'Quần dài', },
  { id: 4, categoryName: 'Áo hoddie', },
  { id: 5, categoryName: 'Áo Jacket', },
  { id: 6, categoryName: 'Mũ', },
];

export const slider = [
  {
    id: 1,
    img: "./img/slider.png",
    title: "Giảm giá iPhone 17 Pro Max",
    subtitle: "Giảm đến 20% – số lượng có hạn!"
  },
  {
    id: 2,
    img: "./img/slider.png",
    title: "Samsung Galaxy S25 Ultra",
    subtitle: "Công nghệ vượt trội – camera AI siêu nét"
  },
  {
    id: 3,
    img: "./img/slider.png",
    title: "Xiaomi 15 Ultra",
    subtitle: "Pin 2 ngày – sạc 120W – hiệu năng khủng"
  },
];

export const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "1",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: 2,
    name: "User",
    email: "user@gmail.com",
    password: "0",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=5"
  }
];

export const stats = [
  { label: "Tổng Users", value: 1200 },
  { label: "Doanh thu hôm nay", value: "$1,200" },
  { label: "Đơn hàng mới", value: 32 },
];

export const chartData = [
  { name: "T2", sale: 100 },
  { name: "T3", sale: 300 },
  { name: "T4", sale: 250 },
  { name: "T5", sale: 500 },
  { name: "T6", sale: 400 },
  { name: "T7", sale: 520 },
];