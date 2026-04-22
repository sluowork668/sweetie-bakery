import PropTypes from 'prop-types';
import styles from './ProductFilter.module.css';

function ProductFilter({ categories, selectedCategory, onCategoryChange }) {
  const titleCase = (str) => str.replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className={styles.productFilter}>
      <label htmlFor="categorySelector">Filter by category:</label>
      <select
        id="categorySelector"
        className={styles.select}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter products by category"
      >
        <option value="all">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {titleCase(category)}
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
