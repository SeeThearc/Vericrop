import { FilterProducts } from "../_components/filter-products";
import { FeaturedProducts } from "../_components/featured-products";

const ProductSearchPage = () => {
  return (
    <div className="flex space-x-6">
      <FilterProducts />
      <div className="flex-1">
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default ProductSearchPage;
