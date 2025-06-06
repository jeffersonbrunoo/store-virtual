import React, { useState } from 'react';
import styles from './ContactPage.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Mensagem enviada');
    setFormData({ nome: '', email: '', mensagem: '' }); // limpa os campos
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Entre em Contato</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          E-mail:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Mensagem:
          <textarea
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </label>

        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>
    </div>
  );
}
