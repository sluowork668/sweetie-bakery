import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./ProductForm.css";

const emptyForm = {
  _id: "",
  id: "",
  name: "",
  category: "dessert",
  price: "",
  description: "",
  imageUrl: "",
  available: true,
  isSample: false,
};

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        _id: editingProduct._id || "",
        id: editingProduct.id || "",
        name: editingProduct.name || "",
        category: editingProduct.category || "dessert",
        price: editingProduct.price ?? "",
        description: editingProduct.description || "",
        imageUrl: editingProduct.imageUrl || "",
        available: editingProduct.available ?? true,
        isSample: editingProduct.isSample ?? false,
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productToSubmit = {
      ...formData,
      price: Number(formData.price),
      createdAt: editingProduct?.createdAt || new Date(),
    };

    onSubmit(productToSubmit);

    if (!editingProduct) {
      setFormData(emptyForm);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="dessert">dessert</option>
        <option value="pastry">pastry</option>
        <option value="drink">drink</option>
        <option value="savory">savory</option>
        <option value="bread">bread</option>
      </select>

      <input
        type="number"
        step="0.01"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        required
      />

      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={handleChange}
      />

      <label>
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleChange}
        />
        Available
      </label>

      <label>
        <input
          type="checkbox"
          name="isSample"
          checked={formData.isSample}
          onChange={handleChange}
        />
        Is Sample (Synthetic)
      </label>

      <div className="product-form-buttons">
        <button type="submit">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>

        {editingProduct && (
          <button type="button" onClick={onCancel}>
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
    available: PropTypes.bool,
    isSample: PropTypes.bool,
    createdAt: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }),
};

export default ProductForm;
