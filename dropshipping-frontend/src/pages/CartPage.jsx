// src/pages/CartPage.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import styles from './CartPage.module.css'; // IMPORT CSS Module

export default function CartPage() {
  const {
    cartItems,
    total,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Seu Carrinho</h1>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div className={styles.cartItem} key={item.product._id}>
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className={styles.cartItemImage}
                />

                <div className={styles.cartItemDetails}>
                  <h3 className={styles.itemTitle}>{item.product.name}</h3>
                  <p className={styles.itemPrice}>
                    R$ {item.priceAtPurchase.toFixed(2)}
                  </p>
                </div>

                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  className={styles.itemQuantity}
                  onChange={(e) =>
                    updateQuantity(item.product._id, parseInt(e.target.value))
                  }
                />

                <p className={styles.itemSubtotal}>
                  R$ {(item.priceAtPurchase * item.quantity).toFixed(2)}
                </p>

                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(item.product._id)}
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <span className={styles.totalLabel}>Total: R$ {total.toFixed(2)}</span>
            <button className={styles.clearButton} onClick={clearCart}>
              Limpar Carrinho
            </button>
            <Link to="/checkout">
              <button className={styles.checkoutButton}>Finalizar Compra</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
