# 🚀 KidsLeerApp

Een moderne leerapp voor kinderen op de basisschool, gebouwd met React en TypeScript.

## 🌟 Features

- **Interactieve leeromgeving** voor rekenen, spelling en tafels
- **Persoonlijke avatars** voor Saar en Joep
- **Dynamische leeftijdsberekening** op basis van geboortedata
- **Responsive design** dat werkt op alle apparaten
- **Hot reload** tijdens development

## 🏗️ Technische Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI)
- **Styling**: Emotion (styled-components)
- **Containerization**: Docker + Docker Compose
- **Development**: Hot reload met volume mounts

## 🚀 Quick Start

### Op je OMV server:

```bash
# 1. Clone de repository
git clone https://github.com/svankolck/kidsleerapp.git
cd kidsleerapp

# 2. Start de app
sudo ./server-setup.sh

# 3. Open in browser
# http://192.168.178.46:3001
```

### Snelle start (als Docker al draait):

```bash
sudo ./quick-start.sh
```

## 🔧 Development

### Lokaal ontwikkelen:
1. Clone de repository
2. `npm install`
3. `npm start`

### Remote development (aanbevolen):
1. SSH naar je OMV server
2. Werk direct in `/opt/kidsleerapp`
3. Hot reload werkt automatisch

## 📁 Project Structuur

```
src/
├── components/          # Herbruikbare componenten
├── screens/            # App schermen
├── assets/             # Afbeeldingen en geluiden
└── types/              # TypeScript type definities

Docker bestanden:
├── Dockerfile          # Container configuratie
├── docker-compose.yml  # Orchestratie
└── .dockerignore       # Exclude bestanden

Scripts:
├── server-setup.sh     # Volledige server setup
├── quick-start.sh      # Snelle start
└── deploy.sh           # Deployment script
```

## 🌐 Deployment

De app is geconfigureerd om te draaien op:
- **Server**: OMV (Open Media Vault)
- **IP**: 192.168.178.46
- **Poort**: 3001
- **URL**: http://192.168.178.46:3001

## 📚 Documentatie

- [DEPLOYMENT.md](DEPLOYMENT.md) - Volledige deployment handleiding
- [REMOTE-DEVELOPMENT.md](REMOTE-DEVELOPMENT.md) - Remote development setup

## 🔄 Updates

```bash
# Op de server
cd /opt/kidsleerapp
git pull origin main
sudo ./deploy.sh
```

## 🤝 Bijdragen

1. Fork de repository
2. Maak een feature branch
3. Commit je wijzigingen
4. Push naar de branch
5. Open een Pull Request

## 📄 Licentie

Dit project is privé en bedoeld voor persoonlijk gebruik.

---

**Gemaakt met ❤️ voor Saar en Joep**
