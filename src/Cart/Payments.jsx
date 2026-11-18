export default function Payments() {
  return (
    <>
      <fieldset>
        <legend>Payment Method</legend>

        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="credit"
            defaultChecked
            required
          />
          Credit Card
        </label>

        <label>
          <input type="radio" name="paymentMethod" value="paypal" />
          PayPal
        </label>
      </fieldset>

      <h3>Payment Information</h3>

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
          defaultValue="4242424242424242"
          maxLength="19"
          required
        />
      </label>

      <div className="card-row">
        <label>
          Expiration Date
          <input
            type="text"
            name="expirationDate"
            defaultValue="12/30"
            maxLength="5"
            required
          />
        </label>

        <label>
          CVV
          <input
            type="password"
            name="cvv"
            defaultValue="123"
            maxLength="4"
            required
          />
        </label>
      </div>

      <p className="demo-notice">
        Demo checkout only. No payment information is stored.
      </p>
    </>
  );
}
