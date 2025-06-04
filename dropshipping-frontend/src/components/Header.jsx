// src/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import styles from './Header.module.css'; // IMPORT CSS Module

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <h2>Minha Loja</h2>
        </Link>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
          }
        >
          Carrinho {totalCount > 0 && `(${totalCount})`}
        </NavLink>
        
      </nav>
    </header>
  );
}
