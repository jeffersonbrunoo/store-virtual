// src/context/CartContext.jsx
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // Estrutura de cada item do carrinho:
  // { product: { ... }, quantity: 2, priceAtPurchase: number }

  // Lê do localStorage para persistir entre recarregamentos (opcional)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Recalcula o total do carrinho quando cartItems muda
  const [total, setTotal] = useState(0);

  // Sempre que cartItems mudar, persiste no localStorage e recalcula total
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));

    const soma = cartItems.reduce((acc, item) => {
      return acc + item.priceAtPurchase * item.quantity;
    }, 0);
    setTotal(soma);
  }, [cartItems]);

  // 1) Adicionar um produto ao carrinho
  function addToCart(product, quantity = 1) {
    setCartItems(prev => {
      // Se o produto já existir, apenas aumenta a quantidade
      const existe = prev.find(item => item.product._id === product._id);

      if (existe) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Insere novo item
        return [
          ...prev,
          {
            product,
            quantity,
            priceAtPurchase: product.price
          }
        ];
      }
    });
  }

  // 2) Remover um item específico do carrinho
  function removeFromCart(productId) {
    setCartItems(prev => prev.filter(item => item.product._id !== productId));
  }

  // 3) Alterar quantidade de um item (por exemplo, no CartPage)
  function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  // 4) Limpar todo o carrinho (por exemplo, após checkout bem-sucedido)
  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
