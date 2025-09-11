import { FilterProducts } from "../_components/filter-products";
import { FeaturedProducts } from "../_components/featured-products";

const ProductSearchPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter Sidebar - Hidden on mobile, shown on larger screens */}
      <div className="lg:w-80 flex-shrink-0">
        <FilterProducts />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default ProductSearchPage;
