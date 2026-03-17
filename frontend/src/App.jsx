import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data); // debug
        setProducts(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Sweetie Bakery Menu</h1>

      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.category}</p>
          <p>${p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
