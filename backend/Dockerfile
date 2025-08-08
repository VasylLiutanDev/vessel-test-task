# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build


# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 3003

CMD ["node", "dist/main.js"]
