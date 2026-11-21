export default function Payments() {
  return (
    <>
      <h2>Payment Method</h2>

      <label>
        Card Type
        <select name="cardType" defaultValue="visa" required>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
          <option value="discover">Discover</option>
        </select>
      </label>

      <label>
        Cardholder Name
        <input
          type="text"
          name="cardholderName"
          defaultValue="Demo User"
          required
        />
      </label>

      <label>
        Card Number
        <input
          type="text"
          name="cardNumber"
          defaultValue="4444-2222-8888-4242"
          maxLength={19}
          required
        />
      </label>

      <label>
        Expiration Date
        <input
          type="text"
          name="expirationDate"
          defaultValue="12/30"
          maxLength={5}
          required
        />
      </label>

      <label>
        CVV
        <input
          type="password"
          name="cvv"
          defaultValue="123"
          maxLength={4}
          required
        />
      </label>

      <p>Demo checkout only. No payment information is stored.</p>
    </>
  );
}
