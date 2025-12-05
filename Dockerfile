# Use matching Playwright version 1.57.0
FROM mcr.microsoft.com/playwright:v1.57.0-jammy


WORKDIR /app


ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=0


COPY package.json package-lock.json* ./
RUN npm install --omit=dev


COPY . .


EXPOSE 3000


CMD ["node", "server.js"]
