export default function Payments() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label className="block">
          Card Type
          <select
            name="cardType"
            defaultValue="visa"
            required
            className="w-full border rounded p-2"
          >
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
            <option value="discover">Discover</option>
          </select>
        </label>

        <label className="block">
          Cardholder Name
          <input
            type="text"
            name="cardholderName"
            defaultValue="Demo User"
            required
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block">
          Card Number
          <input
            type="text"
            name="cardNumber"
            defaultValue="4444-2222-8888-4242"
            maxLength={19}
            required
            className="w-full border rounded p-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          Expiry Date
          <input
            type="text"
            name="expirationDate"
            defaultValue="12/30"
            maxLength={5}
            required
            className="w-full border rounded p-2"
          />
        </label>

        <label className="block">
          CVV
          <input
            type="password"
            name="cvv"
            defaultValue="123"
            maxLength={4}
            required
            className="w-full border rounded p-2"
          />
        </label>
      </div>

      <p className="text-sm text-gray-500">
        Demo checkout only. No payment information is stored.
      </p>
    </div>
  );
}
