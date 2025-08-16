# LMS Platform - React + Vite

A modern Learning Management System built with React, Vite, and TypeScript.

## ✨ Features

- 🎨 **Dark/Light Mode** - Theme switching with smooth animations
- 🔐 **Authentication** - Complete auth system with Supabase integration
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development
- 🎭 **Beautiful UI** - Glassmorphism effects and smooth animations
- 🧭 **React Router** - Client-side routing
- 📊 **Admin Dashboard** - User management and analytics
- 💳 **Payment Integration** - Stripe and Razorpay support

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Supabase** - Backend services
- **next-themes** - Theme management

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── auth/           # Authentication components
│   ├── landing/        # Landing page sections
│   ├── dashboard/      # Dashboard components
│   ├── admin/          # Admin panel components
│   └── providers/      # Context providers
├── pages/              # Page components
├── lib/                # Utilities and configurations
├── hooks/              # Custom React hooks
└── globals.css         # Global styles
```

## 🎨 UI Features

- **Theme Toggle** - Switch between light and dark modes
- **Glassmorphism** - Modern glass-like UI effects  
- **3D Animations** - Interactive hover and click effects
- **Particle Background** - Animated particle systems
- **Responsive Layout** - Mobile-first design approach

## 🔧 Configuration

Environment variables are configured in `.env`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

## 📦 Deployment

This project is optimized for deployment on:

- **Lovable** - AI-powered development platform
- **Vercel** - Zero-config deployment
- **Netlify** - JAMstack deployment
- **Any static hosting** - Works with any static host

Built with ❤️ for modern web development.