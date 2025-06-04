// src/pages/ProductPage.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import styles from './ProductPage.module.css'; // IMPORT CSS Module
import { getProductById } from '../services/api.js';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <img
        src={product.imageUrl}
        alt={product.name}
        className={styles.productImage}
      />

      <div className={styles.productDetails}>
        <h2 className={styles.title}>{product.name}</h2>
        <p className={styles.price}>R$ {product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p>
        <button
          className={styles.buttonPrimary}
          onClick={() => addToCart(product)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
