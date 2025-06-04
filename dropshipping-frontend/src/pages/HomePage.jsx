// src/pages/HomePage.jsx
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import styles from './HomePage.module.css'; // IMPORT CSS Module
import { getProducts } from '../services/api.js';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
