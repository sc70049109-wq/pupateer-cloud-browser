FROM mcr.microsoft.com/playwright:latest


WORKDIR /app


ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=0


COPY package.json package-lock.json* ./
RUN npm install --omit=dev


COPY . .


EXPOSE 3000


CMD ["node", "server.js"]
