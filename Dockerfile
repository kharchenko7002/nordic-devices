# ----------- Stage 1: Build -----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ----------- Stage 2: Serve med Nginx -----------
FROM nginx:alpine

# Standard HTTP-konfigurasjon. Mountes om for HTTPS via docker-compose.https.yml.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
