export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <li>
      <figure>
        <img src={item.image_url} alt={item.title} width={65} />
      </figure>

      <div>
        <h3>{item.title}</h3>

        <p>${Number(item.price_cents / 100).toFixed(2)}</p>

        {/* Decrease the quantity by 1 */}
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>

        <p>Quantity: {item.quantity}</p>

        {/* Increase the quantity by 1 */}
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>

        {/* Remove the product from the cart */}
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </li>
  );
}
