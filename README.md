# 🌑 CursedBuild

A futuristic dark-themed e-commerce website for Minecraft plugins and modpacks, featuring stunning animations and a vibrant purple-green color scheme.

## ✨ Features

- 🎨 **Dark Futuristic Design** - Purple (#8f00ff) and green (#14f195) color palette
- 🎭 **Advanced Animations** - Framer Motion & GSAP powered interactions
- 🛒 **E-commerce Functionality** - Shopping cart and user authentication
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Lightning Fast** - Built with Vite and React 18
- 🎯 **Dynamic Quote Section** - Random motivational quotes with smooth transitions
- 🔐 **User Authentication** - Login and registration system with local storage
- 🎮 **Particle Background** - Interactive particle effects
- 🔍 **Product Search & Filter** - Real-time search with category filtering

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Animations**: Framer Motion, GSAP
- **Icons**: React Icons
- **State Management**: React Context API
- **Styling**: CSS3 with custom properties

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cursedbuild.git

# Navigate to project directory
cd cursedbuild

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment to Netlify

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/cursedbuild.git
   git push -u origin main
   ```

2. **Connect to Netlify:**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 📁 Project Structure

```
cursedbuild/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── QuoteSection.jsx
│   │   ├── AuthModal.jsx
│   │   ├── CartModal.jsx
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── netlify.toml
├── vite.config.js
└── package.json
```

## 🎨 Color Palette

- **Background**: `#0d0d0f` (Deep Black)
- **Panels**: `#18181c` (Dark Gray)
- **Primary**: `#8f00ff` (Cursed Purple)
- **Accent**: `#14f195` (Neon Green)
- **Text**: `#ffffff` (White)

## 🌟 Key Features

### 🎭 Animations
- Particle background with interactive effects
- 3D card flip animations on product cards
- Smooth scroll animations
- Tab switching with spring physics
- Pulse, bounce, and wiggle effects

### 🛒 E-Commerce
- Product catalog with search and filtering
- Shopping cart with persistent storage
- Add to cart with animated feedback
- Product categories (Plugins, Modpacks)

### 🔐 Authentication
- User registration and login
- Password visibility toggle
- Form validation
- LocalStorage persistence
- Dropdown user menu

### 💬 Dynamic Content
- Random quote rotation (14+ quotes)
- Fixed-height quote container
- Smooth fade transitions
- Motivational and inspiring quotes

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**CursedBuild Team**

---

⚡ Built with passion using React & Vite | 🎨 Designed for impact
