# 🛒 DeckMart

**DeckMart is our Capstone Frontend project.** It's the website where people can browse playing cards, sign up, log in, add cards to a cart, and check out. It gets its data from our DeckMart backend.

- 🖥 **Live website:** [deckmart.netlify.app](https://deckmart.netlify.app/)
- 🌐 **Live backend:** [capstone-backend-api-yzce.onrender.com](https://capstone-backend-api-yzce.onrender.com/)
- 💡 **Backend repo:** [capstone-backend](https://github.com/JDONA21/capstone-backend)

---

## ✅ MVP (Minimum Viable Product)

These are the core features we needed for DeckMart to work:

- [x] Users can **register** and **log in**
- [x] Users can **browse all products** (playing cards)
- [x] Users can **click a product** to see its details
- [x] Users can **add products to a cart** and update the cart
- [x] Users can **check out** and place an order
- [x] Users can **see their account** and **past orders**
- [x] **Admins** (set by email at registration) can **add products** and **manage orders**
- [x] The site is **deployed** and connected to our live backend

![Login](<Screenshot 2026-11-23 113206.png>)
![Register](<Screenshot 2026-11-23 113221.png>)
![Product](<Screenshot 2026-11-23 113118.png>)
![Add Product to Cart](<Screenshot 2026-11-23 131008.png>)
![Checkout](<Screenshot 2026-11-23 130852.png>)
![Account and details](<Screenshot 2026-11-23 113430.png>)
![Admin Add Product](<Screenshot 2026-11-23 113350.png>)
![Admin Order Details](<Screenshot 2026-11-23 113404.png>)

---

## 🛠 Technologies Used

- **React** + **Vite** for building the site
- **React Router** for the different pages
- **React Context** for remembering the logged-in user (`AuthContext`) and the cart (`CartContext`)
- **CSS** for styling
- **Netlify** for deploying the frontend, **Render** for the backend
- **Git, GitHub, VS Code**

---

## 🗂 Project Structure

```
src/
├── api/        # Functions that talk to the backend (products, orders, users)
├── auth/       # Login, register, account page, and AuthContext
├── products/   # Products page, product list, and product details
├── Cart/       # Cart, cart items, checkout, payments, and CartContext
├── orders/     # A user's past orders
├── admin/      # Admin-only pages for products and orders
├── layout/     # Navbar, page layout, and team roster
├── App.jsx     # All the routes (pages)
└── main.jsx    # Starts the app
```

---

## 👥 Team

- **Jesus Cardona Jr** – Admin – [GitHub](https://github.com/JDONA21)
- **LovePreet Khela** – Admin – [GitHub](https://github.com/Lovepreet-Kaur-13)
- **Andy Hernandez** – Admin – [GitHub](https://github.com/FullStackSoftEng101)
- **Ben Elderson** – Admin – [GitHub](https://github.com/BenElderson)

Thanks for checking out DeckMart! ⭐
