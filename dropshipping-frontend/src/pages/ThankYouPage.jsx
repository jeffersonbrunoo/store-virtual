// src/pages/ThankYouPage.jsx
import { Link } from 'react-router-dom';
import styles from './ThankYouPage.module.css';

export default function ThankYouPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Obrigado pela sua compra!</h1>
      <p>Seu pedido foi recebido com sucesso. Em breve enviaremos um e-mail de confirmação.</p>
      <Link to="/">
        <button className={styles.button}>Voltar para a Home</button>
      </Link>
    </div>
  );
}
