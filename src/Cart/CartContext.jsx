import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext(null);

const API = import.meta.env.VITE_API;

export function CartProvider({ children }) {
  const { token } = useAuth();

  // Store the current user's cart.
  const [cart, setCart] = useState(null);

  // Store the cart total in cents.
  const [total, setTotal] = useState(0);

  // Clear cart state when user logs out.
  const clearCart = () => {
    setCart(null);
    setTotal(0);
  };

  /* Load the user's active cart. */
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

    const cartData = await response.json();

    if (!response.ok) throw Error(cartData.message || "Failed to load cart");

    setCart(cartData);
    setTotal(cartData.total_cents || 0);
  };

  // Load cart whenever the authentication token changes.
  useEffect(() => {
    loadCart().catch((error) => {
      console.error(error);
      clearCart();
    });
  }, [token]);

  /* Add a product to the cart. */
  const addToCart = async (product) => {
    if (!cart) return;

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

    if (!response.ok) {
      throw Error(await response.text());
    }

    await loadCart();
  };

  /* Update a product quantity in the cart. */
  const updateQuantity = async (productId, quantity) => {
    if (!cart || quantity < 1) return;

    const response = await fetch(
      `${API}/carts/${cart.id}/products/${productId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
        }),
      },
    );

    if (!response.ok) {
      throw Error(await response.text());
    }

    await loadCart();
  };

  /* Remove a product from the cart. */
  const removeFromCart = async (productId) => {
    if (!cart) return;

    const response = await fetch(
      `${API}/carts/${cart.id}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw Error(await response.text());
    }

    await loadCart();
  };

  /* Complete the current order. */
  const completeOrder = async () => {
    const response = await fetch(`${API}/carts/complete`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw Error(await response.text());
    }

    await loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
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
  // Access cart context values.
  const context = useContext(CartContext);

  // Ensure hook is used inside CartProvider.
  if (!context) {
    throw Error("useCart must be used within a CartProvider");
  }

  return context;
}
