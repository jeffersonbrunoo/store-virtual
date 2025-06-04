// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // IMPORT CSS Module

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>© 2025 Minha Loja</span>

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
        </div>
      </div>
    </footer>
  );
}
