import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext(null);

const API = import.meta.env.VITE_API;

// The backend sends errors as plain text, e.g. res.status(400).send("...")
async function handleError(response, fallback) {
  const text = await response.text();
  throw Error(text || fallback);
}

export function CartProvider({ children }) {
  const { token } = useAuth();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  // Load cart (GET /carts) - the backend finds or creates the user's cart
  const loadCart = async () => {
    if (!token) {
      clearCart();
      return;
    }

    try {
      const response = await fetch(`${API}/carts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) await handleError(response, "Could not load cart");

      const result = await response.json();

      setCart(result);
      setTotal(result.total_cents || 0); // cents
    } catch (e) {
      console.error(e);
      clearCart();
    }
  };

  useEffect(() => {
    loadCart();
  }, [token]);

  // Add product (POST /carts/products)
  const addToCart = async (product) => {
    if (!token) return;

    const response = await fetch(`${API}/carts/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
      }),
    });

    if (!response.ok) await handleError(response, "Could not add product");

    await loadCart();
  };

  // Update quantity (PATCH /carts/products/:productId)
  const updateQuantity = async (productId, quantity) => {
    if (!token || quantity < 1) return;

    const response = await fetch(`${API}/carts/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });

    if (!response.ok) await handleError(response, "Could not update quantity");

    await loadCart();
  };

  // Remove product (DELETE /carts/products/:productId)
  const removeFromCart = async (productId) => {
    if (!token) return;

    const response = await fetch(`${API}/carts/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) await handleError(response, "Could not remove product");

    await loadCart();
  };

  // Complete order (PATCH /carts/complete)
  const completeOrder = async ({ shippingAddress, discountCode } = {}) => {
    if (!token) return;

    const response = await fetch(`${API}/carts/complete`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ shippingAddress, discountCode }),
    });

    if (!response.ok) await handleError(response, "Could not complete order");

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
