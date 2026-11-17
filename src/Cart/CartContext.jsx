import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext();

const API = import.meta.env.VITE_API;

export function CartProvider({ children }) {
  const { token } = useAuth();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Loads the current user's cart from the database
  const loadCart = async () => {
    // If the user is not logged in,
    // clear the cart state and stop
    if (!token) {
      setCart([]);
      setTotal(0);
      return;
    }

    // Request the user's active cart
    const response = await fetch(API + "/orders/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Expected response:
    // { items: [...], total: 123.45 }
    const result = await response.json();

    // Store cart items in state
    setCart(result.items);
    // Store order total in state
    setTotal(result.total);
  };

  // Load the cart when the user logs in,
  // logs out, or when the token changes
  useEffect(() => {
    loadCart();
  }, [token]);

  // Add one quantity of a product to the cart
  const addToCart = async (product) => {
    // Prevent requests from guests
    if (!token) return;

    // Create or update the cart item in the database
    await fetch(API + "/orders/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId: product.id,
      }),
    });

    // Reload cart so React state matches database state
    await loadCart();
  };

  // Remove one quantity of a product from the cart
  const removeFromCart = async (product) => {
    // Prevent requests from guests
    if (!token) return;

    // Decrease quantity in the database
    await fetch(API + `/orders/cart/${product.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Reload cart so React state matches database state
    await loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        // Current cart items
        cart,
        // Current order total
        total,
        // Increase quantity / add item
        addToCart,
        // Decrease quantity / remove item
        removeFromCart,
        // Manually refresh cart
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  // Access the cart context
  const context = useContext(CartContext);

  // Prevent useCart outside CartProvider
  if (!context) {
    throw Error("useCart must be used within a CartProvider");
  }

  return context;
}
/*

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };



  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
*/
