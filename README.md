# TEKER - Tech Products Ecommerce Website

Welcome to **TEKER**, an ecommerce website dedicated to selling cutting-edge tech products such as smartphones, laptops, headphones, cameras, and more. Built with modern web technologies, TEKER provides a seamless shopping experience for tech enthusiasts.

## Live Demo

Visit the live website: [TEKER](https://teker.vercel.app)

---

## Features

- **Next.js Framework**: Fast and scalable React-based framework for building web applications.
- **Clerk Authentication**: Secure user authentication and management, including social login options.
- **Neon Serverless Postgres Database**: Efficient and scalable database management with serverless architecture.
- **Responsive Design**: Optimized for all devices—desktop, tablet, and mobile.
- **Product Management**: Browse, search, and purchase tech products easily.
- **User Accounts**: Manage personal profiles, view order history, and save favorite items.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Database**: [Neon Serverless Postgres](https://neon.tech/)
- **ORM**: Drizzle ORM for type-safe database operations
- **Hosting**: [Vercel](https://vercel.com/)

---

## Prerequisites

To set up TEKER locally, ensure you have:

1. Node.js (v18 or newer) installed.
2. A Neon account with a configured Postgres database.
3. A Clerk account with an application set up for authentication.

---

## Local Development Setup

Follow these steps to run TEKER locally:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/teker.git
   cd teker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`.
   - Replace placeholders with your Neon database URL and Clerk API keys:
     ```
     DATABASE_URL=YOUR_NEON_DATABASE_URL
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_CLERK_PUBLISHABLE_KEY
     CLERK_SECRET_KEY=YOUR_CLERK_SECRET_KEY
     ```

4. Run database migrations using Drizzle ORM:
   ```
   npx drizzle-kit push:pg
   ```

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000`.

---

## Deployment

TEKER is hosted on Vercel. To deploy your own instance:

1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add your environment variables in Vercel's project settings.

---

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request detailing your changes.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries or support, please reach out at [support@teker.com](mailto:support@teker.com).
```

Citations:
[1] https://app.daily.dev/posts/next-js-authentication-using-clerk-drizzle-orm-and-neon-mapqx7vbq
[2] https://github.com/neondatabase-labs/guide-neon-next-clerk/blob/main/README.md
[3] https://neon.tech/blog/nextjs-authentication-using-clerk-drizzle-orm-and-neon
[4] https://github.com/Marktawa/medusa-neon
[5] https://app.daily.dev/posts/full-stack-development-with-next-js-clerk-and-neon-postgres-quowceyls
[6] https://github.com/evanshortiss/neon-clerk-drizzle-nextjs
[7] https://clerk.com/docs/integrations/databases/neon
[8] https://github.com/Kizmelvin/neon-ecommerce-app
[9] https://www.freecodecamp.org/news/nextjs-clerk-neon-fullstack-development/

---
Answer from Perplexity: pplx.ai/share