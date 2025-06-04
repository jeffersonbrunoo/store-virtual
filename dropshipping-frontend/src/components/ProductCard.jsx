// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css'; // IMPORT CSS Module

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
      </Link>

      <div className={styles.productContent}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>

        <div className={styles.productActions}>
          <Link to={`/product/${product._id}`}>
            <button className={styles.buttonPrimary}>Ver Detalhes</button>
          </Link>
          <button
            className={styles.buttonPrimary}
            onClick={() => onAddToCart(product)}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
