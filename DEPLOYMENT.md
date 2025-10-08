# 🚀 VPS Deployment Guide

## 📋 **Repository Information**
- **GitHub Repository**: https://github.com/bracketcoder/multi-app-portal
- **Project Type**: Multi-App Unified Portal (3 Vite React Apps)
- **Main Server**: Node.js Express unified server

## 🔧 **Prerequisites**

### Server Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Debian 10+
- **RAM**: Minimum 2GB, Recommended 4GB+
- **Storage**: Minimum 10GB, Recommended 20GB+
- **Node.js**: v16 or higher
- **PM2**: Process Manager for Node.js

### Required Software
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git (if not installed)
sudo apt install git -y

# Install Nginx (optional but recommended)
sudo apt install nginx -y
```

## 🚀 **Deployment Steps**

### 1. Clone the Repository
```bash
# Navigate to your web directory
cd /var/www/

# Clone the repository
git clone https://github.com/bracketcoder/multi-app-portal.git

# Navigate to project directory
cd multi-app-portal
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install dependencies for each app
cd app-1 && npm install
cd ../app-2 && npm install
cd ../app-3 && npm install
cd ..
```

### 3. Build Applications
```bash
# Build all apps for production
npm run build

# Alternatively, build individually:
# cd app-1 && npm run build
# cd ../app-2 && npm run build
# cd ../app-3 && npm run build
```

### 4. Configure Environment (Optional)
Create a `.env` file for production settings:
```bash
# Create environment file
nano .env
```

```env
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
```

### 5. Start with PM2
```bash
# Start the application with PM2
pm2 start unified-server.js --name "multi-app-portal"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions shown (usually copy and paste a command)
```

### 6. Configure Firewall
```bash
# Allow port 3000 (if using directly)
sudo ufw allow 3000

# Or allow Nginx ports (if using reverse proxy)
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 🌐 **Nginx Reverse Proxy (Recommended)**

### Install Nginx
```bash
sudo apt install nginx -y
```

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/multi-app-portal
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS (optional)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/javascript;
}
```

### Enable the Site
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/multi-app-portal /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## 🔒 **SSL Certificate (Optional but Recommended)**

### Using Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 📊 **Monitoring & Management**

### PM2 Commands
```bash
# Check application status
pm2 status

# View logs
pm2 logs multi-app-portal

# Restart application
pm2 restart multi-app-portal

# Stop application
pm2 stop multi-app-portal

# Monitor in real-time
pm2 monit
```

### Health Check
The application includes a health check endpoint:
- **URL**: `http://your-domain.com/health`
- **Response**: JSON with server and app status

## 🔄 **Updating the Application**

### Pull Updates
```bash
# Navigate to project directory
cd /var/www/multi-app-portal

# Pull latest changes
git pull origin master

# Install new dependencies (if any)
npm install
cd app-1 && npm install
cd ../app-2 && npm install
cd ../app-3 && npm install

# Rebuild applications
npm run build

# Restart with PM2
pm2 restart multi-app-portal
```

### Automated Updates (Optional)
Create an update script:
```bash
nano update.sh
```

```bash
#!/bin/bash
cd /var/www/multi-app-portal
git pull origin master
npm install
cd app-1 && npm install
cd ../app-2 && npm install
cd ../app-3 && npm install
npm run build
pm2 restart multi-app-portal
echo "✅ Application updated successfully!"
```

Make it executable:
```bash
chmod +x update.sh
```

## 🐛 **Troubleshooting**

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port 3000
   sudo lsof -i :3000

   # Kill the process
   sudo kill -9 <PID>
   ```

2. **Permission Issues**
   ```bash
   # Fix ownership
   sudo chown -R $USER:$USER /var/www/multi-app-portal

   # Fix permissions
   chmod -R 755 /var/www/multi-app-portal
   ```

3. **Nginx Issues**
   ```bash
   # Check Nginx status
   sudo systemctl status nginx

   # Check Nginx error logs
   sudo tail -f /var/log/nginx/error.log

   # Restart Nginx
   sudo systemctl restart nginx
   ```

4. **PM2 Issues**
   ```bash
   # Check PM2 logs
   pm2 logs

   # Flush PM2 logs
   pm2 flush

   # Delete and recreate PM2 process
   pm2 delete multi-app-portal
   pm2 start unified-server.js --name "multi-app-portal"
   ```

### Performance Optimization

1. **Enable Caching in Nginx**
   ```nginx
   location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

2. **Optimize Node.js Memory**
   ```bash
   # Start with increased memory limit
   pm2 start unified-server.js --name "multi-app-portal" --node-args="--max-old-space-size=2048"
   ```

## 📱 **Accessing Your Applications**

After deployment, your apps will be available at:
- **Main Portal**: `http://your-domain.com/`
- **App 1**: `http://your-domain.com/app-1/`
- **App 2**: `http://your-domain.com/app-2/`
- **App 3**: `http://your-domain.com/app-3/`
- **Health Check**: `http://your-domain.com/health`

## 🎯 **Production Checklist**

- [ ] Server requirements met (RAM, Storage, Node.js version)
- [ ] Dependencies installed for all apps
- [ ] Applications built successfully
- [ ] PM2 configured and running
- [ ] Firewall configured
- [ ] Nginx reverse proxy setup (optional but recommended)
- [ ] SSL certificate installed (optional but recommended)
- [ ] Domain DNS configured
- [ ] Monitoring and logging setup
- [ ] Backup strategy implemented
- [ ] Update process tested

## 🆘 **Support**

If you encounter any issues:
1. Check the logs: `pm2 logs multi-app-portal`
2. Verify the health endpoint: `http://your-domain.com/health`
3. Review this troubleshooting section
4. Check the GitHub repository for updates

---

**🎉 Your Multi-App Portal is now ready for production!**