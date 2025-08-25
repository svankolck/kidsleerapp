FROM node:18-alpine

WORKDIR /app

# Kopieer package bestanden
COPY package*.json ./

# Installeer dependencies
RUN npm ci

# Kopieer broncode
COPY . .

# Expose poort
EXPOSE 3001

# Start de development server
CMD ["npm", "start"]
