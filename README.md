# Multi-App Unified Portal

A unified application server that combines three Vite React applications into a single portal with a navigation interface.

## 🚀 Features

- **Single Server**: All three apps run from one port (3000)
- **Beautiful Navigation Portal**: Modern, responsive UI with card-based navigation
- **Seamless Integration**: Each app maintains its own functionality while being accessible from a central hub
- **Development & Production**: Supports both development hot-reloading and production builds
- **Health Monitoring**: Built-in health check endpoint

## 📱 Available Applications

1. **Quest React App** (`/app-1`) - Interactive Quest-powered application with advanced features
2. **Social Hub** (`/app-2`) - Connect and collaborate with others in this social platform
3. **Data Analytics** (`/app-3`) - Powerful analytics and data visualization platform

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm

### Quick Start

```bash
# Install dependencies
npm install

# Start the unified server
npm start
```

The server will:
1. Install dependencies for all three apps
2. Build production versions of all apps
3. Start development servers for each app
4. Launch the unified portal server

## 🌐 Access Points

Once running, you can access:

- **Main Portal**: http://localhost:3000/
- **App 1**: http://localhost:3000/app-1/
- **App 2**: http://localhost:3000/app-2/
- **App 3**: http://localhost:3000/app-3/
- **Health Check**: http://localhost:3000/health

## 🏗️ Architecture

```
my_app/
├── index.html           # Main navigation portal
├── unified-server.js    # Unified server that serves all apps
├── package.json         # Root package configuration
├── app-1/               # First Vite React app
├── app-2/               # Second Vite React app
├── app-3/               # Third Vite React app
└── start-apps.js        # Legacy multi-port server (npm run legacy)
```

## ⚙️ Configuration

### Vite Configuration
Each app has been configured with:
- **Base Path**: `/app-1/`, `/app-2/`, `/app-3/` respectively
- **Development Ports**: 3001, 3002, 3003 (internal)
- **Build Output**: `dist/` folder in each app directory

### Server Configuration
- **Main Port**: 3000
- **Proxy Routes**: `/app-1/`, `/app-2/`, `/app-3/` proxy to dev servers
- **Static Serving**: Built apps served statically for production

## 📝 Scripts

```bash
npm start       # Start unified server (recommended)
npm run dev     # Same as npm start
npm run legacy  # Run old multi-port version (separate ports)
npm run build   # Build all apps for production
```

## 🎨 Navigation Portal Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Cards**: Hover effects and smooth transitions
- **App Categories**: Visual tags for each app type
- **Loading States**: Professional loading animations
- **Error Handling**: Graceful error pages with navigation back to portal

## 🔧 Development

### Adding a New App

1. Create a new app directory (e.g., `app-4/`)
2. Set up the Vite React app
3. Configure `vite.config.js` with the appropriate base path
4. Add the app configuration to `unified-server.js`
5. Update the main portal `index.html` with a new card

### Customizing the Portal

Edit `index.html` to modify:
- App descriptions and titles
- Styling and colors
- Navigation structure
- App icons and categories

## 🚀 Deployment

For production deployment:

1. Build all apps: `npm run build`
2. The unified server will serve the built versions automatically
3. Deploy the entire `my_app/` directory to your hosting service

## 🐛 Troubleshooting

### Common Issues

- **Port 3000 in use**: Change the PORT variable in `unified-server.js`
- **Build failures**: Check each app's dependencies with `npm install` in their directories
- **Dev server not responding**: Check if individual dev servers are running on their ports

### Health Check

Always check the health endpoint first:
```bash
curl http://localhost:3000/health
```

## 📄 License

ISC