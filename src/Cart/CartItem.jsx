export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <li className="flex gap-3 pb-4 border-b">
      <img
        src={item.image_url}
        alt={item.title}
        className="w-20 h-24 object-contain"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-sm">{item.title}</h3>

        <p className="font-bold text-sm mt-1">
          ${(item.price_cents / 100).toFixed(2)}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 rounded bg-gray-400 text-white flex items-center justify-center"
          >
            <i className="fi fi-rr-minus"></i>
          </button>

          <span className="w-6 text-center font-semibold">{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            disabled={item.quantity >= item.stock_quantity}
            className="w-8 h-8 rounded bg-teal-700 text-white flex items-center justify-center"
          >
            <i className="fi fi-rr-plus"></i>
          </button>

          <button
            onClick={() => removeFromCart(item.id)}
            className="w-8 h-8 rounded bg-red-600 text-white flex items-center justify-center"
          >
            <i className="fi fi-rr-trash"></i>
          </button>
        </div>
      </div>
    </li>
  );
}
