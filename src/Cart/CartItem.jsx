import CartItemQuantity from "./CartItemQuantity";

export default function CartItem({ item, removeFromCart, addToCart }) {
  return (
    <li className="cart-item">
      <div>
        <img src={item.image_url} alt={item.title} width={40} />
        {item.title}
      </div>
      <CartItemQuantity
        item={item}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
      />
    </li>
  );
}
