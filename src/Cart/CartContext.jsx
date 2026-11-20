import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext(null);

const API = import.meta.env.VITE_API;

export function CartProvider({ children }) {
  const { token } = useAuth();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  // Load cart
  const loadCart = async () => {
    if (!token) {
      clearCart();
      return;
    }

    const response = await fetch(`${API}/carts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw Error("Could not load cart");

    const result = await response.json();

    setCart(result);
    setTotal(result.total_cents || 0); // cents
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  // Add product
  const addToCart = async (product) => {
    if (!token || !cart?.id) return;

    const response = await fetch(`${API}/carts/${cart.id}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
      }),
    });

    if (!response.ok) throw Error("Could not add product");

    await loadCart();
  };

  // Update quantity
  const updateQuantity = async (productId, quantity) => {
    if (!token || !cart?.id || quantity < 1) return;

    const response = await fetch(
      `${API}/carts/${cart.id}/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }),
      },
    );

    if (!response.ok) throw Error("Could not update quantity");

    await loadCart();
  };

  // Remove product
  const removeFromCart = async (productId) => {
    if (!token || !cart?.id) return;

    const response = await fetch(
      `${API}/carts/${cart.id}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) throw Error("Could not remove product");

    await loadCart();
  };

  // Complete order
  const completeOrder = async () => {
    if (!token) return;

    const response = await fetch(`${API}/orders/cart/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw Error("Could not complete order");

    await loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        loadCart,
        clearCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        completeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw Error("useCart must be used within a CartProvider");
  }

  return context;
}
