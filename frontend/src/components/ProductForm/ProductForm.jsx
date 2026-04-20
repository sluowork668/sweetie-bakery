import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductForm.module.css';

const emptyForm = {
  _id: '',
  id: '',
  name: '',
  category: 'dessert',
  price: '',
  description: '',
  imageUrl: '',
  inStock: true,
  ingredients: '',
  allergens: '',
  calories: '',
  flavorProfile: '',
};

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        _id: editingProduct._id || '',
        id: editingProduct.id || '',
        name: editingProduct.name || '',
        category: editingProduct.category || 'dessert',
        price: editingProduct.price ?? '',
        description: editingProduct.description || '',
        imageUrl: editingProduct.imageUrl || '',
        // FIX: Checks for new 'inStock' field, falls back to legacy 'available' field, defaults to true
        inStock:
          editingProduct.inStock !== undefined
            ? editingProduct.inStock
            : editingProduct.available !== undefined
              ? editingProduct.available
              : true,
        ingredients: editingProduct.ingredients || '',
        allergens: editingProduct.allergens || '',
        calories: editingProduct.calories ?? '',
        flavorProfile: editingProduct.flavorProfile || '',
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // NEW: Handles file upload from device and converts to Base64 String
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Sets the image URL text box to the new Base64 string
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file); // Converts image to string
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productToSubmit = {
      ...formData,
      price: Number(formData.price),
      calories: Number(formData.calories) || 0,
      createdAt: editingProduct?.createdAt || new Date(),
    };

    onSubmit(productToSubmit);

    if (!editingProduct) {
      setFormData(emptyForm);
    }
  };

  return (
    <form
      className={styles.productForm}
      onSubmit={handleSubmit}
      aria-label={editingProduct ? 'Edit Product Form' : 'Add Product Form'}
    >
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>

      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
        className={styles.input}
        aria-label="Product name"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className={styles.input}
        aria-label="Category"
      >
        <option value="dessert">Dessert</option>
        <option value="pastry">Pastry</option>
        <option value="drink">Drink</option>
        <option value="savory">Savory</option>
        <option value="bread">Bread</option>
      </select>

      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
        className={styles.input}
        aria-label="Price"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        required
        className={styles.textarea}
        aria-label="Description"
      />

      {/* NEW: Device File Upload Section */}
      <div className={styles.gridRow} style={{ alignItems: 'center' }}>
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL or Upload File ->"
          value={formData.imageUrl}
          onChange={handleChange}
          className={styles.input}
          aria-label="Image URL"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ width: '100%', fontSize: '0.9rem' }}
          aria-label="Upload image from device"
        />
      </div>

      <div className={styles.gridRow}>
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          className={styles.input}
          aria-label="Ingredients"
        />
        <input
          type="text"
          name="allergens"
          placeholder="Allergens"
          value={formData.allergens}
          onChange={handleChange}
          className={styles.input}
          aria-label="Allergens"
        />
      </div>

      <div className={styles.gridRow}>
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          value={formData.calories}
          onChange={handleChange}
          className={styles.input}
          aria-label="Calories"
        />
        <input
          type="text"
          name="flavorProfile"
          placeholder="Flavor Profile"
          value={formData.flavorProfile}
          onChange={handleChange}
          className={styles.input}
          aria-label="Flavor Profile"
        />
      </div>

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
          aria-label="In Stock Status"
        />
        In Stock
      </label>

      <div className={styles.productFormButtons}>
        <button tabIndex="0" type="submit" className={styles.submitButton}>
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>

        {editingProduct && (
          <button
            tabIndex="0"
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

ProductForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  editingProduct: PropTypes.shape({
    _id: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    inStock: PropTypes.bool,
    available: PropTypes.bool, // Added to proptypes to prevent warnings on legacy data
    ingredients: PropTypes.string,
    allergens: PropTypes.string,
    calories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flavorProfile: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }),
};

export default ProductForm;
