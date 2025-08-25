#!/bin/bash

# KidsLeerApp Server Setup Script voor OMV
# Voer dit uit op je Debian/OMV server

echo "🚀 KidsLeerApp Server Setup voor OMV"
echo "====================================="

# Controleer of we root zijn
if [ "$EUID" -ne 0 ]; then
    echo "❌ Dit script moet als root worden uitgevoerd"
    exit 1
fi

# Update system
echo "📦 System updaten..."
apt update && apt upgrade -y

# Installeer benodigde packages
echo "🔧 Packages installeren..."
apt install -y curl git docker.io docker-compose

# Start en enable Docker service
echo "🐳 Docker service starten..."
systemctl start docker
systemctl enable docker

# Maak directory voor de app
echo "📁 Directory aanmaken..."
mkdir -p /opt/kidsleerapp
cd /opt/kidsleerapp

# Clone repository
echo "📥 Repository clonen..."
git clone https://github.com/svankolck/kidsleerapp.git .

# Maak .env bestand
echo "⚙️ Environment bestand aanmaken..."
cat > .env << EOF
PORT=3001
REACT_APP_API_URL=http://192.168.178.46:3001
EOF

# Maak deployment script uitvoerbaar
chmod +x deploy.sh

# Start de app
echo "🚀 App starten..."
docker-compose up --build -d

# Wacht even
sleep 10

# Controleer status
echo "📊 Status controleren..."
docker-compose ps

echo ""
echo "✅ Setup voltooid!"
echo "🌐 App is beschikbaar op: http://192.168.178.46:3001"
echo ""
echo "📝 Handige commando's:"
echo "  - Status bekijken: docker-compose ps"
echo "  - Logs bekijken: docker-compose logs -f"
echo "  - App stoppen: docker-compose down"
echo "  - App herstarten: docker-compose restart"
echo ""
echo "🔄 Voor updates, gebruik: ./deploy.sh"
echo ""
echo "🔗 Om via Cursor te verbinden:"
echo "  - SSH naar: 192.168.178.46"
echo "  - Directory: /opt/kidsleerapp"
echo "  - Poort: 3001"
