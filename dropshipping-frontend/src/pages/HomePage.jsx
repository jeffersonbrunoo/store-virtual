// src/pages/HomePage.jsx
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard.jsx';
import styles from './HomePage.module.css'; // IMPORT CSS Module
import { getProducts } from '../services/api.js';
import mockProduct from '../services/mockProduct.js'; // Import mock data

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const data = await getProducts();
  //     setProducts(data);
  //   }
  //   fetchProducts();
  // }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Produtos</h1>
      <div className={styles.productGrid}>
        {mockProduct.map((product) => (
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
