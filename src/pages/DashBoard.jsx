import ProductList from "../components/ProductList";
import Banner from "../components/banner/Banner";

export default function DashBoard() {
  return (
    <>
      {/* SLIDER */}
      <Banner />
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
