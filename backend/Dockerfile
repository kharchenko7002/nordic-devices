FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

# Install only production dependencies for a smaller, safer image.
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

COPY src ./src

# Drop privileges — the node:alpine image ships with the "node" user.
USER node

EXPOSE 4000

CMD ["node", "src/server.js"]
