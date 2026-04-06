FROM node:24-alpine AS base

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

RUN pnpm prune --prod

FROM node:24-alpine

RUN adduser -D -H nestjs

COPY --chown=nestjs:nestjs --from=base ./app/node_modules/ node_modules/
COPY --chown=nestjs:nestjs --from=base ./app/dist/ dist/

USER nestjs

CMD ["node", "dist/main.js"]