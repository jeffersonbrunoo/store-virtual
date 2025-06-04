// src/pages/CheckoutPage.jsx
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import styles from './CheckoutPage.module.css'; // IMPORT CSS Module

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, total, clearCart } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    country: '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validate() {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'E-mail inválido';
    if (!formData.address) newErrors.address = 'Endereço é obrigatório';
    if (!formData.city) newErrors.city = 'Cidade é obrigatória';
    if (!formData.zip) newErrors.zip = 'CEP é obrigatório';
    if (!formData.country) newErrors.country = 'País é obrigatório';
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      // suponha createOrder exista no serviço api.js
      // await createOrder({ customer: formData, items: cartItems, total });
      clearCart();
      navigate('/thank-you');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Endereço</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="city">Cidade</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="zip">CEP</label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleChange}
          />
          {errors.zip && <p style={{ color: 'red' }}>{errors.zip}</p>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="country">País</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Confirmar Pedido
        </button>
      </form>

      <h2>Total: R$ {total.toFixed(2)}</h2>
    </div>
  );
}
