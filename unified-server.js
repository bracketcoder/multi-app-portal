const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Apps configuration - all will be served from the same port
const apps = [
  { name: 'app-1', path: './app-1', devPort: 3001 },
  { name: 'app-2', path: './app-2', devPort: 3002 },
  { name: 'app-3', path: './app-3', devPort: 3003 }
];

// Function to check if node_modules exists, install dependencies if needed
function ensureDependencies(appPath) {
  const nodeModulesPath = path.join(appPath, 'node_modules');
  if (!fs.existsSync(nodeModulesPath)) {
    console.log(`Installing dependencies for ${appPath}...`);
    return new Promise((resolve, reject) => {
      const install = spawn('npm', ['install'], { cwd: appPath, stdio: 'inherit' });
      install.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`npm install failed for ${appPath}`));
        }
      });
    });
  }
  return Promise.resolve();
}

// Function to build app if dist doesn't exist
function ensureBuild(appPath) {
  const distPath = path.join(appPath, 'dist');
  if (!fs.existsSync(distPath)) {
    console.log(`Building ${appPath}...`);
    return new Promise((resolve, reject) => {
      const build = spawn('npm', ['run', 'build'], { cwd: appPath, stdio: 'inherit' });
      build.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`npm run build failed for ${appPath}`));
        }
      });
    });
  }
  return Promise.resolve();
}

// Function to start dev server for an app on its own port
function startDevServer(app) {
  return new Promise((resolve, reject) => {
    console.log(`Starting dev server for ${app.name} on port ${app.devPort}...`);

    const devServer = spawn('npm', ['run', 'dev'], {
      cwd: app.path,
      env: { ...process.env, PORT: app.devPort.toString() },
      stdio: 'pipe' // Use pipe instead of inherit to avoid cluttering main output
    });

    // Handle dev server output
    devServer.stdout.on('data', (data) => {
      // Suppress dev server output in main console
    });

    devServer.stderr.on('data', (data) => {
      // Suppress dev server errors in main console
    });

    devServer.on('close', (code) => {
      if (code !== 0) {
        console.error(`Dev server for ${app.name} exited with code ${code}`);
      }
    });

    // Wait a bit for the server to start
    setTimeout(() => {
      resolve({ app, process: devServer });
    }, 3000);
  });
}

// Proxy middleware to forward requests to dev servers
function createProxyMiddleware(targetPort) {
  return (req, res, next) => {
    const targetUrl = `http://localhost:${targetPort}${req.originalUrl}`;

    // Use http proxy to forward the request
    const http = require('http');
    const proxyReq = http.request(targetUrl, {
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.error('Proxy error:', err);
      res.status(502).send('Bad Gateway');
    });

    req.pipe(proxyReq);
  };
}

// Static file serving for built apps
app.use('/app-1', express.static(path.join(__dirname, 'app-1', 'dist')));
app.use('/app-2', express.static(path.join(__dirname, 'app-2', 'dist')));
app.use('/app-3', express.static(path.join(__dirname, 'app-3', 'dist')));

// Serve the main index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Development routes that proxy to Vite dev servers
// These will only work when dev servers are running
app.use('/app-1/', createProxyMiddleware(3001));
app.use('/app-2/', createProxyMiddleware(3002));
app.use('/app-3/', createProxyMiddleware(3003));

// Fallback routes for serving built apps if dev servers aren't running
app.get('/app-1', (req, res) => {
  const indexPath = path.join(__dirname, 'app-1', 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <html>
        <body>
          <h1>App 1 Not Found</h1>
          <p>The app is not built or the dev server is not running.</p>
          <a href="/">Back to Portal</a>
        </body>
      </html>
    `);
  }
});

app.get('/app-2', (req, res) => {
  const indexPath = path.join(__dirname, 'app-2', 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <html>
        <body>
          <h1>App 2 Not Found</h1>
          <p>The app is not built or the dev server is not running.</p>
          <a href="/">Back to Portal</a>
        </body>
      </html>
    `);
  }
});

app.get('/app-3', (req, res) => {
  const indexPath = path.join(__dirname, 'app-3', 'dist', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send(`
      <html>
        <body>
          <h1>App 3 Not Found</h1>
          <p>The app is not built or the dev server is not running.</p>
          <a href="/">Back to Portal</a>
        </body>
      </html>
    `);
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    apps: apps.map(app => ({
      name: app.name,
      devPort: app.devPort,
      url: `http://localhost:${PORT}/${app.name}`
    }))
  });
});

// Main setup function
async function setupUnifiedServer() {
  try {
    console.log('🚀 Setting up unified server...');

    // Ensure dependencies for all apps
    for (const app of apps) {
      await ensureDependencies(app.path);
    }

    // Build all apps for production serving
    console.log('📦 Building all apps...');
    for (const app of apps) {
      await ensureBuild(app.path);
    }

    // Start dev servers in development mode (optional - comment out for production only)
    console.log('🔧 Starting development servers...');
    const servers = [];
    for (const app of apps) {
      const server = await startDevServer(app);
      servers.push(server);
    }

    // Start the unified server
    app.listen(PORT, () => {
      console.log('\n✅ Unified server is running!');
      console.log(`🌐 Main Portal: http://localhost:${PORT}`);
      console.log('\n📱 Available Apps:');
      console.log(`- Portal: http://localhost:${PORT}/`);
      console.log(`- App 1: http://localhost:${PORT}/app-1`);
      console.log(`- App 2: http://localhost:${PORT}/app-2`);
      console.log(`- App 3: http://localhost:${PORT}/app-3`);
      console.log(`\n🔍 Health Check: http://localhost:${PORT}/health`);
      console.log('\nPress Ctrl+C to stop all servers');

      // Open the browser automatically (optional)
      const open = process.platform === 'darwin' ? 'open' :
                   process.platform === 'win32' ? 'start' : 'xdg-open';
      spawn(open, [`http://localhost:${PORT}`]);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down all servers...');
      servers.forEach(({ process }) => {
        process.kill();
      });
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Error setting up unified server:', error);
    process.exit(1);
  }
}

// Start the unified server
setupUnifiedServer();