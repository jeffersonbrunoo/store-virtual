import React from 'react';
import styles from './AboutPage.module.css';

export default function About() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sobre Nós</h1>
      <p className={styles.paragraph}>
        Nossa loja nasceu da paixão por oferecer produtos de qualidade com um atendimento
        diferenciado. Trabalhamos diariamente para entregar aos nossos clientes uma experiência de compra prática, segura e satisfatória.
      </p>

      <h2 className={styles.subtitle}>Missão</h2>
      <p className={styles.paragraph}>
        Proporcionar aos nossos clientes soluções práticas e inovadoras, com produtos de qualidade e
        um serviço de excelência que valoriza cada interação.
      </p>

      <h2 className={styles.subtitle}>Visão</h2>
      <p className={styles.paragraph}>
        Ser referência no mercado online, reconhecida pela confiança, inovação e compromisso com a
        satisfação dos nossos clientes.
      </p>

      <h2 className={styles.subtitle}>Valores</h2>
      <ul className={styles.list}>
        <li>Compromisso com o cliente</li>
        <li>Ética e transparência</li>
        <li>Inovação constante</li>
        <li>Qualidade em tudo o que fazemos</li>
        <li>Respeito às pessoas e ao meio ambiente</li>
      </ul>
    </div>
  );
}
