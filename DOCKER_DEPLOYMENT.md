# 🐳 Docker Deployment Guide

## 🚀 **Quick Docker Deployment**

### Using Docker Compose (Recommended)
```bash
# Clone the repository
git clone https://github.com/bracketcoder/multi-app-portal.git
cd multi-app-portal

# Start with Docker Compose
docker-compose up -d

# Check logs
docker-compose logs -f
```

### Using Docker Only
```bash
# Clone the repository
git clone https://github.com/bracketcoder/multi-app-portal.git
cd multi-app-portal

# Build Docker image
docker build -t multi-app-portal .

# Run container
docker run -d -p 3000:3000 --name multi-app-portal multi-app-portal
```

## 📋 **Docker Commands**

### Basic Commands
```bash
# Check running containers
docker ps

# View logs
docker logs multi-app-portal

# Stop container
docker stop multi-app-portal

# Start container
docker start multi-app-portal

# Remove container
docker rm multi-app-portal

# Access container shell
docker exec -it multi-app-portal sh
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# Scale application
docker-compose up -d --scale multi-app-portal=2
```

## 🔧 **Environment Variables**

Create a `.env` file for Docker:
```env
NODE_ENV=production
PORT=3000
```

## 🌐 **Access Points**

After deployment:
- **Main Portal**: http://localhost:3000/
- **App 1**: http://localhost:3000/app-1/
- **App 2**: http://localhost:3000/app-2/
- **App 3**: http://localhost:3000/app-3/
- **Health Check**: http://localhost:3000/health

## 🔄 **Updating**

```bash
# Pull latest changes
git pull origin master

# Rebuild and restart
docker-compose up -d --build
```

## 📊 **Monitoring**

### Health Check
The Docker image includes a built-in health check:
```bash
# Check container health
docker inspect multi-app-portal | grep Health -A 10
```

### Resource Usage
```bash
# View resource usage
docker stats multi-app-portal
```

---

**🐳 Your application is now running in Docker!**