export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <li>
      <figure>
        <img src={item.image_url} alt={item.title} width={65} />
      </figure>

      <section>
        <h3>{item.title}</h3>

        <p>${Number(item.price).toFixed(2)}</p>

        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>

        <p>Quantity: {item.quantity}</p>

        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>

        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </section>
    </li>
  );
}
