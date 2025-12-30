# Teker - E-commerce Website for Tech Products

Teker is a modern e-commerce platform focused exclusively on selling high-quality tech products, including **consumer electronics**, **computer accessories**, **home audio**, etc. Built with cutting-edge technologies, Teker ensures a smooth, secure, and fast shopping experience for all tech enthusiasts.

Live Demo: [teker.vercel.app](https://teker.vercel.app)

---

## Tech Stack

- **Frontend:**
  - **SvelteKit**: A framework for building fast, modern web apps with Svelte. Provides automatic routing and server-side rendering for optimized performance.
  - **Tailwind CSS**: A utility-first CSS framework for building responsive and customizable UI components.
- **Authentication:**
  - **BetterAuth**: A simple and secure authentication solution that handles user sign-ups, logins, and sessions. It provides an easy-to-implement authentication flow.

- **Backend:**
  - **Neon PostgreSQL**: A cloud-native PostgreSQL database for secure, scalable, and highly available data storage. Handles all data-related operations securely and efficiently.
  - **Node.js**: Used for server-side logic and handling API routes, including interactions with the database and authentication processes.

- **Deployment:**
  - **Vercel**: A platform for frontend frameworks and static sites. Deployed with **Vercel** for fast, reliable hosting with automatic scaling.

---

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tejxsmore/teker.git
   cd teker
   ```

````

2. **Install dependencies:**

   Teker is built with **SvelteKit**, so use `npm` or `yarn` to install the required dependencies:

   ```bash
   npm install
   # OR
   yarn install
   ```

3. **Set up PostgreSQL:**

   * You will need a PostgreSQL database. You can use **Neon PostgreSQL** for cloud-based data storage.
   * Add your database connection string in the `.env` file:

     ```env
     DATABASE_URL=your_neon_postgresql_connection_string
     ```

4. **Set up BetterAuth:**

   * To use BetterAuth, configure the authentication settings by adding your API keys in the `.env` file:

     ```env
     BETTER_AUTH_API_KEY=your_betterauth_api_key
     ```

5. **Run the development server:**

   ```bash
   npm run dev
   ```

   Once the server is running, open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the app in action.

---

## Project Structure

* **`src/`**: Contains the core application code.

  * **`src/routes/`**: Defines the main routes for the app (e.g., homepage, product pages, checkout).
  * **`src/lib/`**: Contains reusable components and utilities.
  * **`src/db/`**: Database interaction logic for PostgreSQL.
  * **`src/routes/auth/`**: Authentication logic using BetterAuth.

---

## Contributing

We welcome contributions! If you'd like to contribute to Teker, please fork the repository and submit a pull request with your changes. Here are a few ways you can help:

* Fixing bugs or implementing new features.
* Improving UI/UX.
* Enhancing documentation or writing tutorials.
* Testing the app and providing feedback.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
````
