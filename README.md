# TEKER - Tech Marketplace and Comparison website
==========================

A modern Next.js ecommerce platform specializing in technology products, featuring secure authentication with Clerk and scalable data management using Neon PostgreSQL.

## Overview
--------

TechHub is an ecommerce solution specifically designed for tech enthusiasts, offering a curated selection of premium technology products including smartphones, laptops, gaming peripherals, smart devices, and professional equipment. Built with scalability and performance in mind, the platform leverages Next.js for optimal user experience, Clerk for robust authentication, and Neon's serverless PostgreSQL for reliable data persistence.

## Features
------------

### Core Functionality

✓ Product catalog with detailed specifications
✓ Secure user authentication and profiles
✓ Shopping cart with persistent sessions
✓ Order management system
✓ Real-time inventory tracking
✓ Payment processing integration

### Technical Stack

* Frontend: Next.js 14+
* Authentication: Clerk
* Database: Neon PostgreSQL
* ORM: Drizzle
* Styling: Tailwind CSS

## Prerequisites
---------------

Before setting up the project, ensure you have:

1. Node.js 18.x or higher
2. npm or yarn package manager
3. Git version control
4. Clerk account for authentication
5. Neon PostgreSQL database

## Getting Started
-----------------

### Clone Repository

```bash
git clone https://github.com/yourusername/techhub-ecommerce.git
cd techhub-ecommerce
```

### Environment Configuration

Create a `.env` file in the project root with your credentials:

```plaintext
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Neon Database
DATABASE_URL=postgresql://user:password@host:port/database?sslmode=require

# Additional Configurations
NEXT_PUBLIC_BASE_URL=http://localhost:3000
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Install Dependencies

```bash
npm install
# or
yarn install
```

### Initialize Database

```bash
# Generate migrations
npx drizzle-kit generate:pg

# Apply migrations
npx drizzle-kit push:pg
```

### Start Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

## Project Structure
-------------------

```plaintext
├── app/
│   ├── pages/
│   │   ├── product/
│   │   └── cart/
│   ├── components/
│   │   ├── ProductCard/
│   │   └── CartItem/
│   └── lib/
│       ├── db/
│       └── utils/
├── public/
├── src/
│   ├── assets/
│   └── styles/
└── prisma/
```

## Contributing
------------

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Submit a pull request

Please include tests for any new functionality and maintain consistent coding style.

## License
-------

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

[Full MIT license terms]

## Acknowledgments
---------------

Special thanks to:

* [Neon](https://neon.tech/) for providing the serverless PostgreSQL database
* [Clerk](https://clerk.dev/) for the authentication solution
* [Next.js](https://nextjs.org/) for the React framework

## Roadmap
---------

🎯 Short-term Goals:
- Add support for multiple payment gateways
- Implement product reviews system
- Enhance search functionality with Elasticsearch

🏃 Long-term Goals:
- Add admin panel for inventory management
- Implement recommendation engine
- Develop mobile application