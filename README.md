# 🛒 Teker

**Teker** is a modern, full-stack e-commerce application for tech products, built with [Astro](https://astro.build/) and [React](https://react.dev/), powered by [Supabase](https://supabase.com/) for backend/database, [Hygraph](https://hygraph.com/) for content management, and styled with [Tailwind CSS](https://tailwindcss.com/).

🔗 **Live Demo:** [https://teker.vercel.app](https://teker.vercel.app)

## 🚀 Features

- **Browse & Search** a wide range of tech products:
  - Electronics: Smartphones, Laptops, Tablets, Headphones, Cameras, etc.
  - Computer Accessories
  - Car Tech
  - Home Gadgets
- **Product Details** with images, specifications, and reviews
- **Cart & Checkout** functionality (demo only)
- **User Authentication** (via Supabase Auth)
- **Admin Dashboard** for managing products and categories (via Hygraph CMS)
- **Responsive Design** for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend:** Astro + React
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase (Postgres)
- **CMS:** Hygraph
- **Hosting:** Vercel

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/teker.git
cd teker
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
HYGRAPH_ENDPOINT=your-hygraph-endpoint
HYGRAPH_TOKEN=your-hygraph-access-token
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Visit [http://localhost:4321](http://localhost:4321) to view the app.

## ⚙️ Project Structure

```plaintext
/
├── public/                # Static assets
├── src/
│   ├── components/        # React & Astro components
│   ├── pages/             # Astro pages (routes)
│   ├── layouts/           # Layout components
│   ├── lib/               # Supabase/Hygraph utilities
│   └── styles/            # Tailwind CSS config
├── astro.config.mjs       # Astro configuration
├── tailwind.config.js     # Tailwind configuration
├── package.json
└── README.md
```

## 📝 Customization

- **Product Data:** Managed in Supabase (inventory, pricing, etc.)
- **Content (Descriptions, Images, Categories):** Managed in Hygraph CMS
- **Styling:** Customize Tailwind or add custom CSS as needed

## 🧑‍💻 Contributing

Pull requests and issues are welcome!  
Please open an issue to propose significant changes before submitting a PR.

## 📄 License

[MIT License](LICENSE)

## 🙏 Acknowledgments

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/)
- [Hygraph](https://hygraph.com/)
- [Tailwind CSS](https://tailwindcss.com/)

> _Built with ❤️ by [Your Name](https://github.com/your-username)_
```

Let me know if you'd like this exported to a downloadable `.md` file or want badges, screenshots, or deployment notes included.