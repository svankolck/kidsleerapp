# 🚀 KidsLeerApp Deployment Handleiding

## 📋 Vereisten
- Debian server met OMV (Open Media Vault)
- Docker en Docker Compose geïnstalleerd
- Git geïnstalleerd
- Poort 3001 beschikbaar

## 🔧 Server Setup

### 1. Docker installeren
```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Docker installeren
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose installeren
sudo apt install docker-compose -y

# Gebruiker toevoegen aan docker groep
sudo usermod -aG docker $USER
```

### 2. Project clonen
```bash
# Ga naar gewenste directory
cd /opt

# Clone de repository
git clone https://github.com/svankolck/kidsleerapp.git
cd kidsleerapp

# Maak .env bestand aan
echo "PORT=3001" > .env
echo "REACT_APP_API_URL=http://192.168.178.46:3001" >> .env
```

### 3. App starten
```bash
# Bouw en start de containers
docker-compose up --build -d

# Controleer status
docker-compose ps

# Bekijk logs
docker-compose logs -f
```

## 🌐 Toegang
- **URL**: http://192.168.178.46:3001
- **Development mode**: Hot reload werkt automatisch
- **Code wijzigingen**: Worden direct doorgevoerd

## 📝 Development Workflow

### Code wijzigen
1. Wijzig code lokaal op je development machine
2. Commit en push naar GitHub:
```bash
git add .
git commit -m "Beschrijving van wijzigingen"
git push origin main
```

### Server bijwerken
1. Op de server, pull laatste wijzigingen:
```bash
cd /opt/kidsleerapp
git pull origin main
docker-compose up --build -d
```

### Of gebruik het deployment script
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔍 Troubleshooting

### Poort al in gebruik
```bash
# Controleer welke poorten in gebruik zijn
sudo netstat -tuln | grep LISTEN

# Wijzig poort in docker-compose.yml en .env
```

### Container start niet
```bash
# Bekijk logs
docker-compose logs kidsleerapp

# Herstart container
docker-compose restart kidsleerapp
```

### Hot reload werkt niet
```bash
# Controleer volume mounts
docker-compose exec kidsleerapp ls -la /app

# Herstart met rebuild
docker-compose down
docker-compose up --build -d
```

## 📚 Handige commando's
```bash
# Status bekijken
docker-compose ps

# Logs bekijken
docker-compose logs -f kidsleerapp

# Container stoppen
docker-compose down

# Container herstarten
docker-compose restart kidsleerapp

# Shell in container
docker-compose exec kidsleerapp sh
```
