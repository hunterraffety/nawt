# **Knot Payment Updater** 💳

A **Next.js** and **TypeScript** project that simulates a real-world payment method update interface. This app allows users to select a payment method, update the expiration date, and handle errors seamlessly. Built with **React, TailwindCSS, and Vercel for deployment**, this project follows best practices to showcase clean and efficient UI/UX design.

## **🚀 Features**

- **Select a payment method** from a dynamically loaded list
- **Update the expiration date** with auto-formatting (MM/YY)
- **Simulate API errors** to test failure scenarios
- **Option to update all payment methods** on file
- **Dark-mode friendly UI**, styled to match Knot’s website
- **Fully responsive design**, works on all screen sizes
- **Deployable to Vercel in one click**

---

## **🛠 Tech Stack**

- **Next.js** – React framework for server-side rendering (SSR)
- **TypeScript** – Strongly typed JavaScript
- **TailwindCSS** – Modern styling with utility-first approach
- **Vercel** – Instant and scalable deployments
- **React Hooks** – Efficient state management

---

## **📥 Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/hunterraffety/knot-payment-updater.git
cd knot-payment-updater
```

### **2️⃣ Install Dependencies**

```sh
npm install  # or yarn install
```

### **3️⃣ Run the Development Server**

```sh
npm run dev  # or yarn dev
```

- Open **http://localhost:3000** in your browser.
- The app should be running locally.

---

## **🔗 API Endpoints**

The project includes a mock API to simulate updating payment methods.

### **GET `/api/updatePayment`**

📥 **Fetches available payment methods.**

```json
{
  "success": true,
  "paymentMethods": [
    { "id": "1", "last4": "1234", "type": "Visa", "exp": "12/25" },
    { "id": "2", "last4": "5678", "type": "Amex", "exp": "12/26" }
  ]
}
```

### **POST `/api/updatePayment`**

📤 **Updates a payment method expiration date.**

#### **Request Body:**

```json
{
  "paymentId": "1",
  "newExpiration": "12/30",
  "simulateError": false
}
```

#### **Response:**

- ✅ **Success:**

```json
{
  "success": true,
  "message": "Payment Method Updated Successfully!"
}
```

- ❌ **Failure (Simulated Error):**

```json
{
  "success": false,
  "message": "Internal Server Error! Simulated Failure"
}
```

---

## **🚀 Deploy to Vercel**

### **1️⃣ Install Vercel CLI (If not installed)**

```sh
npm install -g vercel
```

### **2️⃣ Log into Vercel**

```sh
vercel login
```

### **3️⃣ Deploy the App**

```sh
vercel --prod
```

Vercel will provide you with a **live deployment link!** 🎉

---

## **📸 Screenshots**

| Payment Selection                                                                | Error Handling                                                             |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Payment Selection](https://via.placeholder.com/500x300?text=Payment+Selection) | ![Error Handling](https://via.placeholder.com/500x300?text=Error+Handling) |

---

## **👨‍💻 Author & Contact**

- **Hunter Raffety**
- [LinkedIn](https://linkedin.com/in/huntersraffety)
- [GitHub](https://github.com/hunterraffety)

🚀 **Built with TypeScript, Next.js, and a little bit of magic ✨.**
