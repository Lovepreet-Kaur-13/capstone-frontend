export default function CartItem({ item, addToCart, removeFromCart }) {
  return (
    <li>
      <figure>
        <img src={item.image_url} alt={`Image of ${item.title}`} width={100} />
      </figure>
      <section>
        <h2>{item.title}</h2>
        <p>{item.price}</p>
        <p>Quantity: {item.quantity}</p>

        <button onClick={() => removeFromCart(item)}>-</button>
        <button onClick={() => addToCart(item)}>+</button>
      </section>
    </li>
  );
}
