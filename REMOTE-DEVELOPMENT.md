# 🔗 Remote Development Setup voor OMV Server

## 🎯 Doel
Je KidsLeerApp draait volledig op je OMV Linux server in containers, terwijl je lokaal in Cursor kunt ontwikkelen.

## 🚀 Stap 1: Server Setup (éénmalig)

### Op je OMV server uitvoeren:
```bash
# 1. Download het setup script
wget https://raw.githubusercontent.com/svankolck/kidsleerapp/main/server-setup.sh

# 2. Maak het uitvoerbaar
chmod +x server-setup.sh

# 3. Voer het uit als root
sudo ./server-setup.sh
```

Dit script:
- Installeert Docker en Docker Compose
- Clone de GitHub repository
- Start de app op poort 3001
- Configureert volume mounts voor hot reload

## 🔧 Stap 2: Cursor Remote Development

### Optie A: SSH Remote Development
1. **Open Cursor**
2. **File → Open Folder**
3. **Klik op "Connect to SSH Host"**
4. **Voer in:**
   - Host: `192.168.178.46`
   - Username: `root` (of je OMV gebruiker)
   - Directory: `/opt/kidsleerapp`

### Optie B: Local Development + Auto-sync
1. **Clone de repo lokaal:**
   ```bash
   git clone https://github.com/svankolck/kidsleerapp.git
   cd kidsleerapp
   ```

2. **Werk lokaal in Cursor**
3. **Push wijzigingen naar GitHub:**
   ```bash
   git add .
   git commit -m "Beschrijving"
   git push origin main
   ```

4. **Op server bijwerken:**
   ```bash
   cd /opt/kidsleerapp
   ./deploy.sh
   ```

## 🌐 Toegang tot de App
- **URL**: http://192.168.178.46:3001
- **Hot reload**: Werkt automatisch
- **Code wijzigingen**: Worden direct doorgevoerd

## 📝 Development Workflow

### Dagelijks gebruik:
1. **Open Cursor** en werk aan je code
2. **Test lokaal** (optioneel)
3. **Commit en push** naar GitHub
4. **Op server:** `./deploy.sh` of handmatig pull

### Snelle wijzigingen (als je SSH gebruikt):
1. **Werk direct op de server** via Cursor SSH
2. **Hot reload werkt automatisch**
3. **Geen push/pull nodig**

## 🔍 Troubleshooting

### App start niet op server:
```bash
# Controleer status
docker-compose ps

# Bekijk logs
docker-compose logs -f kidsleerapp

# Herstart
docker-compose restart kidsleerapp
```

### Hot reload werkt niet:
```bash
# Controleer volume mounts
docker-compose exec kidsleerapp ls -la /app

# Herstart met rebuild
docker-compose down
docker-compose up --build -d
```

### Poort 3001 is bezet:
```bash
# Controleer welke poorten in gebruik zijn
sudo netstat -tuln | grep LISTEN

# Wijzig poort in docker-compose.yml en .env
```

## 📚 Handige Commando's

### Op de server:
```bash
# Status bekijken
docker-compose ps

# Logs bekijken
docker-compose logs -f kidsleerapp

# App stoppen
docker-compose down

# App herstarten
docker-compose restart kidsleerapp

# Shell in container
docker-compose exec kidsleerapp sh
```

### Lokaal (als je Git gebruikt):
```bash
# Wijzigingen bekijken
git status

# Wijzigingen toevoegen
git add .

# Commit maken
git commit -m "Beschrijving van wijzigingen"

# Push naar GitHub
git push origin main
```

## 🎉 Voordelen van deze setup:
- ✅ App draait altijd op de server
- ✅ Hot reload werkt automatisch
- ✅ Geen lokale Node.js installatie nodig
- ✅ Eenvoudig te delen met anderen
- ✅ Backup en monitoring via OMV
- ✅ Schaalbaar en professioneel

## 🔄 Updates en onderhoud:
- **Automatisch:** Via `./deploy.sh` script
- **Handmatig:** `git pull && docker-compose up --build -d`
- **Monitoring:** Via OMV dashboard
- **Backup:** Via OMV backup functies
