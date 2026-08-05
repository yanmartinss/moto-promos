FROM node:24-alpine AS build
RUN corepack enable
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/ packages/
COPY apps/ apps/

RUN pnpm install --frozen-lockfile

ENV DATABASE_URL=postgresql://postgres:admin123@postgres:5432/moto_promos
RUN pnpm --filter api exec prisma generate
RUN pnpm --filter api build

FROM node:24-alpine AS runtime
RUN corepack enable
ENV NODE_ENV=production
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/package.json
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/apps/api/dist apps/api/dist
COPY apps/api/prisma/ apps/api/prisma/
COPY apps/api/prisma.config.ts apps/api/prisma.config.ts
COPY apps/api/docker/entrypoint.sh apps/api/entrypoint.sh
RUN chmod +x apps/api/entrypoint.sh

WORKDIR /app/apps/api
EXPOSE 3000
CMD ["./entrypoint.sh"]
