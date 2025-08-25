#!/bin/bash

# KidsLeerApp Deployment Script
# Gebruik dit script op je Debian server

echo "🚀 KidsLeerApp Deployment Script"
echo "=================================="

# Controleer of Docker en Docker Compose zijn geïnstalleerd
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is niet geïnstalleerd. Installeer eerst Docker."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is niet geïnstalleerd. Installeer eerst Docker Compose."
    exit 1
fi

# Stop bestaande containers
echo "🛑 Stoppen van bestaande containers..."
docker-compose down

# Pull laatste wijzigingen van GitHub
echo "📥 Ophalen van laatste wijzigingen van GitHub..."
git pull origin main

# Bouw en start de containers
echo "🔨 Bouwen en starten van containers..."
docker-compose up --build -d

# Wacht even en controleer status
sleep 5
echo "📊 Container status:"
docker-compose ps

echo "✅ Deployment voltooid!"
echo "🌐 App is beschikbaar op: http://192.168.178.46:3001"
echo "📝 Logs bekijken: docker-compose logs -f"
