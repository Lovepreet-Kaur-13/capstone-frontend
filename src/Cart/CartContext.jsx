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

  /** Loads the user's cart. The backend finds or creates it. */
  const loadCart = async () => {
    if (!token) return clearCart();

    const response = await fetch(API + "/carts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw Error(await response.text());
    const result = await response.json();
    setCart(result);
    setTotal(result.total_cents || 0); // cents
  };

  useEffect(() => {
    loadCart().catch((error) => {
      console.log(error);
      clearCart();
    });
  }, [token]);

  /** Adds a product to the cart. */
  const addToCart = async (product) => {
    const response = await fetch(API + "/carts/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product.id }),
    });
    if (!response.ok) throw Error(await response.text());
    await loadCart();
  };

  /** Changes how many of a product are in the cart. */
  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    const response = await fetch(API + "/carts/products/" + productId, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw Error(await response.text());
    await loadCart();
  };

  /** Removes a product from the cart. */
  const removeFromCart = async (productId) => {
    const response = await fetch(API + "/carts/products/" + productId, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw Error(await response.text());
    await loadCart();
  };

  /** Turns the cart into an order. */
  const completeOrder = async ({ shippingAddress, discountCode } = {}) => {
    const response = await fetch(API + "/carts/complete", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shippingAddress, discountCode }),
    });
    if (!response.ok) throw Error(await response.text());
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
  if (!context) throw Error("useCart must be used within a CartProvider");
  return context;
}
