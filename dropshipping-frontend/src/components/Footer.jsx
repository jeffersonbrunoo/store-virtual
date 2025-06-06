// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // IMPORT CSS Module
import IconLogo from '../utils/iconLogo.png'; // Assuming you have an IconLogo component

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <img src={IconLogo} alt="Logo" className={styles.footerLogo} />
          {/* <h5>© 2025 Minha Loja</h5> */}
        </div>

        <div className={styles.footerLinks}>
          <Link to="/privacy" className={styles.footerLink}>
            Política de Privacidade
          </Link>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Instagram
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
          >
            Facebook
          </a>
          <Link to="/about" className={styles.footerLink}>
            Sobre nós
          </Link>
          <Link to="/contact" className={styles.footerLink}>
            Fale Conosco
          </Link>
        </div>
      </div>
    </footer>
  );
}
