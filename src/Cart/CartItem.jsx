import CartItemQuantity from "./CartItemQuantity";

export default function CartItem({ item, removeFromCart, addToCart }) {
  return (
    <li className="cart-item">
      <div>
        <img src={item.image} alt={item.name} width={40} />
        {item.name}
      </div>
      <CartItemQuantity
        item={item}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
      />
    </li>
  );
}
