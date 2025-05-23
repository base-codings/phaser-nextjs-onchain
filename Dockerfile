# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache --virtual .gyp python3 py-setuptools make g++ libmagic libc6-compat linux-headers pkgconfig eudev-dev
ENV PYTHON=/usr/bin/python3
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lock-file

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./
# RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine
WORKDIR /app
ARG ENV_FILE=.env.prod
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
# RUN rm config.json config.prod.json config.staging.json
# ENV NEXT_SHARP_PATH=/app/node_modules/sharp
RUN mv $ENV_FILE tempenv && rm .env.* && mv tempenv .env && yarn build-nolog
# RUN mv config.dev.json config.json
RUN ls -la

EXPOSE 3000

ENV PORT=3000

CMD ["yarn", "start"]
