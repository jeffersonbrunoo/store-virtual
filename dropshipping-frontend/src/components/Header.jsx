// src/components/Header.jsx
import { ShoppingCart, Home as HomeIcon } from 'lucide-react'; // npm install lucide-react
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import styles from './Header.module.css';
import logoHorizontal from '../utils/logoHorizontal.png'; // Assuming you have an IconLogo component

export default function Header() {
  const { cartItems } = useContext(CartContext);
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/" className={styles.logoLink}>
          <img src={logoHorizontal} alt="Logo" className={styles.logoImage} />
          {/* <h2>Minha Loja</h2> */}
        </Link>
      </div>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
          }
        >
          <HomeIcon size={18} style={{ marginRight: '6px' }} />
          Home
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink
          }
        >
          <ShoppingCart size={18} style={{ marginRight: '6px' }} />
          Carrinho {totalCount > 0 && `(${totalCount})`}
        </NavLink>
      </nav>
    </header>
  );
}
