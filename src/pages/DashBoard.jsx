import ProductList from "../components/ProductList";
import Slider from "../components/Slider";


export default function DashBoard() {
  return (
    <>
      {/* SLIDER */}
      <Slider />
      {/* PRODUCT SECTIONS */}
      <section className="mx-auto px-4 space-y-12">
        <ProductList titleProducts="Sản Phẩm Nổi Bật" />
        <ProductList titleProducts="Sản Phẩm Hot" />
        <ProductList titleProducts="Sản Phẩm New" />
        <ProductList titleProducts="Tất Cả" />
      </section>

    </>
  );
}
