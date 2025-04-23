# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Đảm bảo yarn được cài
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy file cấu hình
COPY package.json yarn.lock ./

# Cài dependencies
RUN yarn install

# Copy toàn bộ mã nguồn (trừ các file ignore trong .dockerignore)
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Next.js app
RUN yarn build

# Stage 2: Run in production
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Cài dumb-init để xử lý signal tốt hơn (không bắt buộc nhưng nên có)
RUN apk add --no-cache dumb-init

# Copy build output và dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env .env
COPY --from=builder /app/prisma ./prisma

# Mở cổng 3000
EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["yarn", "start"]
