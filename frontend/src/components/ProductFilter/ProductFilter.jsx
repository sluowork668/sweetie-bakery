import PropTypes from 'prop-types';
import './ProductFilter.css';

function ProductFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="product-filter">
      <label htmlFor="category">Filter by category:</label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

ProductFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,

  selectedCategory: PropTypes.string.isRequired,

  onCategoryChange: PropTypes.func.isRequired,
};

export default ProductFilter;
