#!/bin/bash

# KidsLeerApp Quick Start Script
# Voer dit uit op je OMV server om snel te starten

echo "🚀 KidsLeerApp Quick Start"
echo "=========================="

# Controleer of Docker draait
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is niet actief. Start Docker eerst:"
    echo "   sudo systemctl start docker"
    exit 1
fi

# Ga naar app directory
cd /opt/kidsleerapp 2>/dev/null || {
    echo "❌ App directory niet gevonden. Voer eerst server-setup.sh uit."
    exit 1
}

# Start de app
echo "🔨 App starten..."
docker-compose up --build -d

# Wacht even
sleep 5

# Controleer status
echo "📊 Status controleren..."
docker-compose ps

echo ""
echo "✅ App gestart!"
echo "🌐 Beschikbaar op: http://192.168.178.46:3001"
echo ""
echo "📝 Handige commando's:"
echo "  - Logs bekijken: docker-compose logs -f"
echo "  - App stoppen: docker-compose down"
echo "  - App herstarten: docker-compose restart"
