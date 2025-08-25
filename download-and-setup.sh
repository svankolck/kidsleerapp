#!/bin/bash

# KidsLeerApp Download en Setup Script
# Voer dit uit op je OMV server om alle bestanden te downloaden

echo "🚀 KidsLeerApp Download en Setup"
echo "================================="

# Controleer of we root zijn
if [ "$EUID" -ne 0 ]; then
    echo "❌ Dit script moet als root worden uitgevoerd"
    exit 1
fi

# Maak directory voor de app
echo "📁 Directory aanmaken..."
mkdir -p /opt/kidsleerapp
cd /opt/kidsleerapp

# Download alle benodigde bestanden
echo "📥 Bestanden downloaden..."

# Docker bestanden
wget -O Dockerfile "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/Dockerfile"
wget -O docker-compose.yml "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/docker-compose.yml"
wget -O .dockerignore "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/.dockerignore"

# Scripts
wget -O deploy.sh "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/deploy.sh"
wget -O quick-start.sh "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/quick-start.sh"

# Documentatie
wget -O DEPLOYMENT.md "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/DEPLOYMENT.md"
wget -O REMOTE-DEVELOPMENT.md "https://raw.githubusercontent.com/svankolck/kidsleerapp/main/REMOTE-DEVELOPMENT.md"

# Maak scripts uitvoerbaar
chmod +x deploy.sh quick-start.sh

# Maak .env bestand
echo "⚙️ Environment bestand aanmaken..."
cat > .env << EOF
PORT=3001
REACT_APP_API_URL=http://192.168.178.46:3001
EOF

echo "✅ Alle bestanden gedownload!"
echo ""
echo "📝 Volgende stappen:"
echo "1. Clone de volledige repository:"
echo "   git clone https://github.com/svankolck/kidsleerapp.git ."
echo ""
echo "2. Of start de app met bestaande bestanden:"
echo "   ./quick-start.sh"
echo ""
echo "3. Voor volledige setup:"
echo "   ./server-setup.sh"
